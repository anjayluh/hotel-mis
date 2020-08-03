import React from "react";
import { useDispatch } from "react-redux";
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
import AssignmentIcon from "@material-ui/icons/Assignment";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Dashboard from "@material-ui/icons/Dashboard";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CodeIcon from "@material-ui/icons/Code";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import { withRouter, RouteComponentProps } from "react-router";
import { localRoutes } from "../data/constants";
import grey from "@material-ui/core/colors/grey";
import { BarView } from "./Profile";
import logo from "../assets/download.png";
import { Typography } from "@material-ui/core";
import { themeBackground } from "../theme/custom-colors";
import Paper from "@material-ui/core/Paper";
import { verificationRequestConstants } from "../data/redux/ninVerification/reducer";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
    },
    drawer: {
      backgroundColor: themeBackground,
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      backgroundColor: themeBackground,
      zIndex: theme.zIndex.drawer + 1,
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      color: grey[50],
      [theme.breakpoints.up("sm")]: {
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
      height: 30,
      width: "auto",
    },
    menu: {
      color: grey[500],
    },
    menuSelected: {
      color: grey[50],
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
  })
);
interface IProps extends RouteComponentProps {
  hideRequestButton?: boolean;
}
const Layout: React.FC<IProps> = (props: any) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const onClick = (path: string) => () => {
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
    dispatch({
      type: verificationRequestConstants.RequestsAddNew,
      payload: true,
    });
  }

  const drawer = (
    <div style={{ backgroundColor: themeBackground, color: "white" }}>
      <div className={classes.toolbar}>
        <div className={classes.logoHolder}>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          onClick={onClick(localRoutes.ninVerification)}
          selected={isSelected(localRoutes.ninVerification)}
        >
          <ListItemIcon>
            <VerifiedUserIcon className={getCls(localRoutes.ninVerification)} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={getCls(localRoutes.ninVerification)}>
                ID Verification
              </Typography>
            }
          />
        </ListItem>

        <ListItem
          button
          onClick={onClick(localRoutes.users)}
          selected={isSelected(localRoutes.users)}
        >
          <ListItemIcon>
            <PeopleIcon className={getCls(localRoutes.users)} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={getCls(localRoutes.users)}>
                Users
              </Typography>
            }
          />
        </ListItem>
        <ListItem
          button
          onClick={onClick(localRoutes.settings)}
          selected={isSelected(localRoutes.settings)}
        >
          <ListItemIcon>
            <SettingsIcon className={getCls(localRoutes.settings)} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={getCls(localRoutes.settings)}>
                Settings
              </Typography>
            }
          />
        </ListItem>
        {/* <ListItem
          button
          onClick={onClick(localRoutes.developerPortal)}
          selected={isSelected(localRoutes.developerPortal)}
        >
          <ListItemIcon>
            <CodeIcon className={getCls(localRoutes.developerPortal)} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={getCls(localRoutes.developerPortal)}>
                Developer Portal
              </Typography>
            }
          />
        </ListItem> */}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.logoHolder}>
            <img src={logo} alt="logo" className={classes.logo} />
          </div>
          {!props.hideRequestButton && (
            <Button variant="contained" color="primary" onClick={addNewRequest}>
              New Request
            </Button>
          )}

          <BarView textClass={classes.menuSelected} />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open={false}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper className={classes.body}>{props.children}</Paper>
      </main>
    </div>
  );
};

export default withRouter(Layout);
