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
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";

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
      width: 120,
    },

    deactivate: {
      backgroundColor: "#D7143B!important",
      color: "#FFFFFF!important",
      width: 120,
    },
    disabled: {
      cursor: "not-allowed",
    },
    progress: {
      color: "#fffaf8",
      marginBottom: 2,
      marginRight: 0.5,
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
  const [loading, setLoading] = useState(false);
  const { showAction }: IParticipantsState = useSelector(
    (state: IState) => state.participants
  );
  const url = remoteRoutes.subscriptions + `/${record.id}`;
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    // Turn on progress loader
    setLoading(true);
    // Format the data to be saved
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
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <ToggleButtonGroup
      size="small"
      value={alignment}
      exclusive
      onChange={handleChange}
      className={`${showAction || loading ? classes.show : classes.hide} ${
        loading && classes.disabled
      }`} // Show button if loading or hover
    >
      <ToggleButton
        value="left"
        aria-label="active"
        className={`${classes.button} ${
          alignment !== "left" ? classes.activate : classes.displayNone
        }`}
        style={{ borderRadius: 4 }}
        disabled={loading}
      >
        {loading && (
          <Box
            width="100%"
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            <CircularProgress className={classes.progress} size={11} />
          </Box>
        )}
        {loading ? "Activating..." : "Activate"}
      </ToggleButton>
      <ToggleButton
        value="right"
        aria-label="inactive"
        className={`${classes.button} ${
          alignment !== "right" ? classes.deactivate : classes.displayNone
        }`}
        style={{ borderRadius: 4 }}
        disabled={loading}
      >
        {loading && (
          <Box
            width="100%"
            display="flex"
            alignContent="center"
            justifyContent="center"
          >
            <CircularProgress className={classes.progress} size={11} />
          </Box>
        )}
        {loading ? "Deactivating..." : "Deactivate"}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
