import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import useTheme from "@material-ui/core/styles/useTheme";
import { errorColor } from "../theme/custom-colors";
import { SvgIcon } from "@material-ui/core";

interface IProps {
  onClick?: (method?: string, id?: string) => any;
  style?: any;
  id?: any;
}

export const HiddenIcon = () => {
  return <SvgIcon style={{ fontSize: "1rem", margin: 4 }} />;
};

export const EditIconButton = ({ onClick, style, id }: IProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick("edit", id);
    }
  };
  return (
    <IconButton
      aria-label="delete"
      size="small"
      title="Edit"
      color="primary"
      style={{ ...style }}
      onClick={handleClick}
    >
      <EditIcon style={{ fontSize: "1rem", margin: 4 }} />
    </IconButton>
  );
};

export const DeleteIconButton = ({ onClick, style, id }: IProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };
  return (
    <IconButton
      aria-label="delete"
      size="small"
      title="Edit"
      style={{ color: errorColor, ...style }}
      onClick={handleClick}
    >
      <DeleteIcon style={{ fontSize: "1rem", margin: 4 }} />
    </IconButton>
  );
};

export const AddIconButton = ({ onClick, style }: IProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick("add");
    }
  };
  return (
    <IconButton
      aria-label="add-new"
      size="small"
      title="Add New"
      color="primary"
      style={{ ...style }}
      onClick={handleClick}
    >
      <AddIcon />
    </IconButton>
  );
};
export const AddFabButton = ({ onClick }: IProps) => {
  const theme = useTheme();
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Fab
      aria-label="add-new"
      style={{
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      }}
      color="primary"
      onClick={handleClick}
    >
      <AddIcon />
    </Fab>
  );
};

export const MoreIconButton = ({ onClick }: IProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <IconButton
      aria-label="add-new"
      size="small"
      title="More"
      style={{ marginTop: 5 }}
      onClick={handleClick}
    >
      <MoreHorizIcon />
    </IconButton>
  );
};

export default EditIconButton;
