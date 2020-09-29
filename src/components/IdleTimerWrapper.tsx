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
      width: 180,
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
  const [timeRemaining, setTimeRemaining] = useState(10000/1000)
  const deactivateText =
    "For security reasons, your connection timesout after you've been inactive for a while. Click continue to stay signed in.";
  const timeToLogout = 10000;
  const idleTime = 1000 * 60 * 5;
  const idleTimerRef = useRef(null)
  const sessionTimeoutRef: any = useRef(null)
  const onIdle = () => {
    setPopUp(true)
    countDown()
    sessionTimeoutRef.current = setTimeout(doLogout, timeToLogout)
    
  }
  function handleCancel() {
    setPopUp(false);
  }
  function handleContinue() {
    setPopUp(false);
    clearTimeout(sessionTimeoutRef.current)
    setTimeRemaining(10000/1000)
  }
  async function doLogout() {
    dispatch(handleLogout());
    await authService.logout();
    clearTimeout(sessionTimeoutRef.current)
  }

  const countDown = () => {
    let timeToCountDown = 10000/1000
    setInterval(function() {
      timeToCountDown -= 1;
      setTimeRemaining(timeToCountDown)
      }, 1000);
  }
  return (
    <div>
      <IdleTimer 
      ref={idleTimerRef}
      timeout={idleTime}
      onIdle={onIdle}
      ></IdleTimer>
      <DeleteDialog
          title={"You are about to be logged out"}
          open={popUpOpen}
          children={deactivateText}
          handleCancel={handleCancel}
          handleDelete={handleContinue}
          icon={TimeoutIcon}
          deleteText={`Continue (${timeRemaining})`}
          buttonClass={classes.continueButton}
          cancelButton={false}
          trashClass={classes.trash}
          trashContainerClass={classes.trashContainerClass}
          disableBackdropClick={true}
        ></DeleteDialog>
    </div>
  )
}

export default IdleTimerWrapper