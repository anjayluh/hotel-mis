import * as React from "react";
import { createStyles, makeStyles, Theme, Grid, Box, Typography, Paper, Card, CardActionArea, CardMedia, CardContent, ListItemIcon } from "@material-ui/core";
import Layout from "../../components/Layout";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

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
      "& img":{
        width: '500px'
      }

    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(5),
    },
    loginPage:{
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
    }
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
                  <Box py={2}>
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
                          }/>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={
                            <Typography>
                              Then enter your username and password as provided by Laboremus on the next page.
                            </Typography>
                          }/>
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
                            
                            <CardContent style={{padding: 8}}>
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
                <Typography variant="h5">Home page</Typography>
                <Typography>
                  The home page has a table of users created on the system. The buttons on the page are as explained below.
                </Typography>
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
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Add the user details in the form that slides out as in figure below and select a role for the user.</Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Click save</Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>The user is listed by ID, full name, email address and role.</Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            The systems admin will then send the user their details by email and should advise them to change their 
                            password to a preferred password after the fist login using the “forgot password” link.
                          </Typography>
                        }/>
                      </ListItem>
                    </List>
                    <Box>
                    <div>
                      Image
                    </div>
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
                            •	Click on the view icon at the far-right end of the line with the user you want to edit, shown in Figure 4; 
                            and a user details form will slide out.
                          </Typography>
                          }/>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={
                            <Typography>
                              •	Click on “edit” in the bottom right corner as shown in B
                          </Typography>
                          }/>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={
                            <Typography>
                              •	Enter changes to the user details as shown in form C. 
                              You are required to input your current password of the user at this stage, 
                              otherwise you will not be able to save the changes.
                          </Typography>
                          }/>
                        </ListItem>
                        <ListItem className={classes.listItem}>
                          <ListItemText primary={
                            <Typography>
                              •	Click save in the bottom right corner.
                            </Typography>
                          }/>
                        </ListItem>
                      </List>
                      <div>
                        Image
                      </div>
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
                                •	To deactivate a user, click on the deactivate button in the top right corner of the edit slide out as shown in Figure 4. 
                                This user will no longer be able to access the system.
                              </Typography>
                            }/>
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
                      <Typography variant="h6">
                        Sign out
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText primary={
                            <Typography>
                              "•	Click on the sign out button as shown in Figure 2."
                            </Typography>
                          }/>
                        </ListItem>
                        <ListItem>
                          <ListItemText primary={
                            <Typography>
                              "•	You will be logged out of the system and redirected to the welcome page."
                            </Typography>
                          }/>
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
                            •	Users will be searched by email address. Write the email address in the search field as indicated in Figure 2.
                          </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            •	Press enter button on your keyboard.
                          </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            •	To return to the table with all users, delete the email address from the search field and press enter.
                          </Typography>
                        }/>
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
                        FI USER PORTAL
                      </Typography>
                      <Typography variant="h4">
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
                        }/>
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
                        }/>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} >
                  <Box py={2}>
                  <Typography variant="h4">
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
                          <Typography>
                            image
                          </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>Enter username and password and click sign in. </Typography>
                            <Typography>(The username and password are given to you by the systems administrator.)</Typography>
                          </Typography>
                        }
                        secondary={
                          <Typography>
                            image
                          </Typography>
                        }/>
                        
                      </ListItem>
                    </List>
                    <Typography component="div">
                      <Typography>
                        On signing in you will be taken to the home page where you can start verifying customers' identity information.
                      </Typography>
                      <Typography component="div">
                        image
                      </Typography>
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
                            <Typography>
                              image
                            </Typography>
                          </Typography>
                          }/>
                        </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                              <Typography component="div">
                                <Typography>
                                  Select the Logout option.
                                </Typography> 
                                <Typography>
                                  image
                                </Typography>
                              </Typography>
                            }/>
                      </ListItem>
                      <ListItem>
                        <ListItemText primary={
                                <Typography>
                                  On successful logout, you will be directed to the welcome page.
                                </Typography> 
                            }/>
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
                            <Typography>
                              image
                            </Typography>
                          </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              Enter the email address associated with your account and click submit.
                            </Typography>
                            <Typography>
                              image
                            </Typography>
                          </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              A confirmation message for an email having been sent to your inbox will be displayed.
                            </Typography>
                            <Typography>
                              image
                            </Typography>
                          </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              Go to the associated email address and click on the reset password” link.
                            </Typography>
                            <Typography>
                              image
                            </Typography>
                          </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              Insert your email address and new password, then click reset.
                            </Typography>
                            <Typography>
                              image
                            </Typography>
                          </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                              You will receive a confirmation message that your password has been successfully reset.
                            </Typography>
                            <Typography>
                              image
                            </Typography>
                          </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography component="div">
                            <Typography>
                            You can now sign in with your new password.
                            </Typography>
                          </Typography>
                        }/>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} >
                  <Box py={2}>
                  <Typography variant="h4">
                    HOME PAGE
                  </Typography>
                  <Box>
                    <Typography>
                    Once you have successfully logged in, the page below will be displayed.
                    </Typography>
                    <div>Image</div>
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
                      Image
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
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Click submit
                          </Typography>
                        }/>
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
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            A slide-out will appear with the details which also show the full NIN and card number, the date of birth, 
                            user who sent the request as well as a detailed log of the request status
                          </Typography>
                        }/>
                      </ListItem>
                    </List>
                    <Box>
                      Image==Request details image==
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
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>NIN Response</Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Match Status </Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Card Status</Typography>
                        }/>
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
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>
                            Click Apply filter.
                          </Typography>
                        }/>
                      </ListItem>
                    </List>
                    <Box>
                      Filter====Image=====
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
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Filter out the data according to desired criteria</Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Select start and end dates</Typography>
                        }/>
                      </ListItem>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={
                          <Typography>Click “Export data to excel”.</Typography>
                        }/>
                      </ListItem>
                    </List>
                    <Typography>
                      On completion, a notification will be shown and the file will be downloaded.
                    </Typography>
                    <Box>
                      Download export======image====
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={12} >
                    <Box py={2}>
                    <Typography variant="h4">
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
                    <Typography variant="h4">
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
                      Portal=====Image====
                      <Typography>
                        Note: The application will be activated in a new window or on a new browser card. 
                        If the message about blocking pop-up windows appears, click on the message, and allow the pop-up window to open.
                      </Typography>
                    </Box>
                    </Box>
                  </Grid>
              </Grid>
            </Paper>
            </Box>
          </Grid>
        </Grid>
      </Layout>
)}

export default Help
