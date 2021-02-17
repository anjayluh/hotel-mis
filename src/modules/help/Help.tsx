import * as React from "react";
import { createStyles, makeStyles, Theme, Grid, Box, Typography, Paper } from "@material-ui/core";
import Layout from "../../components/Layout";
import { List } from "@material-ui/core";
import { ListItem } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
    },
    pageHeading: {
      display: "flex",
    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2),
    },
  })
);
const Help = () => {
  const classes = useStyles();
    return (
      <Layout>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box px={2} className={classes.root}>
              <Paper className={classes.filterPaper} elevation={0}>
              <Box pb={2}>
                <Grid container>
                  <Grid item sm={12} className={classes.pageHeading}>
                    <Typography variant="h4">Help</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Grid item xs={12} >
                <Typography>
                  This service will be used by the system administrator to create and manage the users for their institution. 
                  The system administrator will be provided with credentials 
                  by Laboremus which he will use to log into the application to create and manage the rest of the users.
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography variant="h2">Login</Typography>
                <List>
                    <ListItem>
                      <ListItemText primary="•	On the welcome page, click sign in."/>
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="•	Then enter your username and password as provided by Laboremus on the next page."/>
                    </ListItem>
                </List>
              </Grid>
              <Grid item sm={12}>
            <Typography variant="h2">Home page</Typography>
            <Typography>
              The home page has a table of users created on the system. The buttons on the page are as explained below.
            </Typography>
            <Typography variant="h3">
            1.	Add user
            </Typography>
            <List>
                <ListItem>
                  <ListItemText
                  primary={
                    <div>
                      <Typography>•	Click the “Add User” button to create a new user in the system. </Typography>
                      <Typography>•	Add the user details in the form that slides out as in figure below and select a role for the user.</Typography>
                      <Typography>•	Click save</Typography>
                      <Typography>•	The user is listed by ID, full name, email address and role.</Typography>
                      <Typography>
                        •	The systems admin will then send the user their details by email and should advise them to change their 
                          password to a preferred password after the fist login using the “forgot password” link.
                        </Typography>
                    </div>
                  }
                  />
                </ListItem>
                <div>
                  <Typography>Image</Typography>
                </div>
                <ListItem>
                  <ListItemText primary="Edit User details"
                    secondary={
                      <div>
                        <Typography>
                          •	Click on the view icon at the far-right end of the line with the user you want to edit, shown in Figure 4; 
                          and a user details form will slide out.
                        </Typography>
                        <Typography>
                          •	Click on “edit” in the bottom right corner as shown in B
                        </Typography>
                        <Typography>
                          •	Enter changes to the user details as shown in form C. 
                          You are required to input your current password of the user at this stage, 
                          otherwise you will not be able to save the changes.
                        </Typography>
                        <Typography>
                          •	Click save in the bottom right corner.
                          </Typography>
                        
                      </div>
                    }
                  />
                </ListItem>
                
                <div>
                  <Typography>
                    Image
                  </Typography>
                </div>
                <ListItem>
                  <ListItemText primary="Deactivate user"
                    secondary={
                      <div>
                        <Typography>
                        •	To deactivate a user, click on the deactivate button in the top right corner of the edit slide out as shown in Figure 4. 
                        This user will no longer be able to access the system.
                        </Typography>
                      </div>
                    }
                  />
                </ListItem>
            </List>
            <Typography variant="h3">
              Sign out
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="•	Click on the sign out button as shown in Figure 2."/>
              </ListItem>
              <ListItem>
                <ListItemText primary="•	You will be logged out of the system and redirected to the welcome page."/>
              </ListItem>
            </List>
            <Typography variant="h3">
              Search for user
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="•	Users will be searched by email address. Write the email address in the search field as indicated in Figure 2."/>
              </ListItem>
              <ListItem>
                <ListItemText primary="•	Press enter button on your keyboard."/>
              </ListItem>
              <ListItem>
                <ListItemText primary="•	To return to the table with all users, delete the email address from the search field and press enter."/>
              </ListItem>
            </List>
          </Grid>
            </Paper>
            </Box>
          </Grid>
        </Grid>
      </Layout>
)}

export default Help
