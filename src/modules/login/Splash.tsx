import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridWrapper from "../../components/GridWrapper";
import { useDispatch } from "react-redux";
import { handleLogin, handleLogout } from "../../data/redux/coreActions";
import { User } from "oidc-client";
import { useSnackbar } from "notistack";
import snackbarMessages from "../../data/snackbarMessages";
import { availableRoles, AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../../data/constants";
import { checkRoleAvailability } from "../../utils/BOUSpecificHelpers";
import { useHistory } from "react-router-dom";

export default function Splash() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  async function doLogout() {
    dispatch(handleLogout());
  }

  useEffect(() => {
    dispatch(handleLogin({ username: "admin", role: "admin" }));

    history.push("/admin/home");
    enqueueSnackbar("Successfully logged in user")
    // dispatch(handleLogout());
  }, [dispatch, enqueueSnackbar]);

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
