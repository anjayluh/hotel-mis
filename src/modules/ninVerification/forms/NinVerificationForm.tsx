import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { reqNin, reqCardNumber } from "../../../data/validations";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../components/forms/XFormSimple";
import XTextInput from "../../../components/inputs/XTextInput";
import XDateInput from "../../../components/inputs/XDateInput";
import { useDispatch, useSelector } from "react-redux";
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
      "Include atleast surname or date of birth",
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
      "Include atleast given name, or date of birth",
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
      "Include atleast given name, surname  or date of birth",
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
      "Include atleast given name or surname",
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
      remoteRoutes.ninVerification,
      toSave,
      (data) => {
        get(remoteRoutes.ninVerificationId + `/${data.id}`, (resp) => {
          actions.resetForm();
          // Update table to show recently added request
          dispatch({
            type: verificationRequestConstants.RequestsPostNew,
            payload: resp,
          });
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
            });
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
  }
  
  function detectLimit(event: React.ChangeEvent<any>) {
    const name = event.target.name.trim();
    const value = event.target.value.trim();
    const newData = { ...data, [name]: value };
    setData(newData);
    
  }

  function detectKeyStrokes() {
    let keyClicks = keyStrokes + 1
    setKeyStrokes(keyClicks)
    if(data.cardNumber.length === 9 && keyStrokes > 9) {
      setCardNumberMessage(" Card Number must be only 9 characters")
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
            autoFocus
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="cardNumber"
            label="Card Number *"
            type="text"
            variant="outlined"
            inputProps={{ maxLength: 9 }}
            onChange={detectLimit}
            onKeyDown={detectKeyStrokes}
            size="small"
          />
          {!!cardNumberMessage && (
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
            size="small"
          />
          
        </Grid>
        <Grid item xs={12}>
          <XDateInput
            name="dateOfBirth"
            label="Date of Birth"
            inputVariant="outlined"
            size="small"
          />
          <Typography variant="body2" style={{paddingLeft: 15 }}>Date format: dd.mm.yyyy ({printDate(Date.now())})</Typography>
        </Grid>
      </XFormSimple>
    </ErrorBoundary>
  );
};

export default NinVerificationForm;
