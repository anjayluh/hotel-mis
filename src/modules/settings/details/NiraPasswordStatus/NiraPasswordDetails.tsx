import React from "react";
import { Grid, Box, Typography, makeStyles, createStyles, Theme, Button, TextField } from "@material-ui/core";
import DetailView, { IRec } from "../../../../components/DetailView";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";
import { printDateTime, printDate } from "../../../../utils/dateHelpers";
import XTextInput from "../../../../components/inputs/XTextInput";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    detailsWrapper: {
     marginTop: -8,
     marginBottom: 11,
    },
    detailsItem: {
      marginRight: 39,
      // color: #546e7a;
      // font-size: 13px;
      // font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      // font-weight: 400;
      // line-height: 18px;
      // letter-spacing: -0.04px;
     },
     inputField:{
      width: 267,
     },
     updateCredentials: {
       width: 183,
       fontSize: 'inherit',
       paddingTop:8,
       paddingBottom: 8,

     },
     formWraper: {
       marginBottom: 25,
     }
    
  })
);
interface IProps {
  data?: any;
}

const NiraPasswordDetails = ({ data }: IProps) => {
  const classes = useStyles();
  // const fields: IRec[] = [
  //   {
  //     label: "Service",
  //     value: "ID Verification",
  //   },
  // ];
  function handleChange(event: React.ChangeEvent<any>) {
    // const name = event.target.name.trim();
    // let value = event.target.value.trim();
    // if(name === 'nin') value = value.toUpperCase();
    // const newData = { ...data, [name]: value };
    // setData(newData);
    
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.detailsWrapper}>
          <ErrorBoundary>
            <Box display="flex">
              <Box className={classes.detailsItem}>
                <Typography variant='body2'>{`Satus: ${"ACTIVE"}`}</Typography>
              </Box>
              <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Last Updated: ${printDate(new Date())}`}</Typography>
              </Box>
              <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Last Updated by: ${"Benjamin Lutaaya"}`}</Typography>
              </Box>
              <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Expires in 14 days`}</Typography>
              </Box>
            </Box>
          </ErrorBoundary>
      </Grid>
      <Grid item xs={12} className={classes.formWraper}>
        <form>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item style={{marginRight: 3}}>
                      <TextField
                        name="nin"
                        label="Username"
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        autoFocus
                        size="small"
                        className={classes.inputField}
                        />
                    </Grid>
                    <Grid item>
                      <TextField
                          name="nin"
                          label="Password"
                          type="password"
                          variant="outlined"
                          onChange={handleChange}
                          autoFocus
                          size="small"
                          className={classes.inputField}
                          />
                    </Grid>
                    <Grid item>
                        <Button
                            // disabled={loading}
                            variant="contained"
                            color="primary"
                            className={classes.updateCredentials}
                        >
                            Update Credentials
                        </Button>
                    </Grid>
                  </Grid>
                </Grid>
            </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default NiraPasswordDetails;
