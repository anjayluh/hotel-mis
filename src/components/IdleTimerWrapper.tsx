import React, {useRef, useState} from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IdleTimer from 'react-idle-timer';
import DeleteDialog from '../components/DeleteDialog'
import TimeoutIcon from '../assets/timeout.png'
import {handleLogout} from '../data/redux/coreActions'
import authService from '../data/oidc/AuthService';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    continueButton: {
      color: "white",
      backgroundColor: '#065fd4',
      padding: "3px 29px",
      "&:hover": {
        backgroundColor: '#065fd4',
      },
      width: 125,
    },
    trashContainerClass: {
      textAlign: "center",
      lineHeight: 2,
      marginTop: 5,
    },
    trash: {
      width: 56,
    },
    
  })
);


const IdleTimerWrapper = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [popUpOpen, setPopUp] = useState(false)
  const deactivateText =
    "For security reasons, your connection timesout after you've been inactive for a while. Click continue to stay signed in.";

  const idleTimerRef = useRef(null)
  const sessionTimeoutRef: any = useRef(null)
  const onIdle = () => {
    setPopUp(true)
    console.log('User is idle')
    sessionTimeoutRef.current = setTimeout(doLogout, 10000)
    
  }
  function handleCancel() {
    setPopUp(false);
  }
  function handleContinue() {
    setPopUp(false);
    clearTimeout(sessionTimeoutRef.current)
  }
  async function doLogout() {
    dispatch(handleLogout());
    await authService.logout();
    clearTimeout(sessionTimeoutRef.current)
  }
  return (
    <div>
      <IdleTimer 
      ref={idleTimerRef}
      timeout={300*1000}
      onIdle={onIdle}
      ></IdleTimer>
      <DeleteDialog
          title={"You are about to be logged out"}
          open={popUpOpen}
          children={deactivateText}
          handleCancel={handleCancel}
          handleDelete={handleContinue}
          icon={TimeoutIcon}
          deleteText={"Continue"}
          buttonClass={classes.continueButton}
          cancelButton={false}
          trashClass={classes.trash}
          trashContainerClass={classes.trashContainerClass}
        ></DeleteDialog>
    </div>
  )
}

export default IdleTimerWrapper