import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { IParticipantsState } from "../../../../data/redux/participants/reducer";
import { IState } from "../../../../data/types";
import { participantsConstants } from "../../../../data/redux/participants/reducer";
import { put } from "../../../../utils/ajax";
import { remoteRoutes } from "../../../../data/constants";

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

interface IProps {
  value: any;
  record: any;
}
export const XToggleButton = ({ value, record }: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [alignment, setAlignment] = useState(
    value === "Active" ? "left" : "right"
  );
  const { showAction }: IParticipantsState = useSelector(
    (state: IState) => state.participants
  );
  const url = remoteRoutes.subscriptions + `/${record.id}`;
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    let updates = {
      companyId: record.companyId,
      serviceCategoryId: record.serviceCategoryId,
      subscriptionStatus: newAlignment === "left" ? "Active" : "InActive",
    };
    put(
      url,
      updates,
      (data) => {
        dispatch({
          type: participantsConstants.participantsUpdateSubscriptionStatus,
          payload: { value: newAlignment, record: record },
        });
        setAlignment(newAlignment);
      },
      () => {}
    );
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
