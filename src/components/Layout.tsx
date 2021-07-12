import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router";
import grey from "@material-ui/core/colors/grey";
import { Typography } from "@material-ui/core";
import { themeBackground } from "../theme/custom-colors";
import Paper from "@material-ui/core/Paper";
import { GlobalHotKeys, configure } from "react-hotkeys";
import Home from "../modules/home/Home";
import Grid from "@material-ui/core/Grid";
import AddButton from "./AddButton"

configure({ ignoreTags: [] });

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottom: {
      position: "absolute",
      bottom: 28,
      left: 23,
    },
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
    },
    drawer: {
      backgroundColor: themeBackground,
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      backgroundColor: "#FFFFF",
      zIndex: theme.zIndex.drawer + 1,
      [theme.breakpoints.down(670)]: {
        width: 670,
      },
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      color: "#12203",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: {
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: themeBackground,
    },
    content: {
      flexGrow: 1,
      height: "100%",
    },
    body: {
      backgroundColor: grey[50],
      padding: theme.spacing(2),
      [theme.breakpoints.only("xs")]: {
        padding: 0,
      },
      height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
      [theme.breakpoints.up("sm")]: {
        height: `calc(100% - 64px)`,
      },
      overflow: "auto",
    },
    logoHolder: {
      flexGrow: 1,
      maxWidth: "15rem",
      whiteSpace: "nowrap",
    },
    logo: {
      [theme.breakpoints.only("xs")]: {
        height: 25,
        width: "auto",
      },
      height: 59,
      width: "auto",
      marginTop: 2
    },
    menu: {
      color: grey[500],
    },
    menuSelected: {
      color: "#12203",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    navLink: {
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: 18,
      color: "#cc9933",
      textDecoration: "none",
    }
  })
);
interface IProps extends RouteComponentProps {
}

const Layout: React.FC<IProps> = (props: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const userProfile: any = useState({ name: "Peter Ocheng", role: "admin" });
  const [userRole, setUserRole]: any = useState("admin");
  const [open, setOpen] = React.useState(false);
  const [navItems, setNavItems]: any[] = useState([
    { name: "HOME", url: "/", component: Home },
    { name: "LOCATION", url: "/location", component: Home },
    { name: "ROOMS", url: "/rooms", component: Home },
    { name: "OFFERS", url: "/offers", component: Home },
    { name: "MEETINGS", url: "/meetings", component: Home },
    { name: "WEDDINGS", url: "/weddings", component: Home },
    { name: "FOOD", url: "/food", component: Home },
    { name: "GALLERY", url: "/GALLERY", component: Home },
  ]);
  function book() {
    console.log("Coming soon")
  }

  return (
    <div className={classes.root}>
      {/* keyboard shortcut to open new request form */}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.logoHolder} variant="h4">
            Hotel de Luna
          </Typography>
          <Grid container justify="flex-end">
            {navItems.map((item: any, index: number) => (
              <Box px={1} key={index}>
                <Link to={item.url} className={classes.navLink}>
                  {item.name}
                </Link>
                <Divider />
              </Box>
            ))}
            <Box px={1}>
              <AddButton text={"Book Now"} onClick={book} />
            </Box>
          </Grid>
          {/* <BarView textClass={classes.menuSelected} /> */}

        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper className={classes.body}>{props.children}</Paper>
      </main>
    </div>
  );
};

export default withRouter(Layout);
