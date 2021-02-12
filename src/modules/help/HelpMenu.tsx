import * as React from "react";
import { createStyles, makeStyles, Theme, Grid, Box, Typography, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    pageHeading: {
      display: "flex",
    },
    subTitle: {
        paddingLeft: 73,
    },
    subTitleText: {
        color: grey[500]
    },
    subText: {
        color: grey[500],
        fontSize: 12
    },
    subTitleExpand: {
        paddingLeft: 20,
    }
  })
);

interface IProps {
    open?: boolean;
    openUser?: boolean;
    openPortal?: boolean;
    openMobile?: boolean;
}

function ListItemLink(props: any) {
    return <ListItem button component="a" {...props} />;
  }

const UserManagement = ({openUser}: IProps) => {
    const classes = useStyles();
    const userContent = [
        "Introduction", "Manage Users"
    ]
    return (
        <Collapse in={openUser} timeout="auto" unmountOnExit className={classes.subTitleExpand}>
        <List component="div" disablePadding>
            {
                userContent.map((menuItem, index) => (
                    <ListItemLink key={index} href="#">
                        <ListItemText inset className={classes.subText} primary={
                            <Typography color='inherit'>
                                {menuItem}
                            </Typography>} 
                        />
                    </ListItemLink> 
                ))
            }
        </List>
      </Collapse>
    )
}
const FiPortal = ({openPortal}: IProps) => {
    const classes = useStyles();
    const fiPortalContent = [
        "Introduction", "Access & Login", "Main page", "Settings", "API Docs" 
    ]
    return (
        <Collapse in={openPortal} timeout="auto" unmountOnExit className={classes.subTitleExpand}>
        <List component="div" disablePadding>
            {
                fiPortalContent.map((menuItem, index) => (
                    <ListItemLink key={index} href="#">
                        <ListItemText inset className={classes.subText} primary={
                            <Typography color='inherit'>
                                {menuItem}
                            </Typography>} 
                        />
                    </ListItemLink>
                ))
            }
        </List>
      </Collapse>
    )
}

const Mobile = ({openMobile}: IProps) => {
    const classes = useStyles();
    const mobileContent = ["Introduction", "APP Installation", "Access & Login", "Scanning a National ID", 
                    "Fingerprint Verification", "Scan History", "Basic Troubleshooting"
                    
        ]
    return (
        <Collapse in={openMobile} timeout="auto" unmountOnExit className={classes.subTitleExpand}>
        <List component="div" disablePadding>
            {mobileContent.map((menu, index) => (
                <ListItemLink key={index} href="#">
                    <ListItemText inset className={classes.subText} primary={
                        <Typography color='inherit'>
                            {menu}
                        </Typography>} 
                    />
                </ListItemLink>
            ))}
        </List>
      </Collapse>
    )
}
const HelpMenu = ({open}: IProps) => {
  const classes = useStyles();
  const [openUser, setOpenUser] = React.useState(false)
  const [openPortal, setOpenPortal] = React.useState(false)
  const [openMobile, setOpenMobile] = React.useState(false)
    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button  onClick={() => (setOpenUser(!openUser))} className={classes.subTitle}>
            <ListItemText 
                primary={<Typography color='inherit'>User Management</Typography>} 
                className={classes.subTitleText} 
            />
          </ListItem>
          <UserManagement openUser={openUser} />
          <ListItem button onClick={() => (setOpenPortal(!openPortal))} className={classes.subTitle}>
            <ListItemText
                primary={<Typography color='inherit'>FI Portal</Typography>} 
                className={classes.subTitleText}
             />
          </ListItem>
          <FiPortal openPortal={openPortal}/>
          <ListItem button onClick={() => (setOpenMobile(!openMobile))} className={classes.subTitle}>
            <ListItemText
                primary={<Typography color='inherit'>Mobile</Typography>} 
                className={classes.subTitleText}
             />
          </ListItem>
          <Mobile openMobile={openMobile}/>
        </List>
        
      </Collapse>
)}

export default HelpMenu
