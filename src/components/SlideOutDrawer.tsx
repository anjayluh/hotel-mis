import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 25,
      width: 400,
      marginTop: 64,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    title: {
      marginLeft: 8,
    },
  })
);

type Anchor = "top" | "left" | "bottom" | "right"; //The four directions that the slideout can show

interface IProps {
  anchor: Anchor;
  open: boolean;
  handleToggleDrawer: () => any;
  title: string | null;
  children?: any;
}

export default function SlideOutDrawer(props: IProps) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: string, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    props.handleToggleDrawer();
    setState({ ...state, [props.anchor]: props.open });
  };

  return (
    <div>
      <React.Fragment key="right">
        <Drawer
          anchor={props.anchor}
          open={props.open}
          BackdropProps={{ invisible: true }}
          onClose={toggleDrawer(props.anchor, false)}
          classes={{
            paper: classes.root,
          }}
        >
          <Typography variant="h5" className={classes.title}>
            {props.title}
          </Typography>
          <div>{props.children}</div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
