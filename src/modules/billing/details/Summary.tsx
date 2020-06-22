import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ITask, IWorkflow, TaskStatus, ActionStatus } from "../types";
import DetailView, { IRec } from "../../../components/DetailView";
import {
  printDateTime,
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

interface IProps {
  data?: any;
  billingCycle?: any;
  lastBillingCycle?: any;
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

const Summary = ({ billingCycle, lastBillingCycle }: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [formData, setData] = useState({
    participantName: "",
    type: "",
    from: new Date(),
    to: null,
    billNumber: "",
  });
  const { isBill } = useSelector((state: IState) => state.billing);
  function createFields(cycle: any): IRec[] {
    return [
      {
        label: "Status",
        value: cycle.status ? cycle.status : "-",
      },
      {
        label: "Started On",
        value: cycle.startedOn ? cycle.startedOn : "-",
      },
      {
        label: "Bill Generated On",
        value: cycle.generatedOn ? cycle.generatedOn : "-",
      },
    ];
  }
  function submitForm(values: any) {
    // onFilter(values);
  }
  function generateBills(values: any) {
    // onFilter(values);
  }
  const handleValueChange = (name: string) => (value: any) => {
    /* if (name === "from" || name === "to") {
      value = value ? value.toISOString() : value;
    } */
    if (value.getMonth() !== new Date().getMonth()) {
      dispatch({
        type: BillingsConstants.BillingsIsBill,
        payload: false,
      });
    } else {
      dispatch({
        type: BillingsConstants.BillingsIsBill,
        payload: true,
      });
    }
    value = value ? value.toISOString() : value;
    const newData = { ...formData, [name]: value };
    setData(newData);
    submitForm(newData);
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
                />
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 6 }}>
            <div>
              <DetailView data={createFields(billingCycle)} />
            </div>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: 11 }}>
            <Box display="flex" flexDirection="row">
              {
                <Button
                  variant={isBill ? "outlined" : "contained"}
                  color="primary"
                  onClick={isBill ? submitForm : generateBills}
                >
                  {isBill ? "Email bills to participants" : "Generate bills"}
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
