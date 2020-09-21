import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {
  ITask,
  IWorkflow,
  TaskStatus,
  IRequestDetails,
  IRequestDetailsStatus,
  WorkflowNinStatus,
  ActionStatus,
} from "../types";
import DetailView, { IRec } from "../../../components/DetailView";
import { printDateTime, printDate } from "../../../utils/dateHelpers";
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
import ErrorBoundary from "../../../components/ErrorBoundary/ErrorBoundary";

interface IProps {
  data: IRequestDetails;
}

const Summary = ({ data }: IProps) => {
  const fields: IRec[] = [
    {
      label: "Reference Id",
      value: data.id,
    },
    {
      label: "NIN",
      value: data.nin,
    },
    {
      label: "Date of Birth",
      value: data.dateOfBirth ? printDate(data.dateOfBirth) : "-",
    },
    {
      label: "Card Number",
      value: data.cardNumber,
    },
    {
      label: "User",
      value: data.initiator ? data.initiator : "-",
    },
    {
      label: "Surname",
      value: data.surname ? data.surname : "-",
    },
    {
      label: "Given Names",
      value: data.givenNames ? data.givenNames : "-",
    },
  ];
  const requestStatus = [
    {
      task: "Request Received",
      date: data.receivedAt,
    },
    {
      task: "Submitted to NIRA",
      date: data.submittedAt,
    },
    {
      task: "Verification Completed",
      date: data.receivedFromNira,
    },
    {
      task: "Billing Updated",
      date: data.billingUpdated,
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div>
          <ErrorBoundary>
            <DetailView data={fields} />
          </ErrorBoundary>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography>Request Status</Typography>
        <List dense>
          {requestStatus.map((it) => (
            <Fragment key={it.task}>
              <ListItem>
                <ListItemIcon>
                  <LabelIcon style={{ color: getTaskColor(it) }} />
                </ListItemIcon>
                <ListItemText
                  primary={it.task}
                  secondary={it.date ? printDateTime(it.date) : "-"}
                />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
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
