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
    collections: {
      width: 450,
      height: 450
    },
    footer: {
      color: "white",
      backgroundColor: "#353535",
      display: "flex",
      marginTop: 15,
      paddingTop: 35,
      paddingBottom: 35
    },
    white: {
      color: "white"
    },
    footerText: {
      color: "white",
      fontSize: 20
    }
  })
);

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
                  <Grid container justify="center">
                    <Grid item sm={10} lg={4} justify="center">
                      <Box my={2}>
                        <img src="https://archerhotel.com/images/tiles/171.jpg?040621" alt="room" className={classes.collections} />
                        <Grid item sm={10} lg={10} justify="center">
                          <Typography align="center" variant="h2">
                            SECOND BAR + RESTAURANT
                          </Typography>
                          <Typography align="center" variant="body1" className={classes.paragraph}>
                            Enjoy a true farm-to-table experience at chef David Bull’s new American restaurant at Archer Hotel Austin.
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item sm={10} lg={4} justify="center">
                      <Box my={2}>
                        <img src="https://archerhotel.com/images/tiles/663.jpg?040621" alt="room" className={classes.collections} />
                        <Grid item sm={10} lg={10} justify="center">
                          <Typography align="center" variant="h2">
                            POOL PATIO
                          </Typography>
                          <Typography align="center" variant="body1" className={classes.paragraph}>
                            Enjoy our quintessential laid-back outdoor oasis.
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item sm={10} lg={4} justify="center">
                      <Box my={2}>
                        <img src="https://archerhotel.com/images/tiles/574.jpg?040621" alt="room" className={classes.collections} />
                        <Grid item sm={10} lg={10} justify="center">
                          <Typography align="center" variant="h2">
                            SIGN UP + SAVE
                          </Typography>
                          <Typography align="center" variant="body1" className={classes.paragraph}>
                            Be the first to see travel deals and hot news.
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item sm={10} lg={4} justify="center">
                      <Box my={2}>
                        <img src="https://archerhotel.com/images/tiles/135.jpg?040621" alt="room" className={classes.collections} />
                        <Grid item sm={10} lg={10} justify="center">
                          <Typography align="center" variant="h2">
                            ARCHER'S BLOG
                          </Typography>
                          <Typography align="center" variant="body1" className={classes.paragraph}>
                            A must-see, gotta-taste, need-to-experience travel blog.
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item sm={10} lg={4} justify="center">
                      <Box my={2}>
                        <img src="https://archerhotel.com/images/tiles/134.jpg?040621" alt="room" className={classes.collections} />
                        <Grid item sm={10} lg={10} justify="center">
                          <Typography align="center" variant="h2">
                            FAVORITE FINDS
                          </Typography>
                          <Typography align="center" variant="body1" className={classes.paragraph}>
                            A thoughtfully curated list of the best local eating, drinking and doing.
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item sm={10} lg={4} justify="center">
                      <Box my={2}>
                        <img src="https://archerhotel.com/images/tiles/173.jpg?040621" alt="room" className={classes.collections} />
                        <Grid item sm={10} lg={10} justify="center">
                          <Typography align="center" variant="h2">
                            MEETINGS + VENUES
                          </Typography>
                          <Typography align="center" variant="body1" className={classes.paragraph}>
                            Stunning venues underscore our special knack for hosting your next meeting or celebration.
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Grid item sm={12} lg={12} justify="center" style={{ marginTop: 30 }}>
                      <Typography align="center" variant="h2">
                        HOTEL SERVICES
                      </Typography>
                      <Grid item sm={12} lg={12} justify="center" className={classes.footer}>
                        <Grid sm={5} lg={5}>
                          <ul>
                            <li style={{ marginBottom: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                Complimentary Wi-Fi
                              </Typography>
                            </li>
                            <li style={{ marginTop: 3, marginBottom: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                Bell service and valet parking
                              </Typography>
                            </li>
                            <li style={{ marginTop: 3, marginBottom: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                Dry-cleaning and laundry services
                              </Typography>
                            </li>
                            <li style={{ marginTop: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                Gymn and aerobics
                              </Typography>
                            </li>
                          </ul>
                        </Grid>
                        <Grid sm={5} lg={5}>
                          <ul>
                            <li style={{ marginBottom: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                A 100% smoke-free environment
                              </Typography>
                            </li>
                            <li style={{ marginTop: 3, marginBottom: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                16,525 square feet of indoor and outdoor meeting + event space
                              </Typography>
                            </li>
                            <li style={{ marginTop: 3, marginBottom: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                Check-in is 3 PM; checkout is 11 AM
                              </Typography>
                            </li>
                            <li style={{ marginTop: 3, marginBottom: 20 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                Accessibility for guests with disabilities
                              </Typography>
                            </li>
                          </ul>
                        </Grid>
                      </Grid>
                      <Typography align="center" variant="h2" style={{ marginTop: 30, marginBottom: 15 }}>
                        CONTACTS
                      </Typography>
                      <Grid item sm={12} lg={12} justify="center" className={classes.footer}>
                        <Grid sm={12} lg={4} justify="center">
                          <ul>
                            <li style={{ marginBottom: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                KING HOTEL, KAMPALA
                              </Typography>
                            </li>
                            <li style={{ marginTop: 3, marginBottom: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                PLOT 5, NTINDA II ROAD
                              </Typography>
                            </li>
                            <li style={{ marginTop: 3 }}>
                              <Typography variant="body1" className={classes.footerText}>
                                RESERVATIONS: 07123456789
                              </Typography>
                            </li>
                          </ul>
                        </Grid>
                      </Grid>
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
