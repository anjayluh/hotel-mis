import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import * as yup from "yup";
import { reqNin, reqCardNumber } from "../../../data/validations";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../components/forms/XFormSimple";
import XTextInput from "../../../components/inputs/XTextInput";
import XDateInput from "../../../components/inputs/XDateInput";
import { useDispatch, useSelector } from "react-redux";
import { HubConnectionBuilder } from '@microsoft/signalr';
import {WebSocketContext} from '../webSockets/WebSocket';
import { IState } from "../../../data/types";
import { remoteRoutes } from "../../../data/constants";
import { get, post } from "../../../utils/ajax";
import { verificationRequestConstants } from "../../../data/redux/ninVerification/reducer";
import { useSnackbar } from "notistack";
import ErrorBoundary from "../../../components/ErrorBoundary/ErrorBoundary";
import { printYearMonthDayDate, printDate, dateFormat } from "../../../utils/dateHelpers";
import snackbarMessages from "../../../data/snackbarMessages";
import { Typography } from "@material-ui/core";
import { kMaxLength } from "buffer";

const schema = yup.object().shape({
  nin: reqNin,
  cardNumber: reqCardNumber,
  givenName: yup
    .string()
    .test(
      "oneOfRequired",
      "Include at least Given Name or Date of Birth",
      function (item) {
        return (
          this.parent.givenName ||
          this.parent.surname ||
          this.parent.dateOfBirth
        );
      }
    ),
  surname: yup
    .string()
    .test(
      "oneOfRequired",
      "Include at least Surname, or Date of Birth",
      function (item) {
        return (
          this.parent.givenName ||
          this.parent.surname ||
          this.parent.dateOfBirth
        );
      }
    ),
  otherNames: yup
    .string()
    .test(
      "oneOfRequired",
      "Include at least Given Name, Surname  or Date of Birth",
      function (item) {
        return (
          this.parent.givenName ||
          this.parent.surname ||
          this.parent.dateOfBirth
        );
      }
    ),
  dateOfBirth: yup
    .string()
    .nullable()
    .test(
      "oneOfRequired",
      "Include at least Given Name or Surname",
      function (item) {
        return (
          this.parent.givenName ||
          this.parent.surname ||
          this.parent.dateOfBirth
        );
      }
    ),
});

interface IProps {
  closeSlideOut: () => any;
  done?: () => any;
  initialData?: any;
}

const NinVerificationForm = (props: IProps) => {
 
  const webSocket: any = useContext(WebSocketContext)

  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState(
    props.initialData
      ? props.initialData
      : {
          nin: "",
          cardNumber: "",
          givenName: "",
          surname: "",
          dateOfBirth: null,
        }
  );
  const [cardNumberMessage, setCardNumberMessage] = useState('')
  const [validationMessage, setValidationMessage] = useState({
    cardNumberMessage: '', ninMessage: ''})
  const [keyStrokes, setKeyStrokes] = useState(0)
  const dispatch = useDispatch();
  const userProfile = useSelector((state: IState) => state.core.user);

  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: any = {
      surname: values.surname.toUpperCase(),
      givenNames: values.givenName.toUpperCase(),
      dateOfBirth: printYearMonthDayDate(values.dateOfBirth),
      nin: values.nin,
      cardNumber: values.cardNumber,
    };
    post(
      remoteRoutes.ninRequests,
      toSave,
      (data) => {
        actions.resetForm();
        // Invoke websocket to fetch requests and Update table to show recently added request
        webSocket.getRequests();
       
        enqueueSnackbar(snackbarMessages.NinVerification.new, {
          variant: "success",
        });
        actions.resetForm();
        handleClose();
        if (props.done) props.done();
        
      },
      () => {
        enqueueSnackbar(snackbarMessages.default.fail, {
          variant: "error",
        });
      }
    );
  }

  function handleClose() {
    props.closeSlideOut();
    dispatch({
      type: verificationRequestConstants.RequestsAddNew,
      payload: false,
    });
    dispatch({
      type: verificationRequestConstants.TurnOnSlideout,
      payload: false,
    });
  }
  
  function handleChange(event: React.ChangeEvent<any>) {
    const name = event.target.name.trim();
    let value = event.target.value.trim();
    if(name === 'nin') value = value.toUpperCase();
    const newData = { ...data, [name]: value };
    setData(newData);
    
  }

  const handleValueChange = (name: string) => (value: any) => {
    const newData = { ...data, [name]: value };
    setData(newData);
  };

  function detectKeyStrokes(event: React.ChangeEvent<any>) {
    let keyClicks = keyStrokes + 1
    setKeyStrokes(keyClicks)
    const name = event.target.name.trim();
    let value = event.target.value.trim();
    if(name === "cardNumber") {
      if(value.length === 9 && keyStrokes >= 1) {
        setValidationMessage({...validationMessage, cardNumberMessage: 'Card Number must be only 9 characters'})
      }
    }
    else if (name === "nin") {
      if(value.length === 14 && keyStrokes >= 1) {
        setValidationMessage({...validationMessage, ninMessage: 'NIN must be only 14 characters'})
      }
    }
    
  }
  return (
    <ErrorBoundary>
      <XFormSimple
        onSubmit={handleSubmit}
        schema={schema}
        initialValues={data}
        onCancel={handleClose}
        submitText={"Submit"}
        closeText = {"Cancel"}
      >
        <Grid item xs={12}>
          <XTextInput
            name="nin"
            label="NIN *"
            type="text"
            variant="outlined"
            onChange={handleChange}
            inputProps={{ maxLength: 14 }}
            onKeyDown={detectKeyStrokes}
            autoFocus
            size="small"
          />
          {!!validationMessage.ninMessage && (
            <Typography variant="body2" style={{paddingLeft: 15 }}>NIN must be only 14 characters</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="cardNumber"
            label="Card Number *"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 9 }}
            onChange={handleChange}
            onKeyDown={detectKeyStrokes}
            size="small"
          />
          {!!validationMessage.cardNumberMessage && (
            <Typography variant="body2" style={{paddingLeft: 15 }}>Card Number must be only 9 characters</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="surname"
            label="Surname"
            type="text"
            inputProps={{style: {textTransform: 'uppercase'}}}
            variant="outlined"
            onChange={handleChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="givenName"
            label="Given Name"
            type="text"
            inputProps={{style: {textTransform: 'uppercase'}}}
            variant="outlined"
            onChange={handleChange}
            size="small"
          />
          
        </Grid>
        <Grid item xs={12}>
          <XDateInput
            name="dateOfBirth"
            label="Date of Birth"
            inputVariant="outlined"
            onChange={handleValueChange('dateOfBirth')}
            size="small"
          />
          <Typography variant="body2" style={{paddingLeft: 15 }}>Date format: dd.mm.yyyy ({printDate(Date.now())})</Typography>
        </Grid>
      </XFormSimple>
    </ErrorBoundary>
  );
};

export default NinVerificationForm;
