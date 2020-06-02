import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { IParticipantsState } from "../../../../data/redux/participants/reducer";
import { IState } from "../../../../data/types";
import { participantsConstants } from "../../../../data/redux/participants/reducer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    show: {
      visibility: "visible",
    },
    hide: {
      visibility: "hidden",
    },
    displayNone: {
      display: "none",
    },
    button: {
      height: 23,
      fontWeight: 400,
      color: "#666666",
      textTransform: "capitalize",
      padding: "0 8 0 8",
      borderRadius: "4!important",
    },
    activate: {
      backgroundColor: "#259100!important",
      color: "#FFFFFF!important",
      width: 82,
    },

    deactivate: {
      backgroundColor: "#D7143B!important",
      color: "#FFFFFF!important",
      width: 82,
    },
  })
);

export const XToggleButton = (value: any, record: any) => {
  const dispatch = useDispatch();
  const { showAction }: IParticipantsState = useSelector(
    (state: IState) => state.participants
  );
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
    dispatch({
      type: participantsConstants.participantsUpdateSubscriptionStatus,
      payload: { value: newAlignment, record: record },
    });
  };

  return (
    <ToggleButtonGroup
      size="small"
      value={alignment}
      exclusive
      onChange={handleChange}
      className={`${showAction ? classes.show : classes.hide}`}
    >
      <ToggleButton
        value="left"
        aria-label="active"
        className={`${classes.button} ${
          alignment !== "left" ? classes.activate : classes.displayNone
        }`}
        style={{ borderRadius: 4 }}
      >
        Activate
      </ToggleButton>
      <ToggleButton
        value="right"
        aria-label="inactive"
        className={`${classes.button} ${
          alignment !== "right" ? classes.deactivate : classes.displayNone
        }`}
        style={{ borderRadius: 4 }}
      >
        Deactivate
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
