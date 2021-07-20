import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { handleLogin } from "../../data/redux/coreActions";
import { Box, Button, Grid } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useLoginStyles } from "./loginStyles";
import logo from "../../assets/download.png";
import Divider from "@material-ui/core/Divider";
import { ICoreState } from "../../data/redux/coreReducer";
import { useSelector } from "react-redux";
import { useSnackbar } from 'notistack';
import snackbarMessages from "../../data/snackbarMessages";
import { useHistory } from "react-router-dom";


function Login() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useLoginStyles();
  const [loading, setLoading] = useState(false)
  const authState: ICoreState = useSelector((state: any) => state.core)
  const history = useHistory();
  const { isLoading, user } = authState
  const authenticateUser = (event: React.ChangeEvent<any>) => {
    // Setitem to monitor opening of slideout
    localStorage.setItem('isFormOpen', 'true')

    event.preventDefault();
    setLoading(true)
    dispatch(handleLogin({ username: "admin", role: "admin" }));
    history.push("/admin/home");
    enqueueSnackbar("Successfully logged in user")
    setLoading(false)


  }


  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={5} style={{ marginTop: "auto", marginBottom: "auto", paddingRight: 45 }}>
            <Box display="flex" justifyContent="center" >
              <img src={logo} alt={"Bank of Uganda"} className={classes.logo} />
            </Box>
          </Grid>
          <Grid item xs={1} style={{ padding: 0 }}>
            <Divider orientation={'vertical'} />
          </Grid>
          <Grid item xs={6} style={{ padding: 0, paddingRight: 13 }}>
            <Box pb={1}>
              <Box flexGrow={1} mb={2} pt={1}>
                <Typography variant="h6" align={"center"}>
                  Hotel MIS
                </Typography>
              </Box>
              <Box flexGrow={1} pb={1}>
                <form className={classes.form}>
                  <Button
                    onClick={authenticateUser}
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size={"large"}
                    className={classes.submit}
                  >
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Paper>
    </main>
  );
}

export default Login
