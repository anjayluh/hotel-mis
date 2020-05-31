import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { IParticipantStatusName } from "../../types";
import {
  errorColor,
  successColor,
  warningColor,
  pendingColor,
} from "../../../../theme/custom-colors";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      height: 23,
      fontWeight: 400,
      color: "#666666",
      textTransform: "capitalize",
    },
    active: {
      backgroundColor: "#259100!important",
      color: "#FFFFFF!important",
    },

    inactive: {
      backgroundColor: "#D7143B!important",
      color: "#FFFFFF!important",
    },
  })
);

export const XToggleButton = (value: any) => {
  const classes = useStyles();
  const [status, setStatus] = useState(value);
  const [alignment, setAlignment] = useState(
    value === "Active" ? "left" : "right"
  );
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    setStatus(newAlignment === "left" ? "Active" : "Active");
  };
  return (
    <ToggleButtonGroup
      size="small"
      value={alignment}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton
        value="left"
        aria-label="active"
        className={`${classes.button} ${
          alignment === "left" ? classes.active : ""
        }`}
      >
        Active
      </ToggleButton>
      <ToggleButton
        value="right"
        aria-label="inactive"
        className={`${classes.button} ${
          alignment === "right" ? classes.inactive : ""
        }`}
      >
        Inactive
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
