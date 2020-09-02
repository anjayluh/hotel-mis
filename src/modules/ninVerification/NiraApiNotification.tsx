import React, { useEffect, useState } from 'react';
import {Box, makeStyles, Theme, createStyles, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PriorityHighOutlinedIcon from '@material-ui/icons/PriorityHighOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import {printDateTime} from "../../utils/dateHelpers";
import { white } from '../../theme/custom-colors';
import { get } from "../../utils/ajax";
import { remoteRoutes } from '../../data/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
    niraApiOffline: {
      backgroundColor: "white",
      color: "red"
    },
    niraApiOfflineInfo: {
      borderLeft: "2px solid red",
      borderRight: "2px solid red"
    },
    niraApiOnline: {
      backgroundColor: white,
      color: "green"
    },
    niraApiOnlineInfo: {
      borderLeft: "2px solid green",
      borderRight: "2px solid green"
    },
    refreshButton: {
      minWidth: 0,
      padding: "3px 3px",
      color: "inherit"
    }
  })
);
interface IProps {
    notificationText: any
}

const NiraApiNotification = () => {
  const classes = useStyles();
  const [healthStatus, sethealthStatus] = useState('');
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getHealthStatus();
  }, []);

  function getHealthStatus() {
    setLoading(true)
    get(
      remoteRoutes.niraNotification,
      (res) => {
        const status = res.entries.externalServiceReport.data.nira.status;
        sethealthStatus(status)
      },
      undefined,
      () => setLoading(false)
    );
    
  }
    return (
      <Box display="flex" ml={"auto"} className={healthStatus === "Healthy" ? classes.niraApiOnline : classes.niraApiOffline}>
        <Box p={0.5}>
          <PriorityHighOutlinedIcon/>
        </Box>
        <Box display="flex" p={0.5} className={healthStatus === "Healthy" ? classes.niraApiOnlineInfo : classes.niraApiOfflineInfo}>
          <Typography color="inherit" style={{paddingRight: 15, lineHeight: 2}}>
            {healthStatus === "Healthy" ? "The NIRA API is online":"The NIRA API is currently offline"}
          </Typography>
          <Typography color="inherit" style={{lineHeight: 2.5 }} variant="body2">
            Last checked {printDateTime(new Date())}
          </Typography>
        </Box>
        <Box p={0.5} >
          <Button 
            className={classes.refreshButton}
            onClick={getHealthStatus}
            disabled={loading}
          >
            <RefreshOutlinedIcon/>
          </Button>
        </Box>
    </Box>
    );
}


export default NiraApiNotification;
