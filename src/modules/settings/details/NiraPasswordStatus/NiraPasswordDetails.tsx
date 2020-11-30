import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, makeStyles, createStyles, Theme, Button, TextField } from "@material-ui/core";
import DetailView, { IRec } from "../../../../components/DetailView";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";
import { printDateTime, printDate } from "../../../../utils/dateHelpers";
import XTextInput from "../../../../components/inputs/XTextInput";
import { remoteRoutes } from "../../../../data/constants";
import { get, post, search } from "../../../../utils/ajax";
import { verificationRequestConstants } from "../../../../data/redux/ninVerification/reducer";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import snackbarMessages from "../../../../data/snackbarMessages";
import { IState } from "../../../../data/types";
import NinVerifications from "../../../ninVerification/NinVerification";
import { date } from "faker";
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
  const userProfile = useSelector((state: IState) => state.core.user);
  const niraCredentials = useSelector(
    (state: IState) => state.verificationRequests.niraCredentials
  );
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    getCurrentNiraCredentials()
  }, []);

  function getCurrentNiraCredentials() {
    get(
      remoteRoutes.niraCurrentCredentials,
      (resp) => {
        console.log(resp)
        dispatch({
          type: verificationRequestConstants.RequestPostNiraCredentials,
          payload: resp,
        });
      },
      () => {
        enqueueSnackbar(snackbarMessages.default.fail, {
          variant: "error",
        });
      },
      () => {

      }
    );
  }
  function handleChange(event: React.ChangeEvent<any>) {
    const name = event.target.name.trim();
    let value = event.target.value.trim();
    const newData = { ...data, [name]: value };
    setData(newData);

  }

  function handleSubmit() {
    console.log(niraCredentials && niraCredentials, 'credentials')
    post(
      remoteRoutes.niraCredentials,
      data,
      (resp) => {

        getCurrentNiraCredentials()
        // dispatch({
        //   type: verificationRequestConstants.RequestPostNiraCredentials,
        //   payload: resp,
        // });
        enqueueSnackbar(snackbarMessages.NiraCredentials.new, {
          variant: "success",
        });
        console.log(resp, 'nin credentials')
        // get(remoteRoutes.ninVerificationId + `/${data.id}`, (resp) => {
        //   // actions.resetForm();
        //   // Update table to show recently added request
        //   dispatch({
        //     type: verificationRequestConstants.RequestsPostNew,
        //     payload: resp,
        //   });
        //   enqueueSnackbar(snackbarMessages.NinVerification.new, {
        //     variant: "success",
        //   });
        //   // if (props.done) props.done();
        // },
        //   () => {
        //     enqueueSnackbar(snackbarMessages.default.fail, {
        //       variant: "error",
        //     });
        //   });
      },
      () => {
        enqueueSnackbar(snackbarMessages.default.fail, {
          variant: "error",
        });
      },
      () => {
        const newData = {
          "username": "",
          "password": ""
        }
        setData(newData)
      }
    );
  }
  const dateToExpire: string = `${niraCredentials && niraCredentials.expiresOn}`
  const oneDay = (1000 * 60 * 60 * 24)
  const expireDay = Math.round(Math.abs((Date.parse(dateToExpire) - Date.parse(`${new Date()}`)) / oneDay));
  const ActiveStatus = Date.parse(`${new Date()}`) > Date.parse(dateToExpire) ? 'INACTIVE' : 'ACTIVE'
  console.log(expireDay, 'dayssss')
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} className={classes.detailsWrapper}>
        <ErrorBoundary>
          <Box display="flex">
            <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Status: ${ActiveStatus}`}</Typography>
            </Box>
            <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Last Updated: ${printDate(niraCredentials && niraCredentials.createdOn)}`}</Typography>
            </Box>
            <Box className={classes.detailsItem}>
              <Typography variant='body2'>{`Last Updated by: ${userProfile.name && userProfile.name}`}</Typography>
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
                {/* <Grid item style={{ marginRight: 6 }}>
                  <Button
                    // disabled={loading}
                    variant="contained"
                    color="primary"
                    className={classes.updateCredentials}
                    onClick={handleSubmit}
                  >
                    Update Credentials
                        </Button>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </XFormSimple>
      </Grid>
    </Grid>
  );
};

export default NiraPasswordDetails;
