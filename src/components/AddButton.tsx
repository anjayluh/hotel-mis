import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addNewButton: {
      color: "#428BCA",
      textTransform: "capitalize",
      fontStyle: "italic",
      fontSize: 12,
      lineHeight: 0.5,
      marginBottom: -5,
      marginLeft: 8,
      marginTop: -6,
      fontWeight: "normal",
      padding: "6px 15px",
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
}
const AddButton = (props: IProps) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.addNewButton}
      startIcon={<AddIcon className={classes.addIcon} />}
      variant="text"
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

export default AddButton;
