import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Layout";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CardMedia from '@material-ui/core/CardMedia';
import image from '../../assets/Tokyo-Hotel-Room.jpeg';

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
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2),
    },
    mainPhoto: {
      width: '100%',
      height: "auto",
    },
    subtitle: {
      color: "#cc9933"
    },
    paragraph: {
      lineHeight: "1.5em",
      fontSize: "1.1rem",
      color: "#282828"
    },
  })
);

type Anchor = "top" | "left" | "bottom" | "right";

const Home = () => {
  const classes = useStyles();

  return (
    <Navigation>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box p={1} className={classes.root}>
            <Box pb={2}>
              <Grid container>
                <Grid item sm={12} className={classes.pageHeading}>
                </Grid>
              </Grid>
            </Box>
            <Grid item xs={12}>
              <img src={image} alt="room" className={classes.mainPhoto} />
              <Paper variant="outlined">
                <Box my={2}>
                  <Typography align="center" variant="h1">
                    WELCOME
                  </Typography>
                  <Typography align="center" className={classes.subtitle} variant="h3">
                    TO ARCHER HOTEL AUSTIN AT DOMAIN NORTHSIDE
                  </Typography>
                </Box>
                <Box my={2}>
                  <Typography align="center" variant="h4">
                    TEXAS CHIC. LUXE BOUTIQUE.
                  </Typography>
                </Box>
                <Box my={2}>
                  <Typography align="center" variant="body1" className={classes.paragraph}>
                    Archer Hotel Austin’s casually elegant vibe complements its buzzy, walkable neighborhood. The hotel is in the heart of Domain NORTHSIDE and The Domain — north Austin's fashion and dining hub — and steps from the lively Rock Rose nightlife district, uptown Austin's most downtown street.
                  </Typography>
                </Box>
                <Box my={2}>
                  <Typography align="center" variant="body1" className={classes.paragraph}>
                    Mixing Texas limestone and hill country wildflowers with the creative soul of Austin, Archer Hotel Austin offers luxe guest rooms and suites, the most thoughtful touches, local-favorite Second Bar + Kitchen and a staff serving up sincere Southern hospitality.
                  </Typography>
                </Box>
                <Box my={2}>
                  <Typography align="center" variant="body1" className={classes.paragraph}>
                    Your room is ready.
                  </Typography>
                </Box>

                <Box mt={5} alignItems="center">
                  <Typography align="center" variant="h2">
                    HIGHLIGHTS
                  </Typography>
                  <Grid container alignItems="center" justify="center">
                    <Grid item sm={12} lg={6}>
                      <Box my={2}>
                        <img src="https://archerhotel.com/images/tiles/171.jpg?040621" alt="room" />
                      </Box>
                    </Grid>
                    <Grid item sm={12} lg={6}>
                      <Box my={2}>
                        <img src="https://archerhotel.com/images/tiles/171.jpg?040621" alt="room" />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Navigation>
  );
};

export default Home;
