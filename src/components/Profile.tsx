import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../data/types";
import HiddenJs from "@material-ui/core/Hidden/HiddenJs";
import { getInitials } from "../utils/stringHelpers";
import { handleLogout } from "../data/redux/coreActions";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid } from "@material-ui/core";
import { Box } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import DetailView, { IRec } from "./DetailView";
import authService from "../data/oidc/AuthService";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginLeftAuto: {
      marginLeft: "auto",
    },
    title: {
      "& h2": {
        fontSize: 18,
      },
    },
  })
);
export const BarView = (props: any) => {
  const classes = useStyles();
  const userProfile = useSelector((state: IState) => state.core.user);
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  function createFields(user: any): IRec[] {
    return [
      {
        label: "Username",
        value: user.name ? user.name : "-",
      },
      {
        label: "Phone Number",
        value: user.phoneNumber ? user.phoneNumber : "-",
      },
      {
        label: "Official Email",
        value: user.given_name ? user.given_name : "-",
      },
    ];
  }
  function openDialog() {
    setDialogOpen(true);
  }

  async function doLogout() {
    dispatch(handleLogout());
    await authService.logout();
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }
  const formattedRole = (role: string) => {
    return role.replace("_", " ");
  };
  return (
    <div className={classes.marginLeftAuto}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle className={props.textClass} />
        &nbsp;
        <HiddenJs xsDown>
          <Typography className={props.textClass}>
            {userProfile.name ? userProfile.name : "-"}
          </Typography>
        </HiddenJs>
        <HiddenJs smUp>
          <Typography className={props.textClass}>
            {getInitials(userProfile.name)}
          </Typography>
        </HiddenJs>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={openDialog}>Profile</MenuItem>
        <MenuItem onClick={doLogout}>Logout</MenuItem>
      </Menu>
      <Dialog
        fullWidth={true}
        open={dialogOpen}
        keepMounted
        onClose={closeDialog}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Grid container direction="row">
            <Grid item xs={1}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
            </Grid>
            <Grid item xs={11}>
              <Grid item style={{ marginTop: 0 }}>
                <Typography variant="h5" noWrap component="div">
                  {userProfile.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  noWrap
                  component="div"
                  style={{ textTransform: "capitalize" }}
                >
                  {formattedRole(userProfile.roles[0])}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogTitle>
        <Grid container direction="row">
          <Grid item>
            <Box mt={0.1} mr={0.2} ml={3}>
              <PersonIcon style={{ fontSize: 16 }} />
            </Box>
          </Grid>
          <Grid item>
            <Box mt={0} mr={3} mb={0.5}>
              <Typography
                variant="subtitle2"
                noWrap
                component="div"
                style={{ fontSize: 12, fontWeight: 600 }}
              >
                Profile Information
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box mt={0} mr={3} ml={3} mb={0.5}>
            <Divider />
          </Box>
        </Grid>
        <DialogContent style={{ marginBottom: 55 }}>
          <DetailView data={createFields(userProfile)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
