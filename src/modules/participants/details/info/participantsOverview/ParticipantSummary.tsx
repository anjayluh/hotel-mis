import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Chip } from "@material-ui/core";
import { IParticipant } from "../../../types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import EditIconButton, {
  DeleteIconButton
} from "../../../../../components/EditIconButton";
import Box from "@material-ui/core/Box";

interface IProps {
  data: IParticipant;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      borderRadius: 0
    },

    image: {
      height: 60,
      width: 60,
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    nameHolder: {
      paddingTop: theme.spacing(1)
    },
    companyName: {
      lineHeight: "20px"
    },
    companyCategory: {
      marginTop: "-10px"
    },
    summaryChip: {
      backgroundColor: "#4bb050",
      marginTop: "4px",
      padding: "0px 5px",
      borderRadius: "3px",
      textTransform: "capitalize",
      height: "18px",
      fontSize: "0.75rem"
    },
    hideEditActions: {
      opacity: 0
    },
    showEditActions: {
      opacity: 1
    }
  })
);

const ParticipantSummary = ({ data }: IProps) => {
  const classes = useStyles();
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [canDelete, setCanDelete] = useState<boolean>(false);

  const handleEntered = () => {
    setCanEdit(true);
    setCanDelete(true);
  };
  const handleLeave = () => {
    setCanEdit(false);
    setCanDelete(false);
  };

  return (
    <Grid container>
      <Grid item sm={6}>
        <Grid container justify="flex-start" alignItems="flex-start">
          <Avatar className={classes.image}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Grid item className={classes.nameHolder}>
            {data.company && (
              <Box
                display="flex"
                onMouseEnter={handleEntered}
                onMouseLeave={handleLeave}
              >
                <Box>
                  <Typography variant="h5" className={classes.companyName}>
                    {data.company.name}
                  </Typography>
                </Box>
                <Box
                  ml={2}
                  className={
                    canEdit ? classes.showEditActions : classes.hideEditActions
                  }
                >
                  <EditIconButton />
                </Box>
              </Box>
            )}
            <Typography variant="body2" className={classes.companyCategory}>{data.category}</Typography>
            {data.company && (
              <Chip
                size="small"
                variant="default"
                color="primary"
                className={classes.summaryChip}
                label={data.company.isDeleted ? "Inactive" : "Active"}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ParticipantSummary;
