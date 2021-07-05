import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, makeStyles, createStyles, Theme, Button, TextField } from "@material-ui/core";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";
import { printDate } from "../../../../utils/dateHelpers";
import XTextInput from "../../../../components/inputs/XTextInput";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import XFormSimple from "../../../../components/forms/XFormSimple";
import * as yup from "yup";

export const schema = yup.object().shape(
  {
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  }
  // password: yup.string().required("Password is required").matches(/(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])$/, 'Must have atleast one uppercase letter')

);

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
      marginRight: 40,
      // color: #546e7a;
      // font-size: 13px;
      // font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      // font-weight: 400;
      // line-height: 18px;
      // letter-spacing: -0.04px;
    },
    inputField: {
      width: 267,
      marginTop: 0,
    },
    updateCredentials: {
      width: 183,
      fontSize: 'inherit',
      paddingTop: 8,
      paddingBottom: 8,

    },
    customSubmit: {
      marginRight: 6,
    },
    boxWraper: {
      marginTop: 0,
    },
    submitButtonGrid: {
      flexBasis: 'inherit',
    },
    formWraper: {
      marginBottom: 25,
      marginLeft: - 7,
    }

  })
);
interface IProps {
  data?: any;
}

const NiraPasswordDetails = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userProfile: any = useState({ name: "Peter Ocheng", role: "admin" });

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
  }, []);

  function handleChange(event: React.ChangeEvent<any>) {
    const name = event.target.name.trim();
    let value = event.target.value.trim();
    const newData = { ...data, [name]: value };
    setData(newData);

  }

  function handleSubmit() {
    console.log('submited')
  }
  const dateToExpire: string = `today`
  const oneDay = (1000 * 60 * 60 * 24)
  const expireDay = Math.round(Math.abs((Date.parse(dateToExpire) - Date.parse(`${new Date()}`)) / oneDay));
  const ActiveStatus = Date.parse(`${new Date()}`) > Date.parse(dateToExpire) ? 'INACTIVE' : 'ACTIVE'

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.detailsWrapper}>
        <ErrorBoundary>
          <Box display="flex">
            <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Status: `}<span style={{ fontWeight: 'bold' }}>{`${ActiveStatus}`}</span></Typography>
            </Box>
            <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Last Updated: `}<span style={{ fontWeight: 'bold' }}>{`${printDate(new Date())}`}</span></Typography>
            </Box>
            <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Last Updated by: `}<span style={{ fontWeight: 'bold' }}>{`${userProfile.name && userProfile.name}`}</span></Typography>
            </Box>
            <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Expires in ${expireDay} days`}</Typography>
            </Box>
          </Box>
        </ErrorBoundary>
      </Grid>
      <Grid item xs={12} className={classes.formWraper}>
        <XFormSimple
          onSubmit={handleSubmit}
          schema={schema}
          initialValues={data}
          submitText={"Update Credentials"}
          closeText={"Cancel"}
          customSubmit={classes.customSubmit}
          customSubmitClass={classes.updateCredentials}
          boxWraper={classes.boxWraper}
          submitButtonGrid={classes.submitButtonGrid}

        >
          <Grid container spacing={2} className={classes.submitButtonGrid}>
            <Grid item xs={12} className={classes.submitButtonGrid}>
              <Grid container spacing={3}>
                <Grid item style={{ marginRight: 6 }}>
                  <XTextInput
                    name="username"
                    label="Username"
                    type="text"
                    variant="outlined"
                    onChange={handleChange}
                    autoFocus
                    size="small"
                    className={classes.inputField}
                  />
                </Grid>
                <Grid item style={{ marginRight: 6 }}>
                  <XTextInput
                    name="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    onChange={handleChange}
                    autoFocus
                    size="small"
                    className={classes.inputField}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </XFormSimple>
      </Grid>
    </Grid>
  );
};

export default NiraPasswordDetails;
