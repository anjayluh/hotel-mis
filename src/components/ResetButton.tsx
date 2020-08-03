import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    resetButton: {
      color: "#428BCA",
      textTransform: "capitalize",
      fontStyle: "italic",
      fontSize: 12,
    },
  })
);
interface IProps {
  onClick: () => any;
  text: string;
}
const ResetButton = (props: IProps) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.resetButton}
      variant="text"
      size="small"
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

export default ResetButton;
