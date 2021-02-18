import * as React from "react";
import { createStyles, makeStyles, Theme, Grid, Box, Typography, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import grey from "@material-ui/core/colors/grey";
import { themeBackground } from "../../theme/custom-colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    pageHeading: {
      display: "flex",
    },
    subTitle: {
        // paddingLeft: 73,
    },
    subTitleText: {
        color: grey[50],
    },
    subText: {
        color: grey[500],
        fontSize: 13,
    },
    actualItem: {
        paddingTop: 0,
        paddingBottom: 0,
    },
    subTitleExpand: {
        // paddingLeft: 20,
    },
    helpItem: {
        maxHeight: 250,
        paddingLeft: 56,
        overflowY: "auto",
        margin: 0,
        padding: 0,
        listStyle: "none",
        height: "100%",
        '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        },
        backgroundColor: themeBackground,
        [theme.breakpoints.up(1200)]: {
            maxHeight: 300,
        },
        [theme.breakpoints.up(1400)]: {
            maxHeight: 600,
        },
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
        <Collapse in={true} timeout="auto" unmountOnExit className={classes.subTitleExpand}>
        <List component="div" disablePadding>
            {
                userContent.map((menuItem, index) => (
                    <ListItemLink key={index} href="#" className={classes.actualItem}>
                        <ListItemText className={classes.subText} primary={
                            <Typography color='inherit' className={classes.subText}>
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
        <Collapse in={true} timeout="auto" unmountOnExit className={classes.subTitleExpand}>
        <List component="div" disablePadding>
            {
                fiPortalContent.map((menuItem, index) => (
                    <ListItemLink key={index} href="#" className={classes.actualItem}>
                        <ListItemText className={classes.subText} primary={
                            <Typography color='inherit' className={classes.subText}>
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
    const mobileContent = ["Introduction", "API Installation", "Access & Login", "Scanning a National ID", 
                    "Fingerprint Verification", "Scan History", "Basic Troubleshooting"
                    
        ]
    return (
        <Collapse in={true} timeout="auto" unmountOnExit className={classes.subTitleExpand}>
        <List component="div" disablePadding>
            {mobileContent.map((menu, index) => (
                <ListItemLink key={index} href="#" className={classes.actualItem}>
                    <ListItemText className={classes.subText} primary={
                        <Typography color='inherit' className={classes.subText}>
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
        <List component="div" disablePadding className={classes.helpItem}>
          <ListItem button  onClick={() => (setOpenUser(!openUser))} className={classes.subTitle}>
            <ListItemText 
                primary={<Typography color='inherit'>USER MANAGEMENT</Typography>} 
                className={classes.subTitleText} 
            />
          </ListItem>
          <UserManagement openUser={openUser} />
          <ListItem button onClick={() => (setOpenPortal(!openPortal))} className={classes.subTitle}>
            <ListItemText
                primary={<Typography color='inherit'>FI PORTAL</Typography>} 
                className={classes.subTitleText}
             />
          </ListItem>
          <FiPortal openPortal={openPortal}/>
          <ListItem button onClick={() => (setOpenMobile(!openMobile))} className={classes.subTitle}>
            <ListItemText
                primary={<Typography color='inherit'>MOBILE</Typography>} 
                className={classes.subTitleText}
             />
          </ListItem>
          <Mobile openMobile={openMobile}/>
        </List>
        
      </Collapse>
)}

export default HelpMenu
