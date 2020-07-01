import React, { useEffect } from "react";
import { useState } from "react";
import * as yup from "yup";
import {
  reqString,
  reqDate,
  reqNumber,
} from "../../../../../../data/validations";
import { PaymentTypeOptions } from "../../../../../../data/comboCategories";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../../../../components/forms/XFormSimple";
import XTextInput from "../../../../../../components/inputs/XTextInput";
import { useDispatch } from "react-redux";
import XSelectInput from "../../../../../../components/inputs/XSelectInput";
import XTextAreaInput from "../../../../../../components/inputs/XTextAreaInput";
import XDateInput from "../../../../../../components/inputs/XDateInput";
import { remoteRoutes } from "../../../../../../data/constants";
import { post } from "../../../../../../utils/ajax";
import { participantsConstants } from "../../../../../../data/redux/participants/reducer";
import { useSnackbar } from "notistack";

const schema = yup.object().shape({
  paymentDate: reqDate,
  paymentType: reqString,
  referenceNumber: reqNumber,
  amount: reqNumber,
  paymentMadeBy: reqString
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
    paymentMadeBy: "",
    comment: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const baseUrl = remoteRoutes.billing.split("bills")[0];
  const paymentsUrl = baseUrl + "payments";
  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: any = {
      subscriptionId: props.subscriptionId,
      amount: values.amount,
      referenceNumber: values.referenceNumber,
      comment: values.comment,
      paymentType: values.paymentType,
      paymentMadeBy: values.paymentMadeBy,
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

        // Toast.info("Operation successful");
        enqueueSnackbar("Operation successful", {
          variant: "success",
        });
        actions.resetForm();
        handleClose();
      },
      () => {
        // Toast.info("Operation successful");
        enqueueSnackbar("Operation successful");
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
            options={PaymentTypeOptions}
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
          <XTextInput
            name="paymentMadeBy"
            label="Payment Made By"
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
