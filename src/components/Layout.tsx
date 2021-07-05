import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import CodeIcon from "@material-ui/icons/Code";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router";
import { localRoutes, remoteRoutes } from "../data/constants";
import grey from "@material-ui/core/colors/grey";
import { BarView } from "./Profile";
import logo from "../assets/download.png";
import { Typography } from "@material-ui/core";
import { themeBackground } from "../theme/custom-colors";
import Paper from "@material-ui/core/Paper";
import { GlobalHotKeys, configure } from "react-hotkeys";
import { IState } from "../data/types";
import { checkUserRole } from "../utils/BOUSpecificHelpers";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import typography from "../theme/typography";
import Home from "../modules/home/Home";

// Allows hotkeys to work even when items are in focus
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
      maxWidth: "13.5rem",
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
    { name: "LOCATION", url: "/location", component: Home },
    { name: "ROOMS", url: "/rooms", component: Home },
    { name: "OFFERS", url: "/offers", component: Home },
    { name: "MEETINGS", url: "/meetings", component: Home },
    { name: "WEDDINGS", url: "/weddings", component: Home },
    { name: "FOOD", url: "/food", component: Home },
    { name: "GALLERY", url: "/GALLERY", component: Home },
  ]);

  const onClick = (path: string) => () => {
    if (path === localRoutes.help) {
      setOpen(!open)
    }
    const { history, onClose } = props;
    history.push(path);
    if (onClose) onClose();
  };

  const pathMatches = (path: string, str: string) => path.indexOf(str) > -1;

  const getCls = (pathStr: string): string => {
    const {
      match: { path },
    } = props;

    return pathMatches(path, pathStr) ? classes.menuSelected : classes.menu;
  };

  const isSelected = (pathStr: string): boolean => {
    const {
      match: { path },
    } = props;
    return pathMatches(path, pathStr);
  };

  function addNewRequest() {
    props.history.push(localRoutes.ninVerification);
    console.log("request added")
  }

  function closeSlideOutForm() {
    console.log("slideout closed")

  }
  // keymaps and handlers for keyboardshortcuts
  const keyMap = {
    NEW_REQUEST: "alt+n",
  };
  const handleOpen = {
    NEW_REQUEST: addNewRequest,
  };
  const handleClose = {
    NEW_REQUEST: closeSlideOutForm,
  };
  const drawer = (
    <div style={{ backgroundColor: themeBackground, color: "white" }}>
      <div className={classes.toolbar}>
        <div className={classes.logoHolder}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
      </div>
      <Divider />
      <List>
        <a
          href={remoteRoutes.devPortal}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <ListItem button selected={isSelected(localRoutes.devPortal)}>
            <ListItemIcon>
              <CodeIcon className={getCls(localRoutes.devPortal)} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={getCls(localRoutes.devPortal)}>
                  Developer Portal
                </Typography>
              }
            />
          </ListItem>
        </a>

      </List>

    </div>
  );

  return (
    <div className={classes.root}>
      {/* keyboard shortcut to open new request form */}
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.logoHolder}>
            Hotel de Luna
          </Typography>
          <Divider />
          {navItems.map((item: any, index: number) => (
            <Box px={1} key={item.name}>
              <Link to={item.url} className={classes.navLink}>
                {item.name}
              </Link>
              <Divider />
            </Box>
          ))}

          <BarView textClass={classes.menuSelected} />

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
