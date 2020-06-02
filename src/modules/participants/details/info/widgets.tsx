import React from "react";
import { IParticipantStatusName } from "../../types";
import {
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
} from "../../../../components/xicons";
import {
  errorColor,
  successColor,
  warningColor,
  pendingColor,
} from "../../../../theme/custom-colors";
import { Chip } from "@material-ui/core";

export const renderSubscriptionStatus = (value: IParticipantStatusName) => {
  let color =
    value === IParticipantStatusName.Active ? successColor : warningColor;
  switch (value) {
    case IParticipantStatusName.Active:
      color = successColor;
      break;
    case IParticipantStatusName.Inactive:
      color = warningColor;
      break;
    /* case IParticipantStatusName.Suspended:
      color = errorColor;
      break; */
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
