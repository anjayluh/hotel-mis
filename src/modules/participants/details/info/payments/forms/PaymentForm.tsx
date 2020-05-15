import React from "react";
import { useState } from "react";
import * as yup from "yup";
import * as faker from "faker";
import {
  reqString,
  reqDate,
  reqNumber,
} from "../../../../../../data/validations";
import { paymentTypes } from "../../../../../../data/comboCategories";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../../../../components/forms/XFormSimple";
import XTextInput from "../../../../../../components/inputs/XTextInput";
import { toOptions } from "../../../../../../components/inputs/inputHelpers";
import { useDispatch } from "react-redux";
import { IPayment } from "../../../../types";
import XSelectInput from "../../../../../../components/inputs/XSelectInput";
import XTextAreaInput from "../../../../../../components/inputs/XTextAreaInput";
import XDateInput from "../../../../../../components/inputs/XDateInput";
import { remoteRoutes } from "../../../../../../data/constants";
import { post } from "../../../../../../utils/ajax";
import Toast from "../../../../../../utils/Toast";
import { participantsConstants } from "../../../../../../data/redux/participants/reducer";

const schema = yup.object().shape({
  paymentDate: reqDate,
  paymentType: reqString,
  referenceNumber: reqNumber,
  dateOfEntry: reqDate,
  enteredBy: reqString,
  comment: reqString,
});

interface IProps {
  closeSlideOut: () => any;
  done?: () => any;
  subscriptionId: string | undefined;
}

const PaymentForm = (props: IProps) => {
  const [data, setData] = useState({
    paymentDate: null,
    paymentType: "",
    referenceNumber: "",
    amount: "",
    dateOfEntry: null,
    enteredBy: "",
    comment: "",
  });
  const dispatch = useDispatch();
  const baseUrl = remoteRoutes.participantsBilling.split("bills")[0];
  const paymentsUrl = baseUrl + "payments";
  function getSelectedPaymentType(value: string) {
    let selectedPaymentType = "";
    if (value === "Electronic funds transfer (EFT)") {
      selectedPaymentType = "Eft";
    } else if (value === "Direct Debit") {
      selectedPaymentType = "DirectDebit";
    } else {
      selectedPaymentType = value;
    }
    return selectedPaymentType;
  }
  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: any = {
      subscriptionId: props.subscriptionId,
      amount: values.amount,
      referenceNumber: values.referenceNumber,
      comment: values.comment,
      paymentType: getSelectedPaymentType(values.paymentType),
      enteredBy: values.enteredBy,
      paymentDate: values.paymentDate,
    };
    post(
      paymentsUrl,
      toSave,
      (data) => {
        dispatch({
          type: participantsConstants.participantsAddPayment,
          payload: data,
        });
        if (props.done) props.done();

        Toast.info("Operation successful");
        actions.resetForm();
        handleClose();
      },
      () => {
        Toast.info("Operation successful");
        actions.setSubmitting(false);
      }
    );
  }

  function handleClose() {
    props.closeSlideOut();
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
          <XDateInput
            name="paymentDate"
            label="Payment Date"
            inputVariant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XSelectInput
            size="small"
            name="paymentType"
            label="Payment Type"
            options={toOptions(paymentTypes)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="referenceNumber"
            label="Ref. Number"
            type="text"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="amount"
            label="Amount"
            type="number"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XDateInput
            name="dateOfEntry"
            label="Date of Entry"
            inputVariant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="enteredBy"
            label="Entered By"
            type="text"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextAreaInput
            name="comment"
            label="Comment"
            type="text"
            variant="outlined"
            size="small"
            maxLength={{ maxLength: 160 }}
          />
        </Grid>
      </Grid>
    </XFormSimple>
  );
};

export default PaymentForm;
