import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

interface IProps {
  title: string;
  addButton?: any;
  editButton?: any;
  icon?: any;
  handleClickedItem?: (item: any) => any;
  status?: any;
  customStyles?: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      paddingTop: "3px"
    },
    active: {
      borderBottom: "3px solid"
    },
    padding: {
      paddingLeft: "20px",
      paddingRight: "20px"
    }
  })
);
const SectionTitle = ({
  title,
  addButton,
  editButton,
  icon,
  handleClickedItem,
  status,
  customStyles
}: IProps) => {
  const classes = useStyles();
  const [canAdd, setCanAdd] = useState<boolean>(false);
  const [isActive, setIsActive] = useState(status);
  const handleEntered = () => {
    setCanAdd(true);
  };
  const handleLeave = () => {
    setCanAdd(false);
  };
  useEffect(() => {
    setIsActive(status);
  }, [status]);
  const handleClick = () => {
    if (handleClickedItem) {
      handleClickedItem(title);
    }
  };
  const active = isActive ? classes.active : "";
  const padding = customStyles === "padding" ? classes.padding : "";
  return (
    <Box
      display="flex"
      py={1}
      onMouseEnter={handleEntered}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className={`has-hidden-icon ${active} ${padding}`}
    >
      <Box display="flex" flexGrow={1} className={classes.heading}>
        <Box>
          <Typography variant="body1">{icon}</Typography>
        </Box>
        <Box>
          <Typography variant="body2">
            &nbsp;<b>{title}</b>
          </Typography>
        </Box>
        {addButton && (
          <Box ml={2} mt={-0.8}>
            {canAdd && addButton}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SectionTitle;
