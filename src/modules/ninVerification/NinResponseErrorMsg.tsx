import React from 'react';
import {Box, makeStyles, Theme, createStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
    errorMessage: {
      backgroundColor: "red",
      color:"white",
      fontSize: "12px",
      borderRadius:"10px"
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
      <Typography variant='body1' color="inherit" style={{padding: 20}}>
        {message}
      </Typography>
    </Box>
  );
}


export default NinResponseErrorMsg;
