import * as React from "react";
import { createStyles, makeStyles, Theme, Grid, Box, Typography, Paper, Card, CardActionArea, CardMedia, CardContent, ListItemIcon, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import Layout from "../../components/Layout";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import typography from "../../theme/typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    helpWrapper: {
      margin: '0 auto'
    },
    pageHeading: {
      display: "flex",
    },
    imageWrapper: {
      "& img": {
        width: '500px',
        maxWidth: '100%',
      }

    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(5),
    },
    loginPage: {
      maxWidth: "100%",
    },
    listItem: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    statusDescription: {
      backgroundColor: '#303f4f',
      padding: '20px',
      borderRadius: '4px',
      fontSize: '12px',
      color: '#c1cee4'
    },
    statustitle: {
      fontWeight: 700,
      color: 'inherit',
    },
    statusData: {
      marginBottom: '12px',
      color: 'inherit',
    },
    table: {
      minWidth: 650,
    },
  })
);
const Help = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10} md={8} lg={7} className={classes.helpWrapper}>
          <Box p={2} className={classes.root}>
            <Paper className={classes.filterPaper} elevation={0}>
              <Box pb={2}>
                <Grid container>
                  <Grid item sm={12} className={classes.pageHeading}>
                    <Typography variant="h4">Help</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Grid container item>
                <Grid item xs={12} >
                  <Box py={2} id="userIntroduction">
                    <Typography variant="h4">
                      AUTHENTICATION AND USER MANAGEMENT
                  </Typography>
                    <Typography>
                      This service will be used by the system administrator to create and manage the users for their institution.
                      The system administrator will be provided with credentials
                      by Laboremus which he will use to log into the application to create and manage the rest of the users.
                  </Typography>
                  </Box>
                </Grid>
                <Grid item sm={12}>
                  <Box py={2}>
                    <Typography variant="h5">Login</Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        {/* <ListItemIcon>
                          <FiberManualRecordIcon fontSize="small" />
                        </ListItemIcon> */}
                        <ListItemText primary={
                          <Typography>
                            On the welcome page, click sign in.
                            </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Then enter your username and password as provided by Laboremus on the next page.
                            </Typography>
                        } />
                      </ListItem>
                    </List>
                    <Box mb={2} display="flex" className={classes.imageWrapper}>
                      <Card className={classes.root}>
                        <CardActionArea>
                          <Box display="flex">
                            <Box pr={1}>
                              <CardMedia
                                image={"http://via.placeholder.com/640x360"}
                                component="img"
                                title="Login"
                                className={classes.loginPage}
                              />
                            </Box>
                            <Box pl={1}>
                              <CardMedia
                                image={"http://via.placeholder.com/640x360"}
                                component="img"
                                title="Auth service login"
                                className={classes.loginPage}
                              />
                            </Box>
                          </Box>
                          <Grid container>
                            <Grid item sm={12} lg={6}></Grid>
                            <Grid item></Grid>
                          </Grid>

                          <CardContent style={{ padding: 8 }}>
                            <Typography variant="body2" color="textSecondary" component="p">
                              Figure 1:Log into the user management system
                              </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={12}>
                  <Typography variant="h5" id="userManageUsers">Home page</Typography>
                  <Typography>
                    The home page has a table of users created on the system. The buttons on the page are as explained below.
                  </Typography>
                  <Box>
                    <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                      <img
                        src="http://via.placeholder.com/640x360"
                        alt="The beautiful MDN logo." />
                      <figcaption>Figure 2: Auth service home page</figcaption>
                    </figure>
                    {/* <img src='http://via.placeholder.com/640x360'/> */}
                  </Box>
                  <Grid container>
                    <Grid item>
                      <Box py={1}>
                        <Typography variant="h6">
                          Add user
                      </Typography>
                        <List>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>Click the “Add User” button to create a new user in the system. </Typography>
                            } />
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>Add the user details in the form that slides out as in figure below and select a role for the user.</Typography>
                            } />
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>Click save</Typography>
                            } />
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>The user is listed by ID, full name, email address and role.</Typography>
                            } />
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>
                                The systems admin will then send the user their details by email and should advise them to change their
                                password to a preferred password after the fist login using the “forgot password” link.
                          </Typography>
                            } />
                          </ListItem>
                        </List>
                        <Box>
                          <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                            <img
                              src="http://via.placeholder.com/640x360"
                              alt="The beautiful MDN logo." />
                            <figcaption>Figure 3: Add users slide out</figcaption>
                          </figure>
                          {/* <img src='http://via.placeholder.com/640x360'/> */}
                        </Box>

                        <Grid item>
                          <Box>
                            <Typography variant="h6">
                              Edit User details
                            </Typography>
                            <List>
                              <ListItem className={classes.listItem}>
                                <ListItemText primary={
                                  <Typography>
                                    Click on the view icon at the far-right end of the line with the user you want to edit, shown in Figure 4;
                                    and a user details form will slide out.
                                  </Typography>
                                } />
                              </ListItem>
                              <ListItem className={classes.listItem}>
                                <ListItemText primary={
                                  <Typography>
                                    Click on “edit” in the bottom right corner as shown in B
                          </Typography>
                                } />
                              </ListItem>
                              <ListItem className={classes.listItem}>
                                <ListItemText primary={
                                  <Typography>
                                    Enter changes to the user details as shown in form C.
                                    You are required to input your current password of the user at this stage,
                                    otherwise you will not be able to save the changes.
                          </Typography>
                                } />
                              </ListItem>
                              <ListItem className={classes.listItem}>
                                <ListItemText primary={
                                  <Typography>
                                    •	Click save in the bottom right corner.
                            </Typography>
                                } />
                              </ListItem>
                            </List>
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 4:Edit user details screens.</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box>
                            <Typography variant="h6">
                              Deactivate User
                      </Typography>
                            <List>
                              <ListItem className={classes.listItem}>
                                <ListItemText primary={
                                  <Typography>
                                    To deactivate a user, click on the deactivate button in the top right corner of the edit slide out as shown in Figure 4.
                                    This user will no longer be able to access the system.
                              </Typography>
                                } />
                              </ListItem>
                            </List>
                          </Box>
                        </Grid>
                        <Grid item>
                          <Box>
                            <Typography>
                              Note: A user is automatically activated on creation of their account.
                        </Typography>
                          </Box>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Typography variant="h5">
                          Sign out
                      </Typography>
                        <List>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>
                                Click on the sign out button as shown in Figure 2.
                            </Typography>
                            } />
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>
                                You will be logged out of the system and redirected to the welcome page.
                            </Typography>
                            } />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box>
                        <Typography variant="h5">
                          Search for user
                    </Typography>
                        <List>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>
                                Users will be searched by email address. Write the email address in the search field as indicated in Figure 2.
                              </Typography>
                            } />
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>
                                Press enter button on your keyboard.
                          </Typography>
                            } />
                          </ListItem>
                          <ListItem className={classes.listItem}>
                            <ListItemText primary={
                              <Typography>
                                To return to the table with all users, delete the email address from the search field and press enter.
                              </Typography>
                            } />
                          </ListItem>
                        </List>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} >
                  <Box py={2}>
                    <Typography variant="h4">
                      FI PORTAL
                      </Typography>
                    <Typography variant="h4" id="fiPortalIntro">
                      INTRODUCTION
                      </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Purpose of the document
                    </Typography>
                    <Typography component="div">
                      <Typography>
                        The User Manual will guide you on a step-by-step basis on how to use and operate the National
                        Identity Verification system to verify an individual’s identity against their profile held at NIRA.
                      </Typography>
                      <Typography>
                        The manual is designed to show you how to carry out user management, use the BNIV portal and the mobile app.
                      </Typography>
                      <Typography>
                        If you find any difficulties in using the system, do not hesitate to contact us at support_lug@labormus.no.
                        You will also be able to contact the Laboremus support desk for up to 3hrs a month regarding the functionality of the system.
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box py={1}>
                    <Typography variant="h5">
                      System overview
                    </Typography>
                    <Typography component="div">
                      <Typography>
                        The Bank of Uganda National Identity Verifier (BNIV) system is an platform that allows financial
                        institutions to verify Identity information collected from customers against the NIRA database.
                      </Typography>
                      <Typography>
                        Financial institutions (FIs) users can perform the customer ID data verification using a portal or
                        by directly integrating their internal systems with an ID data verification API.
                      </Typography>
                      <Typography>
                        FIs can also scan a National ID card with a the Mobile App, and
                        verify that the print encrypted in the bar code on the card is matching with the print of the customer in front of you.
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box py={1}>
                    <Typography variant="h5" >Intended audience</Typography>
                    <Typography>
                      Users that want to perform manual verification.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box py={1}>
                    <Typography variant="h5" >Software requirements</Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography variant="h6">Web browser</Typography>
                        }
                          secondary={
                            <Typography>
                              The recommended browser is Google Chrome Browser's latest version.
                          </Typography>
                          } />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5" >Hardware requirements</Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography variant="h6">Hardware</Typography>
                        }
                          secondary={
                            <Typography component="div">
                              <Typography>
                                3GB RAM
                            </Typography>
                              <Typography>Mouse</Typography>
                              <Typography>Keyboard</Typography>
                            </Typography>
                          } />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} >
                  <Box py={2}>
                    <Typography variant="h4" id="fiAccessLogin">
                      ACCESS AND LOGIN
                  </Typography>
                    <Typography>
                      Access to BNIV Portal is provided via your web browser.
                      The use of the system is strictly controlled by security features that ensure that only authorized users can connect to it.
                      To log on to BNIV Web Portal you must have received credentials from the systems administrator.
                  </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box>
                    <Typography variant="h5">User log in</Typography>
                    <Typography>
                      When you access the portal, you will see the welcome page as below.
                    </Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Click the sign-in button.</Typography>
                        }
                          secondary={
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 5: Welcome screen</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>Enter username and password and click sign in. </Typography>
                            <Typography>(The username and password are given to you by the systems administrator.)</Typography>
                          </Typography>
                        }
                          secondary={
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 6: Login screen</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          } />

                      </ListItem>
                    </List>
                    <Typography component="div">
                      <Typography>
                        On signing in you will be taken to the home page where you can start verifying customers' identity information.
                      </Typography>
                      <Box>
                        <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                          <img
                            src="http://via.placeholder.com/640x360"
                            alt="The beautiful MDN logo." />
                          <figcaption>Figure 6: Login screenFigure 7: Home page</figcaption>
                        </figure>
                        {/* <img src='http://via.placeholder.com/640x360'/> */}
                      </Box>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">Logout</Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              In the top right corner, click the user profile icon.
                            </Typography>
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }}>
                                <img
                                  src="http://via.placeholder.com/400x100"
                                  alt="The beautiful MDN logo." />
                                <figcaption></figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              Select the Logout option.
                            </Typography>
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 8:Log out</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={
                          <Typography>
                            On successful logout, you will be directed to the welcome page.
                                </Typography>
                        } />
                      </ListItem>
                    </List>
                    <Box>
                      <Typography>
                        Note: You will be automatically logged out after 10 minutes of inactivity.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">Forgot password</Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              To reset your password in case of a forgotten password, click the “forgot password?” link on the login page.
                            </Typography>
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 9: Forgot password</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              Enter the email address associated with your account and click submit.
                            </Typography>
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 10: Forgot password II</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              A confirmation message for an email having been sent to your inbox will be displayed.
                            </Typography>
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 11: An email confirmation message</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              Go to the associated email address and click on the reset password” link.
                            </Typography>
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 12: Link in the email to reset password</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              Insert your email address and new password, then click reset.
                            </Typography>
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 13: Insert new password screen</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              You will receive a confirmation message that your password has been successfully reset.
                            </Typography>
                            <Box>
                              <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                <img
                                  src="http://via.placeholder.com/640x360"
                                  alt="The beautiful MDN logo." />
                                <figcaption>Figure 14: Reset successful screen</figcaption>
                              </figure>
                              {/* <img src='http://via.placeholder.com/640x360'/> */}
                            </Box>
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              You can now sign in with your new password.
                            </Typography>
                          </Typography>
                        } />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} >
                  <Box py={2}>
                    <Typography variant="h4" id="fiMainPage">
                      HOME PAGE
                  </Typography>
                    <Box>
                      <Typography>
                        Once you have successfully logged in, the page below will be displayed.
                    </Typography>
                      <Box>
                        <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                          <img
                            src="http://via.placeholder.com/640x360"
                            alt="The beautiful MDN logo." />
                          <figcaption>Figure 15: Home page fields</figcaption>
                        </figure>
                        {/* <img src='http://via.placeholder.com/640x360'/> */}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      ID verification page
                    </Typography>
                    <Typography>
                      The ID verification page is the portal’s home page. It appears with a New request form already open.
                    </Typography>
                    <Box>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 16: New request form</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h6">To make a request</Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Enter the NIN, Card number as mandatory fields.
                            A third field is mandatory for the request to succeed, but you can choose between Surname, Given Name, or date of birth.
                            You can also submit all fields.
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Click submit
                          </Typography>
                        } />
                      </ListItem>
                    </List>
                    <Box>
                      <Typography>
                        The request will be listed with the request status pending. Refresh the web browser for the results from NIRA.
                      </Typography>
                      <Typography>
                        You can also access the new request form through a keyboard shortcut (Ctrl+N).
                      </Typography>

                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h6">Verification Requests Table </Typography>
                    <Box>
                      <Typography>
                        The home page shows a table of previous requests made by your institution, with the most recent appearing on top.
                    </Typography>
                      <Typography>
                        The NIN and Card Number are partly hidden to protect personal data, however, they can be found in full in the details (see below).
                        Please see below further guidance on how to interpret the column content in this table.
                    </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h6">Request details</Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Click on a request from the list to see details of this request
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            A slide-out will appear with the details which also show the full NIN and card number, the date of birth,
                            user who sent the request as well as a detailed log of the request status
                          </Typography>
                        } />
                      </ListItem>
                    </List>
                    <Box>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 17: Request details screen</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Interpretation of result from NIRA
                    </Typography>
                    <Typography>The responses from NIRA are organized into four categories:</Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Request Status</Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>NIN Response</Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Match Status </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Card Status</Typography>
                        } />
                      </ListItem>
                    </List>
                    <Typography>
                      Further explanations as to the interpretation of these results can be found below:
                    </Typography>
                  </Box>
                </Grid>
                <Grid item sm={12}>
                  <Box py={1}>
                    <Typography variant="h6">Request Status</Typography>
                    <Typography>This shows the progress of the request that is made to the NIRA Service.  </Typography>
                    <Grid component="dl" className={classes.statusDescription}>
                      <Typography component="dt" className={classes.statustitle}>Pending</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The initial state of a new Id verification request from the FI portal.
                        The request is in this state before it is sent to NIRA.
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Completed</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The request has this status when the NIN Verification API gets a response from NIRA
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Failed</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The request has this status when the NIN Verification API does not get a response from NIRA.
                        </Typography>

                    </Grid>
                  </Box>
                </Grid>
                <Grid item sm={12}>
                  <Box py={1}>
                    <Typography variant="h6">NIN Response</Typography>
                    <Typography>The NIN response gives a summary of the NIN verification request made.</Typography>
                    <Grid component="dl" className={classes.statusDescription}>
                      <Typography component="dt" className={classes.statustitle}>NIN Valid</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The NIN is found in the NIRA database
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Deceased</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The person is registered as deceased in the NIRA database.
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Not Citzen</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The person is registered with a different nationality in the NIRA database (for the planned registration of foreigners in the NIRA database)
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Not Found</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The NIN is not found in the NIRA database.
                        </Typography>
                    </Grid>

                  </Box>
                </Grid>
                <Grid item sm={12}>
                  <Box py={1}>
                    <Typography variant="h6">Match Status</Typography>
                    <Typography>
                      This shows the result from comparing the details provided in the new request
                      ( Given Name, Surname, Date of Birth) in the portal and what NIRA has in its database
                    </Typography>
                    <Grid component="dl" className={classes.statusDescription}>
                      <Typography component="dt" className={classes.statustitle}>Match</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        When all the details provided (Given Name, Surname, Date of Birth) match what NIRA has.
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Mismatch</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        When one of the parameters i.e. given name, surname or date of birth, does not match with what NIRA has.
                        </Typography>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item sm={12}>
                  <Box py={1}>
                    <Typography variant="h6">Card Status(Card Validity)</Typography>
                    <Typography>
                      This is the state of the card based on what NIRA has in their records.
                    </Typography>
                    <Grid component="dl" className={classes.statusDescription}>
                      <Typography component="dt" className={classes.statustitle}>Valid</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The card is legally acceptable to be used.
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Not valid</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The card is not valid, either because it has been destroyed, lost or the card is still in process/production
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Stop-listed</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        Cards that have been blacklisted and are not allowed to transact.
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Expired</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        All cards expire after 10 years, after this the status goes to expired
                        </Typography>
                      <Typography component="dt" className={classes.statustitle}>Not Active</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The card number provided is not found in the NIRA database.
                        </Typography>
                    </Grid>

                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Search in Previous Requests
                    </Typography>
                    <Typography>You will be able to search for a specific request entry in the database</Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Enter the details for the given request in the search field on the right-hand side of the home page.
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Click Apply filter.
                          </Typography>
                        } />
                      </ListItem>
                    </List>
                    <Box>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 18: Search previous requests</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Export previous requests
                    </Typography>
                    <Typography>
                      You can download the previous request for analysis. This also works while offline.
                      The file with the request will be in CSV format and stored as a zip file and can be opened using Microsoft Excel.
                    </Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Go to the search ribbon</Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Filter out the data according to desired criteria</Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Select start and end dates</Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Click “Export data to excel”.</Typography>
                        } />
                      </ListItem>
                    </List>
                    <Typography>
                      On completion, a notification will be shown and the file will be downloaded.
                    </Typography>
                    <Box>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 19: Export previous requests</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} >
                  <Box py={2}>
                    <Typography variant="h4" id="fiSettings">
                      SETTINGS
                    </Typography>
                    <Typography>
                      Note: Module is under development.
                      </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} >
                  <Box py={2}>
                    <Typography variant="h4" id="fiApiDocs">
                      DEVELOPER PORTAL AND API DOCUMENTATION
                    </Typography>
                    <Box>
                      <Typography>
                        You can navigate to the API documentation by selecting “Developer Portal” in the left side menu of the portal.
                      </Typography>
                      <Typography>
                        The documentation located here provides endpoints through which the API interfaces with the
                        <Typography component="span">National Identification and Registration Authority </Typography>(NIRA) API and their responses.
                      </Typography>
                      <Typography>
                        The portal can be used by developers who wish to integrate an application with the API for application-to-application verification of NIN and card numbers.
                        Please contact Laboremus for further support for integration.
                      </Typography>
                    </Box>
                    <Box>
                      <Box>
                        <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                          <img
                            src="http://via.placeholder.com/640x360"
                            alt="The beautiful MDN logo." />
                          <figcaption>Figure 20: Developer portal</figcaption>
                        </figure>
                        {/* <img src='http://via.placeholder.com/640x360'/> */}
                      </Box>
                      <Typography>
                        Note: The application will be activated in a new window or on a new browser card.
                        If the message about blocking pop-up windows appears, click on the message, and allow the pop-up window to open.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} >
                  <Box py={1}>
                    <Typography variant="h4" id="mobileIntroduction">
                      MOBILE APPLICATION
                    </Typography>
                    <Typography variant="h4">
                      Introduction to the mobile app
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} >
                  <Box py={1}>
                    <Typography variant="h5">
                      Application overview
                    </Typography>
                    <Box>
                      <Typography>
                        This NIVS mobile application will enable its users to automatically capture national ID card information
                        by scanning the barcode at the back of an original (NIRA-issued) national ID.
                    </Typography>
                      <Typography>
                        Once these details are scanned and captured by the mobile application,
                        the user will be able to compare those details stored in the barcode on the backside against those displayed on the front of the national ID card.
                    </Typography>
                      <Typography>
                        The mobile application can work with an external fingerprint scanner (scanner specifications described later in this document)
                        to capture the fingerprint of the cardholder and match that with the fingerprint stored on the barcode.
                    </Typography>
                      <Typography>
                        The technology can also be embedded in other existing applications, such as on-boarding systems. Please contact Laboremus for further information.
                        This document describes how to use the mobile application to carry out the above operations.
                    </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Application overview
                    </Typography>
                    <Box>
                      <Typography variant="h5">
                        System Requirements
                        </Typography>
                      <Typography>
                        The application will run on the following hardware specifications.
                        </Typography>
                      <List>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={
                            <Typography>
                              Preferred fingerprint scanner –
                              </Typography>
                          }
                            secondary={
                              <Box>
                                <Typography>Manufacturer: Evolute Systems Pvt. Ltd</Typography>
                                <Typography>Model: IDENTI5</Typography>
                                <Typography>STQ certified</Typography>
                                <Typography>ISO SC37 19794/2/4</Typography>
                                <Typography>Bluetooth version 2.1/4.0 with EDR</Typography>
                              </Box>
                            } />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary={
                            <Typography>
                              Bluetooth version 2.1/4.0 with EDR
                              </Typography>
                          } />
                        </ListItem>
                      </List>
                    </Box>
                    <Box>
                      <Typography variant="h5">
                        Software Requirements
                        </Typography>
                      <Typography>
                        The application will run normally on an Android enabled mobile phone with the following specifications
                        </Typography>
                      <List>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={
                            <Typography>Android version 5.1 or higher </Typography>
                          } />
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h4" id="mobileApiInstallation">
                      APP INSTALLATION
                    </Typography>
                    <Typography variant="h5">
                      Downloading the mobile application
                    </Typography>
                    <Typography>
                      The application can be downloaded from the Google Play Store and installed onto a compatible Android mobile phone.
                      To install the application, follow the instructions below.
                    </Typography>
                    <Box>
                      <Typography style={{ fontWeight: 'bold' }}>
                        * In the testing phase of the project, the mobile app will be available to a select few for testing.
                        Make sure you are among the selected testers before carrying on with this user manual.
                      </Typography>
                      <List>
                        <ListItem className={classes.listItem}>
                          <ListItemText>
                            On your mobile phone, open the Google Play Store
                          </ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText>
                            Enter the text “Uganda National ID Verifier” and tap search to find the application in the Google Play Store
                          </ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText>
                            Select the application with the name that matches the above text exactly.
                          </ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText>
                            Select the “Install” option to begin the application installation.
                          </ListItemText>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText>
                            Once the installation of the mobile application is complete, you will be notified about this by your mobile phone.
                          </ListItemText>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h4" id="mobileAccessLogin">
                      ACCESS AND LOGIN
                    </Typography>
                    <Typography variant="h5">
                      Signing in
                    </Typography>
                    <Typography>
                      You will need an internet connection to download the application and authenticate it for the first time.
                      After creating the PIN, the application will then be able to work offline.
                    </Typography>
                    <Box py={0.5}>
                      <Typography>
                        To launch the app, tap the application icon on the home screen of your Android device.
                      </Typography>
                      <Box py={0.5}>
                        <Typography>
                          The first time you sign in to the app, you will be required to use the username and password given to you by your systems administrator.
                          You will then be required to create a PIN for subsequent login attempts. Follow the process described below to accomplish this.
                        </Typography>
                      </Box>
                      <List>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={
                            <Typography>
                              Tap the “Log in” button and then enter your username and password.
                            </Typography>

                          }
                            secondary={
                              <Box display="flex">

                                <figure style={{ marginLeft: 0 }} className={classes.imageWrapper}>
                                  <img
                                    src="http://via.placeholder.com/1200"
                                    alt="The beautiful MDN logo." />
                                  <figcaption>Figure 22:Mobile app landing page </figcaption>
                                </figure>
                                {/* <img src='http://via.placeholder.com/640x360'/> */}
                                <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                  <img
                                    src="http://via.placeholder.com/1200"
                                    alt="The beautiful MDN logo." />
                                  <figcaption>Figure 21: Mobile app login page</figcaption>
                                </figure>
                                {/* <img src='http://via.placeholder.com/1200'/> */}

                              </Box>
                            } />

                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={
                            <Typography>
                              To create a PIN, enter the same 5-digit PIN in both fields shown below and tap the “LOGIN” button
                            </Typography>
                          }
                            secondary={
                              <Box display="flex">

                                <figure style={{ marginLeft: 0 }} className={classes.imageWrapper}>
                                  <img
                                    src="http://via.placeholder.com/1200"
                                    alt="The beautiful MDN logo." />
                                  <figcaption>Figure 23: Subsequent PIN login page</figcaption>
                                </figure>
                                {/* <img src='http://via.placeholder.com/640x360'/> */}
                                <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                                  <img
                                    src="http://via.placeholder.com/1200"
                                    alt="The beautiful MDN logo." />
                                  <figcaption>Figure 24: PIN setup page</figcaption>
                                </figure>
                                {/* <img src='http://via.placeholder.com/1200'/> */}

                              </Box>
                            } />

                        </ListItem>
                      </List>
                      <Typography>
                        On the subsequent sign in from the same Android device,
                        you will only be required to use the PIN to log in to the mobile application as shown in the screenshot above.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Application brief
                      </Typography>
                    <Typography>
                      After successful login to the mobile application for the first time,
                      you will see the following screens that give a brief about the functionality of the application.
                      </Typography>
                    <Box display="flex">

                      <figure style={{ marginLeft: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/1200"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 26:Scan ID summary screen </figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/1200"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 25: Match fingerprint summary screen </figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/1200'/> */}

                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Forgot PIN
                      </Typography>
                    <Typography>
                      In case you have forgotten your PIN, you will follow the below instructions.
                      </Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Click Reset PIN
                            </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Enter username and password (given to you by the system administrator)
                            </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Set new PIN
                            </Typography>
                        } />
                      </ListItem>
                    </List>
                    <Box>
                      <Typography>
                        Note: To reset the PIN you will need an Internet connection. Once the PIN has been reset, the app can again work offline.
                        </Typography>
                    </Box>
                    <Box>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 27: Mobile app return user login screen</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Failed sign in attempts
                    </Typography>
                    <Typography>
                      Should you try to sign in with a wrong PIN 10 consecutive times,
                      you will be locked out of the application and asked to try to log in later.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Signing out
                    </Typography>
                    <Typography>
                      To sign out of the application, press the “Menu” button in the top right corner of the app and tap on the Logout link.
                    </Typography>
                    <Box>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 28: Logout link</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5" id="mobileScanning">
                      SCANNING A NATIONAL ID
                    </Typography>
                    <Typography>
                      To scan the details of a national ID, follow the instructions and illustrations below.
                    </Typography>
                    <Box px={2}>
                      <Typography>
                        Ensure that you are in a well-lit environment.
                      </Typography>
                      <Typography>
                        Place ID backside up on a flat surface
                      </Typography>
                    </Box>
                    <Typography>
                      Note: On the first time you connect, you will have to allow the app access to your camera.
                    </Typography>
                    <Box px={2}>
                      <Typography>
                        With the mobile app on the “Scan ID screen”, tap the “Scan ID” button
                      </Typography>
                      <Typography>
                        Hold the phone steady as the camera scans the barcode on the national ID.
                      </Typography>
                      <Typography>
                        The mobile app will automatically scan the national ID and transition to the next screen when it is successful.
                      </Typography>
                      <Box display="flex">

                        <figure style={{ marginLeft: 0 }} className={classes.imageWrapper}>
                          <img
                            src="http://via.placeholder.com/1200"
                            alt="The beautiful MDN logo." />
                          <figcaption>Figure 29: Scan ID screen </figcaption>
                        </figure>
                        {/* <img src='http://via.placeholder.com/640x360'/> */}
                        <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                          <img
                            src="http://via.placeholder.com/1200"
                            alt="The beautiful MDN logo." />
                          <figcaption>Figure 30:Barcode ID backside</figcaption>
                        </figure>
                        {/* <img src='http://via.placeholder.com/1200'/> */}

                      </Box>
                      <Typography>
                        Confirm ID card details and either finish or proceed to Verify the fingerprint.
                      </Typography>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 31:Scanned results screen</figcaption>
                      </figure>
                    </Box>
                    <Typography>
                      Note: The app will only scan an original copy of the national ID.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      FINGERPRINT VERIFICATION
                    </Typography>
                    <Typography>
                      Connecting scanning device to the phone
                    </Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText
                          primary={
                            <Typography>
                              Turn on the blue tooth of your Android phone and the fingerprint scanner.
                            </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText
                          primary={
                            <Typography>
                              Scan for available blue tooth devices on the phone.
                              </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText
                          primary={
                            <Typography>
                              Pair your phone with the fingerprint scanner device.
                              The device naming convention follows ESIAE****. The asterisk represents 4 digits.
                              </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText
                          primary={
                            <Typography>
                              Alternatively, you can also pair the device to your phone within the application.
                              </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText
                          primary={
                            <Typography>
                              Within the application, tap “Scan for devices”.
                              </Typography>
                          }
                        />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText
                          primary={
                            <Typography>
                              Select the scanner and pair.
                              </Typography>
                          }
                        />
                      </ListItem>
                    </List>
                    <Box>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 32: Bluetooth device listing</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                    <Typography>
                      When you return to match a fingerprint after the initial connection,
                      you will not be required to scan for the device as it will be already paired,
                      instead you will only be prompted to pair to the device as the device will be stored in the phone list.
                    </Typography>
                    <Box>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 33: Request to pair on subsequent connection notification</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5" id="mobileFingerprint">
                      Scanning fingerprint
                    </Typography>
                    <Typography>
                      To verify that the ID holder’s fingerprint matches the one stored on the barcode,
                      the mobile app compares the fingerprint scanned by the fingerprint reader with that stored in the ID barcode.
                    </Typography>
                    <Box px={2}>
                      <Typography>
                        Return to the application and click on “Scan fingerprint”.
                      </Typography>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 34:Scan fingerprint instruction page</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Capture fingerprint
                    </Typography>
                    <Typography>
                      To capture the fingerprint of the ID card holder,
                      place the card holder’s finger corresponding to that indicated on the back of the ID card flat on the scanner.
                      For example, if it says” Right Thumb”, ask the cardholder to place the right thumb on the scanner.
                    </Typography>
                    <Box>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 35: Finger as indicated on the ID</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Matching fingerprints
                    </Typography>
                    <Typography>
                      When the card holder’s fingerprint matches the one stored on the ID card barcode,
                      the mobile app will display a pop-up shown below indicating that the fingerprint matches.
                      These results will also be shown in the scan summary under the “Biometrics” section.
                    </Typography>
                    <Box display="flex">
                      <figure style={{ marginLeft: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/1200"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 36: Fingerprint matched notification screens</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/1200"
                          alt="The beautiful MDN logo." />

                      </figure>
                      {/* <img src='http://via.placeholder.com/1200'/> */}

                    </Box>
                    <Box>
                      <Typography>
                        If the card holder’s fingerprint does not match the one stored on the ID card barcode,
                        the pop-up and scans summary display it as failed/no match as shown below.
                      </Typography>
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/640x360"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 37: Failed match notification screen</figcaption>
                      </figure>
                      <Typography>
                        Note: some fingerprints stored by NIRA are of insufficient quality or the file was corrupted.
                        Therefore, the cardholder might still be the true holder of the card, even with a mismatch.
                        In these cases, proceed to other means to verify the identity of the cardholder.
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5" id="mobileScanHistory">
                      SCAN HISTORY
                    </Typography>
                    <Typography>
                      To view a list of previously scanned ID cards, tap the scan history link in the drop-down menu
                      and a list of cards with their NIN and fingerprint statuses will be displayed.
                      You can also search in the list by pressing the search icon on the top left.
                    </Typography>
                    <Typography>
                      Note: All data will be lost once you uninstall the app from your phone.
                    </Typography>
                    <Box display="flex">
                      <figure style={{ marginLeft: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/1200"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 39: Scanned history link</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/640x360'/> */}
                      <figure style={{ marginLeft: 0, marginRight: 0 }} className={classes.imageWrapper}>
                        <img
                          src="http://via.placeholder.com/1200"
                          alt="The beautiful MDN logo." />
                        <figcaption>Figure 38: Scan history display screen</figcaption>
                      </figure>
                      {/* <img src='http://via.placeholder.com/1200'/> */}

                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5" id="mobileBasicTroubleshooting">
                      BASIC TROUBLESHOOTING
                    </Typography>
                    <List>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Turn on Bluetooth on your phone and ensure it is paired with the fingerprint scanner to user the Mobile App
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Check that the fingerprint scanner is charged in case of failure to switch on.
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            For the Portal, always check that the browser is up to date.
                            The recommended browser is Google Chrome Browser.
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            When using the Portal, check that you have a working internet connection.
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Check that NIRA is online from the notification at the bottom left corner of the portal.
                          </Typography>
                        } />
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            For how to use insomnia to test the API please refer to
                            <a href="https://apis.support.brightcove.com/general/use-insomnia-api-requests.html">
                              https://apis.support.brightcove.com/general/use-insomnia-api-requests.html
                            </a>
                          </Typography>
                        } />
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">Glossary</Typography>
                    <Grid component="dl" className={classes.statusDescription}>
                      <Typography component="dt" className={classes.statustitle}>National ID</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        An identity card issued by the National Identification and Registration Authority
                      </Typography>
                      <Typography component="dt" className={classes.statustitle}>NIN</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        A unique identification number on the national identity card
                      </Typography>
                      <Typography component="dt" className={classes.statustitle}>Card Number</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        A unique card number on the national identity card.
                      </Typography>
                      <Typography component="dt" className={classes.statustitle}>Surname</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The name that a person has in common with other family members also known as the family name.
                      </Typography>
                      <Typography component="dt" className={classes.statustitle}>Given Name</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        A person's first name, which they are given at birth in addition to their surname.
                      </Typography>
                      <Typography component="dt" className={classes.statustitle}>PDF417</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        A stacked linear barcode format used in a variety of applications such as transport,
                        identification cards, and inventory management.
                      </Typography>
                      <Typography component="dt" className={classes.statustitle}>CardHolder</Typography>
                      <Typography component="dd" className={classes.statusData}>
                        The person who has legally obtained the identity card from NIRA.
                      </Typography>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item>
                  <Box py={1}>
                    <Typography variant="h5">
                      Abbreviations
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>S/N</TableCell>
                            <TableCell >Abbreviation</TableCell>
                            <TableCell >Full Name&nbsp;(g)</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">1</TableCell>
                            <TableCell>BNIV</TableCell>
                            <TableCell>Bank of Uganda National Identity Verification</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">2</TableCell>
                            <TableCell>FI</TableCell>
                            <TableCell>Financial Institution</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">3</TableCell>
                            <TableCell>API</TableCell>
                            <TableCell>Application Programming Interface</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">4</TableCell>
                            <TableCell>BoU</TableCell>
                            <TableCell>Bank of Uganda</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Help
