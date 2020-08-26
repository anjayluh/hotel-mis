import React from "react";
import { WorkflowStatus, WorkflowNinStatus } from "./types";
import {
  errorColor,
  successColor,
  warningColor,
  pendingColor,
} from "../../theme/custom-colors";
import { Chip } from "@material-ui/core";

export const renderNinStatus = (value: WorkflowNinStatus) => {
  let color = successColor;
  switch (value) {
    case WorkflowNinStatus.Successful:
      color = successColor;
      break;
    case WorkflowNinStatus.Rejected:
      color = warningColor;
      break;
    case WorkflowNinStatus.Failed:
      color = errorColor;
      break;
    case WorkflowNinStatus.Pending:
      color = pendingColor;
      break;
  }

  return (
    <Chip
      color="primary"
      variant="default"
      size="small"
      label={value}
      style={{
        padding: 0,
        height: 18,
        backgroundColor: color,
        marginBottom: 2,
      }}
    />
  );
};
export const renderStatus = (value: WorkflowStatus) => {
  let color = successColor;
  switch (value) {
    case WorkflowStatus.Closed:
      color = successColor;
      break;
    case WorkflowStatus.Error:
      color = errorColor;
      break;
    case WorkflowStatus.Open:
      color = warningColor;
      break;
  }

  return (
    <Chip
      color="primary"
      variant="default"
      size="small"
      label={value}
      style={{
        padding: 0,
        height: 18,
        backgroundColor: color,
        marginBottom: 2,
      }}
    />
  );
};
