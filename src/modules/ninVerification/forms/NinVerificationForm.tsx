import React from "react";
import { useState } from "react";
import * as yup from "yup";
import * as faker from "faker";
import { reqString, reqDate, reqNin } from "../../../data/validations";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../components/forms/XFormSimple";
import XTextInput from "../../../components/inputs/XTextInput";
import XDateInput from "../../../components/inputs/XDateInput";
import { useDispatch } from "react-redux";
import { IVerificationRequest } from "../types";
import { remoteRoutes } from "../../../data/constants";
import { post } from "../../../utils/ajax";
import Toast from "../../../utils/Toast";
import { verificationRequestConstants } from "../../../data/redux/ninVerification/reducer";
import { useSnackbar } from "notistack";
import ErrorBoundary from "../../../components/ErrorBoundary/ErrorBoundary";
import snackbarMessages from "../../../data/snackbarMessages";

const schema = yup.object().shape({
  cardNumber: reqString,
  nin: reqNin,
});

interface IProps {
  closeSlideOut: () => any;
  done?: () => any;
  initialData?: any;
}

const ParticipantForm = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState(
    props.initialData
      ? props.initialData
      : {
          name: "",
          nin: "",
          dateOfBirth: new Date("01.01.1990"),
          cardNumber: "",
        }
  );
  const dispatch = useDispatch();

  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: any = {
      nin: values.nin,
      cardNumber: values.cardNumber,
      givenName: values.givenName,
      surname: values.surname,
      otherNames: values.otherNames,
      dateOfBirth: values.dateOfBirth,
    };
    post(
      remoteRoutes.ninVerification,
      toSave,
      (data) => {
        actions.resetForm();
        // Update table to show recently added request
        dispatch({
          type: verificationRequestConstants.RequestsPostNew,
          payload: toSave,
        });
        // Toast.info("Operation successful");
        enqueueSnackbar(snackbarMessages.NinVerification.new, {
          variant: "success",
        });
        actions.resetForm();
        handleClose();
        if (props.done) props.done();
      },
      () => {
        // Toast.error("Operation failed");
        enqueueSnackbar(snackbarMessages.default.fail, {
          variant: "error",
        });
        // actions.setSubmitting(false);
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

  return (
    <ErrorBoundary>
      <XFormSimple
        onSubmit={handleSubmit}
        schema={schema}
        initialValues={data}
        onCancel={handleClose}
        submitText="Send"
      >
        <Grid spacing={1} container direction="column">
          <Grid item xs={12}>
            <XTextInput
              name="nin"
              label="NIN *"
              type="text"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <XTextInput
              name="cardNumber"
              label="Card Number *"
              type="text"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <XTextInput
              name="givenName"
              label="Given Name"
              type="text"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <XTextInput
              name="surname"
              label="Surname"
              type="text"
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <XTextInput
              name="otherNames"
              label="Other Names"
              type="text"
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
          </Grid>
        </Grid>
      </XFormSimple>
    </ErrorBoundary>
  );
};

export default ParticipantForm;
