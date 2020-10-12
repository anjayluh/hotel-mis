import React from 'react';
import {Box, makeStyles, Theme, createStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
    errorMessage: {
      backgroundColor: "#d32f2f",
      color:"white",
      fontSize: "12px",
      borderRadius:"5px",
      marginTop:"8px",
      marginBottom: "11px"
    },
  })
);
interface IProps {
  message?: any
}

const NinResponseErrorMsg = ({message}: IProps) => {
  const classes = useStyles();
  return (
    <Box display="flex"  className={classes.errorMessage}>
      <Typography variant='body2' color="inherit" style={{padding: 22, fontWeight:500}}>
        {message}
      </Typography>
    </Box>
  );
}


export default NinResponseErrorMsg;
