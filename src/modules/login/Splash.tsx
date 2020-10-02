import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridWrapper from "../../components/GridWrapper";
import { useDispatch } from "react-redux";
import { handleLogin, handleLogout } from "../../data/redux/coreActions";
import authService from "../../data/oidc/AuthService";
import { User } from "oidc-client";
import {useSnackbar} from "notistack";
import snackbarMessages from "../../data/snackbarMessages";

export default function Splash() {
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getUser()
      .then((user: User | null) => {
        if (user && user.profile.role && !user.expired) {
          dispatch(
            handleLogin({ user: user.profile, token: user.access_token })
          );
          
        } else {
          enqueueSnackbar(snackbarMessages.Login.inValidAccount, {
            variant: 'error',
          });
          setTimeout(() => dispatch(handleLogout()), 1000 * 5)
        }
      })
      .catch((error) => {
        console.log("Auth error", error);
        dispatch(handleLogout());
      });
  }, [dispatch,enqueueSnackbar]);

  return (
    <GridWrapper>
      <Grid container spacing={10} justify="center" alignItems="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </GridWrapper>
  );
}
