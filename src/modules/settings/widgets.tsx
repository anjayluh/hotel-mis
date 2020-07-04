import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

interface IProps {
  label: string;
  editIcon: any;
  values?: any;
  handleIconClick: (values: any) => any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

export default function ActionChip({
  label,
  editIcon,
  values,
  handleIconClick,
}: IProps) {
  const classes = useStyles();

  const handleEdit = () => {
    handleIconClick(values);
    // Is called when the icon is clicked
  };

  const handleClick = () => {
    // Is called when the chip is clicked
  };

  return (
    <div className={classes.root}>
      <Chip
        label={label}
        onClick={handleClick}
        onDelete={handleEdit}
        deleteIcon={editIcon}
      />
    </div>
  );
}
