import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ITask, IWorkflow, TaskStatus, ActionStatus } from "../types";
import DetailView, { IRec } from "../../../components/DetailView";
import {
  printDateTime,
  printYearDateTime,
  printDate,
  printMonthYear,
} from "../../../utils/dateHelpers";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LabelIcon from "@material-ui/icons/Label";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {
  errorColor,
  successColor,
  warningColor,
  pendingColor,
} from "../../../theme/custom-colors";
import Button from "@material-ui/core/Button";
import PDateInput from "../../../components/plain-inputs/PDateInput";
import { Box } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  BillingsConstants,
  IBillingState,
} from "../../../data/redux/billing/reducer";
import { IState } from "../../../data/types";
import { get, post, search } from "../../../utils/ajax";
import { remoteRoutes } from "../../../data/constants";
import Toast from "../../../utils/Toast";
import { date } from "faker";
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
  const [billingCycle, setBillingCycle]: any = useState({
    status: "",
    startDate: "",
    endDate: "",
  });
  const { currentCycle }: IBillingState = useSelector(
    (state: IState) => state.billing
  );
  const [lastBillingCycle, setLastBillingCycle]: any = useState({});
  const [loading, setLoading]: any = useState(true);
  function createFields(cycle: any): IRec[] {
    return [
      {
        label: "Status",
        value: cycle.status ? cycle.status : "-",
      },
      {
        label: "Started On",
        value: cycle.startDate ? printDateTime(cycle.startDate) : "-",
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
    // onFilter(values);
  }
  function generateBills() {
    post(
      remoteRoutes.billingCycle + `/generate-bills`,
      { billingCycleId: currentCycle && currentCycle.id },
      (resp) => {
        dispatch({
          type: BillingsConstants.BillingsFetchCurrentCycle,
          payload: resp,
        });
        dispatch({
          type: BillingsConstants.BillingsFetchLoading,
          payload: true,
        });
      },
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
        dispatch({
          type: BillingsConstants.BillingsFetchLoading,
          payload: false,
        });
      }
    );
  }
  function submit() {
    generateBill ? generateBills() : emailBills();
  }
  function generateBillingCycle(value: any) {
    post(
      remoteRoutes.billingCycle,
      value,
      (resp) => {
        dispatch({
          type: BillingsConstants.BillingsFetchCurrentCycle,
          payload: resp,
        });
        dispatch({
          type: BillingsConstants.BillingsFetchLoading,
          payload: true,
        });
        setLoading(false);
      },
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
        dispatch({
          type: BillingsConstants.BillingsFetchLoading,
          payload: false,
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
    dispatch({
      type: BillingsConstants.BillingsFetchLoading,
      payload: true,
    });
    get(
      remoteRoutes.billingCycle + `?DateRange.From=${from}&DateRange.To=${to}`,
      // { dateTimeFrom: printYearDateTime(from), dateTimeTo: printYearDateTime(to)}
      (data) => {
        let [month, year] = printMonthYear(value).split(",");
        let date = month.substring(0, 3).toLowerCase().concat(year);
        let cycle = data.filter((item: any) => {
          return item.cycleName === date;
        })[0];
        if (cycle) {
          setBillingCycle(cycle);
          dispatch({
            type: BillingsConstants.BillingsFetchCurrentCycle,
            payload: cycle,
          });
          setLoading(false);
          dispatch({
            type: BillingsConstants.BillingsFetchLoading,
            payload: false,
          });
        } else {
          generateBillingCycle({
            month: new Date(value).getMonth() + 1,
            year: parseInt(year),
          });
        }
      },
      () => {
        enqueueSnackbar("Operation failed", {
          variant: "error",
        });
        dispatch({
          type: BillingsConstants.BillingsFetchLoading,
          payload: false,
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
    getBillingCycle(new Date());
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
  }, []);

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
            <div>
              {loading ? (
                <Loading />
              ) : (
                <DetailView data={createFields(billingCycle)} />
              )}
            </div>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 11 }}>
            <Box display="flex" flexDirection="row">
              {
                <Button
                  variant={!generateBill ? "outlined" : "contained"}
                  color="primary"
                  onClick={submit}
                >
                  {!generateBill
                    ? "Email bills to participants"
                    : "Generate bills"}
                </Button>
              }
            </Box>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.filterPaper} elevation={0}>
          <Grid item xs={12}>
            <Box display="flex" pb={1}>
              <Box flexGrow={1}>
                <Typography color={"textSecondary"} variant="h5">
                  Last Billing Cycle: May 2020
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
  // switch (task.status) {
  //     case WorkflowNinStatus.Successful:
  //         return successColor
  //     case WorkflowNinStatus.Failed:
  //         return errorColor
  //     case WorkflowNinStatus.Pending:
  //         return pendingColor
  // }
}

export default Summary;
