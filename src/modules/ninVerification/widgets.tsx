import React from "react";
import {
  ITask,
  TaskStatus,
  WorkflowStatus,
  WorkflowSubStatus,
  WorkflowNinStatus,
  WorkflowValidityStatus,
} from "./types";
import { ErrorIcon, SuccessIcon, WarningIcon } from "../../components/xicons";
import {
  errorColor,
  successColor,
  warningColor,
  pendingColor,
} from "../../theme/custom-colors";
import { Chip, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import CheckCircle from "@material-ui/icons/CheckCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";

export const renderValidityStatus = (value: WorkflowValidityStatus) => {
  let color = successColor;
  let label = "";
  switch (value) {
    case WorkflowValidityStatus.Valid:
      color = successColor;
      label = value;
      break;
    case WorkflowValidityStatus.Invalid:
      color = errorColor;
      label = value;
      break;
    case WorkflowValidityStatus.emptyString:
      color = errorColor;
      label = "Invalid";
      break;
  }

  return (
    <Box display="flex">
      {value === "Valid" && (
        <Box>
          <CheckCircle
            fontSize="small"
            style={{
              color: color,
              marginTop: 4.4,
              marginRight: 1.5,
              fontSize: 16,
            }}
          />
        </Box>
      )}
      {label === "Invalid" && (
        <Box>
          <RemoveCircle
            fontSize="small"
            style={{
              color: color,
              marginTop: 4.4,
              marginRight: 2,
              fontSize: 16,
            }}
          />
        </Box>
      )}
      <Typography
        variant="subtitle2"
        style={{ fontSize: 13, fontWeight: 600, marginTop: 1.6 }}
      >
        {label}
      </Typography>
    </Box>
  );
};
export const renderResponseStatus = (value: boolean) => {
  let color = successColor;
  let label = "";
  switch (value) {
    case true:
      color = successColor;
      label = "Match";
      break;
    case false:
      label = "Mismatch";
      color = errorColor;
      break;
  }

  return (
    <Chip
      color="primary"
      variant="default"
      size="small"
      label={label}
      style={{
        padding: 0,
        height: 18,
        color: color,
        backgroundColor: "white",
        marginBottom: 2,
        border: `1px solid ${color}`,
        textTransform: "uppercase",
      }}
    />
  );
};
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
        textTransform: "uppercase",
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

export const renderSubStatus = (value: WorkflowSubStatus) => {
  let color = successColor;
  switch (value) {
    case WorkflowSubStatus.Verified:
      color = successColor;
      break;
    case WorkflowSubStatus.UnknownError:
    case WorkflowSubStatus.CaseUpdateFailed:
    case WorkflowSubStatus.ContactCreationFailed:

    case WorkflowSubStatus.RiskProfileFailed:
    case WorkflowSubStatus.InternalWatchlistFailed:
    case WorkflowSubStatus.RegulationCheckFailed:

    case WorkflowSubStatus.CifCreationFailed:
    case WorkflowSubStatus.AccountCreationFailed:

    case WorkflowSubStatus.DocumentsValidationFailed:
    case WorkflowSubStatus.AccountVerificationFailed:
    case WorkflowSubStatus.SignatureRejected:
    case WorkflowSubStatus.FailedToCloseCase:
      color = errorColor;
      break;
    case WorkflowSubStatus.ManualVerification:
    case WorkflowSubStatus.Pending:
    case WorkflowSubStatus.AwaitingAccountApproval:
    case WorkflowSubStatus.AwaitingCaseClosure:
    case WorkflowSubStatus.AwaitingDocumentsApproval:
    case WorkflowSubStatus.AwaitingSignatureUpload:
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

export function printTaskIcon(task: ITask): any {
  switch (task.status) {
    case TaskStatus.Done:
      return SuccessIcon;
    case TaskStatus.Error:
      return ErrorIcon;
    case TaskStatus.Pending:
      return WarningIcon;
  }
}
