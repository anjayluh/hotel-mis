import React, {useState} from 'react';
import {Box, Button, Grid} from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import authService from "../../data/oidc/AuthService";
import {useLoginStyles} from "./loginStyles";
import coatOfArms from "../../assets/Coat_of_arms_of_Uganda.svg";
import Divider from "@material-ui/core/Divider";

function Login() {
    const classes = useLoginStyles();
    const [loading,setLoading]=useState(false)
    return (
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={5} style={{ marginTop: "auto",  marginBottom: "auto", paddingRight: 45 }}>
              <Box display="flex" justifyContent="center" >
                <img src={coatOfArms} alt={ "Coat of arms of Uganda" } className={classes.coatOfArms}/>
              </Box>
            </Grid>
            <Grid item xs={1} style={{ padding: 0 }}>
              <Divider orientation={'vertical'}/>
            </Grid>
            <Grid item xs={6} style={{ padding: 0, paddingRight: 13 }}>
              <Box pb={1}>
                <Box flexGrow={1} mb={2} pt={1}>
                  <Typography  variant="h6">
                    NATIONAL IDS VERIFICATION AND VALIDATION SYSTEM
                  </Typography>
                </Box>
                <Box flexGrow={1}>
                  <Typography variant={"body2"} style={{ paddingRight: 16 }}>
                    Authentication of current and prospective customer information against records maintained by NIRA
                  </Typography>
                </Box>
                <Box flexGrow={1} pb={1}>
                  <form className={classes.form}>
                    <Button
                      onClick={(event)=> {
                        event.preventDefault();
                        setLoading(true)
                        authService.login().finally(()=>{
                          setLoading(false)
                        })
                      }}
                      disabled={loading}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      size={"large"}
                      className={classes.submit}
                    >
                      Authenticate
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
