import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addNewButton: {
      color: "#654C1B",
      backgroundColor: "#CC9932",
      fontSize: 12,
      lineHeight: 1,
      marginBottom: -5,
      marginLeft: 8,
      marginTop: -9,
      padding: "10px 15px",
    },
    addIcon: {
      marginLeft: -5,
      marginRight: -10,
      height: "0.7em",
      fontSize: 13,
    },
  })
);
interface IProps {
  onClick: () => any;
  text: string;
  excludeIcon?: boolean;
}
const AddButton = (props: IProps) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.addNewButton}
      startIcon={props.excludeIcon && <AddIcon className={classes.addIcon} />}
      variant="contained"
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

export default AddButton;
