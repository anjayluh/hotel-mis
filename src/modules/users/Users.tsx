import * as React from "react";
import { createStyles, makeStyles, Theme, Grid, Box, Typography } from "@material-ui/core";
import Layout from "../../components/Layout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    pageHeading: {
      display: "flex",
    },
  })
);
const Users = () => {
  const classes = useStyles();
    return (
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box p={1} className={classes.root}>
              <Box pb={2}>
                <Grid container>
                  <Grid item sm={12} className={classes.pageHeading}>
                    <Typography variant="h4">Users</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Layout>
)}

export default Users
