import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import Tooltip from "@material-ui/core/Tooltip";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import { printDateTime } from "../../utils/dateHelpers";
import { white } from "../../theme/custom-colors";
import { get } from "../../utils/ajax";
import { useSnackbar } from "notistack";
import snackbarMessages from "../../data/snackbarMessages";
import { Chip } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: "#25313d",
      color: white,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "0px 0px 17px 0px",
      boxShadow: "none",
      position: "relative",
      bottom: -25,
      width: 192,
      height: 130,
      borderRadius: 20,
    },
    chip: {
      position: "relative",
      zIndex: 2,
      padding: 0,
      width: 190,
      height: 39,
      fontSize: 13.8,
      borderRadius: 20,
      justifyContent: "left",
      paddingLeft: 23,
      boxShadow: "#25313d 0px 2px 0px 0px",
    },
    online: {
      color: white,
    },
    iconUp: {
      marginLeft: 18,
    },
    iconRight: {
      marginLeft: 18,
      "-webkit-transform": "rotate(90deg)",
      "-moz-transform": "rotate(90deg)",
      "-o-transform": "rotate(90deg)",
      "-ms-transform": "rotate(90deg)",
      transform: "rotate(90deg)",
    },
    description: {
      color: white,
      fontSize: 12,
      paddingBottom: 12,
    },
    information: {
      padding: "0px 12px 0px 12px",
    },
    date: {
      color: white,
      fontSize: 12,
    },
    iconButton: {
      bottom: -22,
      marginRight: 20,
      backgroundColor: "#19222c",
      width: 28,
      height: 28,
    },
  })
);
interface IProps {
  notificationText: any;
}

const NiraApiNotification = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [healthStatus, sethealthStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPaper, setShowPaper] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  function showInformation() {
    setShowPaper(!showPaper);
  }
  return (
    <span>
      {showPaper && (
        <Grow in={showPaper}>
          <Paper className={classes.paper}>
            <span className={classes.information}>
              <Typography
                style={{ lineHeight: 1.3 }}
                className={classes.description}
              >
                {healthStatus === "Healthy"
                  ? "NIRA services can be reached"
                  : "NIRA services cannot be reached"}
              </Typography>
              <Typography
                className={classes.date}
                color="inherit"
                style={{ lineHeight: 1.3 }}
                variant="body2"
              >
                <span style={{ textTransform: "uppercase", color: "#9e9e9e", fontSize: "10px" }}>
                  Last checked
                </span>{" "}
                {printDateTime(new Date())}
              </Typography>
            </span>
            <Tooltip title="Check again" aria-label="Check again">
              <IconButton
                aria-label="refresh"
                className={classes.iconButton}
                disabled={loading}
              >
                <RefreshOutlinedIcon
                  style={{ color: loading ? "rgb(189 189 189)" : white }}
                />
              </IconButton>
            </Tooltip>
          </Paper>
        </Grow>
      )}
      <Chip
        color="primary"
        variant="default"
        size="small"
        label={
          loading ? 'Connecting...' : (healthStatus === "Healthy" ? "NIRA is online" : "NIRA is offline")
        }
        onDelete={showInformation}
        onClick={showInformation}
        clickable={true}
        deleteIcon={
          <KeyboardArrowUp
            className={showPaper ? classes.iconUp : classes.iconRight}
            onClick={showInformation}
            style={{ width: 22, height: 22 }}
          />
        }
        className={classes.chip}
        style={{
          backgroundColor: loading ? "rgb(35 46 58)" : (healthStatus === "Healthy" ? "#43a047" : "#d33030"),
        }}
      />
    </span>
  );
};

export default NiraApiNotification;
