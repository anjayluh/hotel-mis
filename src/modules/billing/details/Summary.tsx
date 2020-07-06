import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DetailView, { IRec } from "../../../components/DetailView";
import {
  printDateTime,
  printYearDateTime,
  printMonthYear,
} from "../../../utils/dateHelpers";
import Divider from "@material-ui/core/Divider";
import { errorColor, successColor } from "../../../theme/custom-colors";
import Button from "@material-ui/core/Button";
import PDateInput from "../../../components/plain-inputs/PDateInput";
import { Box } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  BillingsConstants,
  IBillingState,
} from "../../../data/redux/billing/reducer";
import { IState } from "../../../data/types";
import { IBillCycle } from "../../../modules/billing/types";
import { get, post, search } from "../../../utils/ajax";
import { remoteRoutes } from "../../../data/constants";
import { useSnackbar } from "notistack";
import Loading from "../../../components/Loading";

interface IProps {
  data?: any;
  onFilter?: (data: any) => any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2),
    },
  })
);

const Summary = ({ data }: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [formData, setData] = useState({
    participantName: "",
    type: "",
    from: new Date(),
    to: null,
    billNumber: "",
  });

  const { generateBill } = useSelector((state: IState) => state.billing);
  const { currentCycle }: IBillingState = useSelector(
    (state: IState) => state.billing
  );
  const billData: any[] = useSelector((state: IState) => state.billing.data);
  const [lastBillingCycle, setLastBillingCycle]: any = useState({});
  const [loading, setLoading]: any = useState(true);

  function compareDates(value1: Date, value2: Date) {
    let hours1 = Date.parse(
      new Date(
        new Date(value1).getFullYear(),
        new Date(value1).getMonth()
      ).toDateString()
    );
    let hours2 = Date.parse(
      new Date(
        new Date(value2).getFullYear(),
        new Date(value2).getMonth()
      ).toDateString()
    );
    return hours1 > hours2;
  }
  const isValidCycleEndDate = (value: Date) => {
    let today = new Date();
    let lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).setHours(23, 59, 59, 999);
    let selectedCycleEndDate = new Date(
      value.getFullYear(),
      value.getMonth() + 1,
      0
    ).setHours(23, 59, 59, 999);
    return selectedCycleEndDate > lastDayOfMonth;
  };
  function createFields(cycle: IBillCycle): IRec[] {
    return [
      {
        label: "Status",
        value: cycle.status ? cycle.status : "-",
      },
      {
        label: "Started On",
        value: cycle.startDateTime ? printDateTime(cycle.startDateTime) : "-",
      },
      {
        label: "Bill Generated On",
        value: cycle.billGeneratedOn
          ? printDateTime(cycle.billGeneratedOn)
          : "-",
      },
    ];
  }
  function emailBills() {
    post(
      remoteRoutes.billingCycle + `/email-bills`,
      { billingCycleId: currentCycle && currentCycle.billingCycleId },
      (resp) => {},
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
      }
    );
  }
  function generateBills() {
    post(
      remoteRoutes.billingCycle + `/generate-bills`,
      { billingCycleId: currentCycle && currentCycle.billingCycleId },
      (resp) => {
        dispatch({
          type: BillingsConstants.BillingsFetchCurrentCycle,
          payload: resp,
        });
      },
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
      }
    );
  }
  function getCurrentCycleStatus(cycleId: string) {
    get(
      remoteRoutes.billingCycle + `/generate-bills/${cycleId}/status`,
      (data) => {
        dispatch({
          type: BillingsConstants.BillingsFetchCurrentCycleStatus,
          payload: data,
        });
        setLoading(false);
      },
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
        setLoading(false);
      }
    );
  }
  function generateBillingCycle(value: any) {
    // if (selectedDate.setHours(0, 0, 0, 0) >= selectedDate)
    post(
      remoteRoutes.billingCycle,
      value,
      (resp) => {
        dispatch({
          type: BillingsConstants.BillingsFetchCurrentCycle,
          payload: resp,
        });
        resp && getCurrentCycleStatus(resp.id);
        setLoading(false);
      },
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
        setLoading(false);
      }
    );
  }

  function getBillingCycle(value: Date) {
    let from = printYearDateTime(
      new Date(value.getFullYear(), value.getMonth(), 1)
    );
    let to = printYearDateTime(
      new Date(value.getFullYear(), value.getMonth() + 1, 0)
    );
    get(
      remoteRoutes.billingCycle + `?DateRange.From=${from}&DateRange.To=${to}`,
      (data) => {
        let [month, year] = printMonthYear(value).split(",");
        let date = month.substring(0, 3).concat(year);
        let cycle = data.filter((item: any) => {
          return item.cycleName === date;
        })[0];
        if (cycle) {
          dispatch({
            type: BillingsConstants.BillingsFetchCurrentCycle,
            payload: cycle,
          });
          cycle && getCurrentCycleStatus(cycle.id);
        } else {
          // Compare if current month year is greater that last cycle end month and year
          // Compare if projected end date of cycle is greater than last hour of today
          if (
            compareDates(value, lastBillingCycle.endDateTime) &&
            isValidCycleEndDate(value)
          ) {
            // Generate new billing cycle
            generateBillingCycle({
              month: new Date(value).getMonth() + 1,
              year: parseInt(year),
            });
          } else {
            dispatch({
              type: BillingsConstants.BillingsFetchCurrentCycle,
              payload: null,
            });
            dispatch({
              type: BillingsConstants.BillingsFetchAll,
              payload: [],
            });
            dispatch({
              type: BillingsConstants.BillingsGenerateBill,
              payload: true,
            });
            setLoading(false);
          }
        }
      },
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
        setLoading(false);
      }
    );
  }

  const handleValueChange = (name: string) => (value: any) => {
    setLoading(true);
    value = value ? value.toISOString() : value;
    const newData = { ...formData, [name]: value };
    setData(newData);
    getBillingCycle(new Date(value));
  };

  useEffect(() => {
    // Get billing cycle for today
    let from = printYearDateTime(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    );
    let to = printYearDateTime(
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    );
    get(
      remoteRoutes.billingCycle + `?DateRange.From=${from}&DateRange.To=${to}`,
      (data) => {
        let [month, year] = printMonthYear(new Date()).split(",");
        let date = month.substring(0, 3).concat(year);
        let cycle = data.filter((item: any) => {
          return item.cycleName === date;
        })[0];
        if (cycle) {
          dispatch({
            type: BillingsConstants.BillingsFetchCurrentCycle,
            payload: cycle,
          });
          cycle && getCurrentCycleStatus(cycle.id);
        } else {
          dispatch({
            type: BillingsConstants.BillingsFetchCurrentCycle,
            payload: null,
          });
        }
        setLoading(false);
      },
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
        setLoading(false);
      }
    );
    // Get latest billing cycle
    search(
      remoteRoutes.billingCycle,
      { PageNumber: 1, PageSize: 10 },
      (resp) => {
        setLastBillingCycle(resp[0]);
      },
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
      }
    );
    if (lastBillingCycle.id) {
      get(
        remoteRoutes.billingCycle +
          `/generate-bills/${lastBillingCycle.id}/status`,
        (data) => {
          setLastBillingCycle({
            ...lastBillingCycle,
            billingCycleId: data.billingCycleId,
            status: data.status,
            billGeneratedOn: data.dateCreated,
            billCount: data.billCount,
            subscriptionCount: data.subscriptionCount,
          });
        },
        () => {
          enqueueSnackbar("Operation failed", {
            variant: "error",
          });
        }
      );
    }
  }, [lastBillingCycle.id, dispatch]);

  const enableGenerateBills = () => {
    if (
      billData.length === 0 &&
      currentCycle &&
      currentCycle.endDateTime &&
      compareDates(currentCycle.endDateTime, lastBillingCycle.endDateTime)
    )
      return true;
    if (!currentCycle) return true;
    return false;
  };
  const enableEmailBills = () => {
    if (
      billData.length > 0 &&
      currentCycle &&
      currentCycle.billingCycleId === lastBillingCycle.billingCycleId
    )
      return false;
    return true;
  };
  let emptyFields = {
    billingCycleId: "",
    cycleName: "",
    startDateTime: null,
    endDateTime: null,
    billGeneratedOn: null,
    status: null,
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.filterPaper} elevation={0}>
          <Grid item xs={12}>
            <Box display="flex" pb={1}>
              <Box flexGrow={1}>
                <Typography color={"textSecondary"} variant="h5">
                  Billing Cycle
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={2.5}>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 12 }}>
            <form>
              <Grid item xs={12}>
                <PDateInput
                  name="from"
                  value={formData["from"]}
                  onChange={handleValueChange("from")}
                  ariaLabel={"From"}
                  format={"MMMM, yyyy"}
                  variant="inline"
                  inputVariant="outlined"
                  views={["month"]}
                  disableFuture={true}
                />
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: 6 }}>
            {loading ? (
              <Loading />
            ) : (
              <div>
                <DetailView
                  data={createFields(currentCycle ? currentCycle : emptyFields)}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 11 }}>
            {!loading && (
              <Box display="flex" flexDirection="row">
                {generateBill && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={generateBills}
                    disabled={enableGenerateBills()}
                  >
                    Generate bills
                  </Button>
                )}
                {!generateBill && (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={emailBills}
                    disabled={enableEmailBills()}
                  >
                    Email bills to participants
                  </Button>
                )}
              </Box>
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.filterPaper} elevation={0}>
          <Grid item xs={12}>
            <Box display="flex" pb={1}>
              <Box flexGrow={1}>
                <Typography color={"textSecondary"} variant="h5">
                  Last Billing Cycle:{" "}
                  {printMonthYear(lastBillingCycle.startDateTime)}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={2.5}>
              <Divider />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div>
              <DetailView data={createFields(lastBillingCycle)} />
            </div>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export function getTaskColor(task: any): any {
  if (task.date) {
    return successColor;
  } else {
    return errorColor;
  }
}

export default Summary;
