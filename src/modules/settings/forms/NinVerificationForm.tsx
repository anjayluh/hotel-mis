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
// import Toast from "../../../utils/Toast";
import { verificationRequestConstants } from "../../../data/redux/ninVerification/reducer";
import { useSnackbar} from 'notistack';

const schema = yup.object().shape({
  name: reqString,
  nin: reqNin,
  dateOfBirth: reqDate,
  cardNumber: reqString
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
          cardNumber: ""
        }
  );
  const dispatch = useDispatch();

  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: IVerificationRequest = {
      id: faker.random.uuid(),
      name: values.name,
      date: new Date(),
      nin: values.nin,
      status: {
        id: faker.random.uuid(),
        name: "Done"
      },
      dateOfBirth: values.dateOfBirth,
      cardNumber: values.cardNumber
    };
    post(
      remoteRoutes.ninVerification,
      toSave,
      data => {
        actions.resetForm();
        // Update table to show recently added request
        dispatch({
          type: verificationRequestConstants.RequestsPostNew,
          payload: toSave
        });
        // Toast.info("Operation successful");
        enqueueSnackbar('Operation successful', {
          variant: 'success',
        });
        actions.resetForm();
        handleClose();
        if (props.done) props.done();
      },
      () => {
        // Toast.error("Operation failed");
        enqueueSnackbar('Operation failed', {
          variant: 'error',
        });
        // actions.setSubmitting(false);
      }
    );
  }

  function handleClose() {
    props.closeSlideOut();
    dispatch({
      type: verificationRequestConstants.RequestsAddNew,
      payload: false
    });
  }

  return (
    <XFormSimple
      onSubmit={handleSubmit}
      schema={schema}
      initialValues={data}
      onCancel={handleClose}
    >
      <Grid spacing={1} container direction="column">
        <Grid item xs={12}>
          <XTextInput
            name="name"
            label="Name"
            type="text"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="nin"
            label="NIN"
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
        <Grid item xs={12}>
          <XTextInput
            name="cardNumber"
            label="Card Number"
            type="text"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    </XFormSimple>
  );
};

export default ParticipantForm;
