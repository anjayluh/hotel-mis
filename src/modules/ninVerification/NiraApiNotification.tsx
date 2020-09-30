import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import { printDateTime } from "../../utils/dateHelpers";
import { white } from "../../theme/custom-colors";
import { get } from "../../utils/ajax";
import { remoteRoutes } from "../../data/constants";
import { useSnackbar } from "notistack";
import snackbarMessages from "../../data/snackbarMessages";
import { Chip } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
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
      bottom: -18,
      width: 192,
      height: 125,
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
    },
    online: {
      color: white,
    },
    icon: {
      marginLeft: 18,
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
  const [loading, setLoading] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  useEffect(() => {
    getHealthStatus();
  }, []);

  function getHealthStatus() {
    setLoading(true);
    get(
      remoteRoutes.niraNotification,
      (res) => {
        const status = res.entries.externalServiceReport.data.nira.status;
        sethealthStatus(status);
      },
      () => {
        enqueueSnackbar(snackbarMessages.NiraApiNotification.offline, {
          variant: "error",
        });
      },
      () => setLoading(false)
    );
  }
  function showInformation() {
    setShowPaper(!showPaper);
  }
  return (
    <span>
      {showPaper && (
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
              Last checked: {printDateTime(new Date())}
            </Typography>
          </span>
          <IconButton
            aria-label="refresh"
            className={classes.iconButton}
            disabled={loading}
            onClick={getHealthStatus}
          >
            <RefreshOutlinedIcon
              style={{ color: loading ? "rgb(189 189 189)" : white }}
            />
          </IconButton>
        </Paper>
      )}
      <Chip
        color="primary"
        variant="default"
        size="small"
        label={
          healthStatus === "Healthy" ? "NIRA is online" : "NIRA is offline"
        }
        onDelete={showInformation}
        deleteIcon={
          showPaper ? (
            <KeyboardArrowUp
              className={classes.icon}
              onClick={showInformation}
              style={{ width: 22, height: 22 }}
            />
          ) : (
            <ArrowForwardIos
              className={classes.icon}
              onClick={showInformation}
            />
          )
        }
        className={classes.chip}
        style={{
          backgroundColor: healthStatus === "Healthy" ? "#43a047" : "#d33030",
        }}
      />
    </span>
  );
};

export default NiraApiNotification;
