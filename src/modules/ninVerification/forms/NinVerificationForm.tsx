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
import { printYearMonthDayDate } from "../../../utils/dateHelpers";
import snackbarMessages from "../../../data/snackbarMessages";

const schema = yup.object().shape({
  nin: reqNin,
  cardNumber: reqCardNumber,
  givenName: yup
    .string()
    .test(
      "oneOfRequired",
      "Include atleast surname, other names  or date of birth",
      function (item) {
        return (
          this.parent.givenName ||
          this.parent.surname ||
          this.parent.otherNames ||
          this.parent.dateOfBirth
        );
      }
    ),
  surname: yup
    .string()
    .test(
      "oneOfRequired",
      "Include atleast given name, other names  or date of birth",
      function (item) {
        return (
          this.parent.givenName ||
          this.parent.surname ||
          this.parent.otherNames ||
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
          this.parent.otherNames ||
          this.parent.dateOfBirth
        );
      }
    ),
  dateOfBirth: yup
    .string()
    .nullable()
    .test(
      "oneOfRequired",
      "Include atleast given name, surname or other names",
      function (item) {
        return (
          this.parent.givenName ||
          this.parent.surname ||
          this.parent.otherNames ||
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
          otherNames: "",
          dateOfBirth: new Date("01.01.1990"),
        }
  );
  const dispatch = useDispatch();
  const userProfile = useSelector((state: IState) => state.core.user);
  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: any = {
      surname: values.surname,
      givenNames: values.givenName,
      otherNames: values.otherNames,
      dateOfBirth: printYearMonthDayDate(values.dateOfBirth),
      nin: values.nin,
      cardNumber: values.cardNumber,
      participantId: userProfile.participantId,
    };
    post(
      remoteRoutes.ninVerification,
      toSave,
      (data) => {
        get(remoteRoutes.ninVerificationId + `/${data.requestId}`, (resp) => {
          actions.resetForm();
          // Update table to show recently added request
          dispatch({
            type: verificationRequestConstants.RequestsPostNew,
            payload: resp,
          });
          // Toast.info("Operation successful");
          enqueueSnackbar(snackbarMessages.NinVerification.new, {
            variant: "success",
          });
          actions.resetForm();
          handleClose();
          if (props.done) props.done();
        });
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
        submitText={"Submit"}
        closeText = {"Cancel"}
      >
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
      </XFormSimple>
    </ErrorBoundary>
  );
};

export default NinVerificationForm;
