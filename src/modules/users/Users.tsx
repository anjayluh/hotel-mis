import * as React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Navigation from "../../components/Layout";
import { Grid, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    pageHeading: {
      display: "flex",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
  
  })
);
const Users = () => {
  const classes = useStyles();
  return (
  <Navigation>
    <Grid container spacing={2}>
      <Grid item xs={12}>
          <Box p={1}>
            <Grid container>
              <Grid item sm={3} className={classes.pageHeading}>
                <Typography variant="h4">Users</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        </Grid>
  </Navigation>
)
  }

export default Users
