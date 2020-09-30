import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import trash from "../assets/trash.svg";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      "& h2": {
        fontSize: 18,
      },
    },
    body: {
      marginTop: 12,
      fontSize: 16,
    },
    delete: {
      color: "#FAD6E2",
      backgroundColor: "#DD004F",
      padding: "3px 29px",
      "&:hover": {
        backgroundColor: "#DD004F",
      },
      width: 125,
    },
    cancel: {
      color: "#1977DB",
      marginRight: 43,
    },
    trashContainer: {
      backgroundColor: "#FEEBED",
      width: 56,
      height: 56,
      textAlign: "center",
      lineHeight: 6,
      borderRadius: "50%",
      marginTop: 4,
    },
    trash: {
      width: 22,
    },
    actions: {
      padding: "8px 24px 19px 24px",
    },
    progress: {
      color: "#fffaf8",
      marginBottom: 4,
      marginRight: 5,
    },
  })
);

interface IProps {
  open: boolean;
  title: string;
  children: any;
  handleCancel: () => any;
  handleDelete: (...item: any) => any;
  itemId?: string;
  loading?: boolean;
  deleteText?: string;
  icon?: any;
  buttonClass?: any;
  trashClass?: any;
  trashContainerClass?: any;
  disableBackdropClick?: boolean;
  onBackdropClick?: () => any;
  cancelButton: boolean;
}
const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function AlertDialogSlide({
  children,
  open,
  handleCancel,
  handleDelete,
  title,
  itemId,
  loading,
  deleteText,
  icon,
  buttonClass,
  cancelButton,
  trashClass,
  trashContainerClass,
  disableBackdropClick,
  onBackdropClick,
}: IProps) {
  const classes = useStyles();
  const onClose = () => {
    handleCancel();
  };
  const onDelete = () => {
    handleDelete(itemId );
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick={disableBackdropClick}
        onBackdropClick={onBackdropClick}
      >
        <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
          {title}
        </DialogTitle>
        <DialogContent>
          <Grid container wrap={"nowrap"} spacing={2}>
            <Grid item>
              <div className={trashContainerClass ? trashContainerClass : classes.trashContainer}>
                <img src={icon ? icon : trash} alt="trash icon" className={trashClass ? trashClass : classes.trash} />
              </div>
            </Grid>
            <Grid item xs>
              <DialogContentText
                id="alert-dialog-slide-description"
                className={classes.body}
              >
                {children}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={classes.actions}>
          {
            cancelButton &&
            <Button onClick={onClose} className={classes.cancel}>
            Cancel
          </Button>
          }
          
          <Button
            onClick={onDelete}
            className={buttonClass ? buttonClass: classes.delete}
            variant="contained"
            color={"primary"}
          >
            {loading && (
              <CircularProgress className={classes.progress} size={12} />
            )}
            {deleteText ? deleteText : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
