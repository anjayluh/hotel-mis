import React from "react";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { reqString, reqDate } from "../../../../../../data/validations";
import { subscriptionsServiceTypes } from "../../../../../../data/comboCategories";
import { Form, Formik, FormikActions } from "formik";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import XDateInput from "../../../../../../components/inputs/XDateInput";
import { toOptions } from "../../../../../../components/inputs/inputHelpers";
import XSelectInput from "../../../../../../components/inputs/XSelectInput";
import { remoteRoutes } from "../../../../../../data/constants";
import { get, post, put } from "../../../../../../utils/ajax";
import Toast from "../../../../../../utils/Toast";
import { participantsConstants } from "../../../../../../data/redux/participants/reducer";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as lodash from "lodash";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const schema = yup.object().shape({
  serviceType: reqString,
  category: reqString,
  subscriptionDate: reqDate,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      padding: "4px 30px",
      backgroundColor: "rgba(38, 50, 56, 0.04)",
    },
    cancel: {
      position: "fixed",
      bottom: "15px",
    },
    submit: {
      position: "fixed",
      bottom: "15px",
      right: "28px",
      marginLeft: "auto",
    },
    submitButton: {
      padding: "4px 30px",
    },
  })
);

interface IProps {
  closeSlideOut: () => any;
  done?: () => any;
  initialData?: any;
  id: any;
}

const SubscriptionsForm = (props: IProps) => {
  const classes = useStyles();
  const [isEdit, setIsEdit] = useState<boolean>(
    props.initialData ? true : false
  );

  const [allCategories, setAllCategories] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [data, setData] = useState<any>(
    props.initialData
      ? props.initialData
      : {
          serviceType: "",
          category: "",
          subscriptionDate: null,
        }
  );
  const baseUrl = remoteRoutes.participantsBilling.split("bills")[0];
  const billingUrl = baseUrl + "services";
  const dispatch = useDispatch();
  useEffect(() => {
    get(
      billingUrl,
      (resp) => {
        setAllCategories(resp);
      },
      () => {
        Toast.error("Operation failed");
      }
    );
  }, [dispatch]);

  function handleSubmit(values: any, actions: FormikActions<any>) {
    actions.setSubmitting(true);
    const serviceCategoryId = () => {
      let id = "";
      allCategories.forEach((category: any) => {
        category.serviceCategories.forEach((item: any) => {
          if (item.name === values.category) {
            id = item.id;
          }
        });
      });
      return id;
    };

    const toSave: any = {
      companyId: props.id,
      serviceCategoryId: serviceCategoryId(),
    };
    if (!isEdit) {
      post(
        remoteRoutes.subscriptions,
        toSave,
        (data) => {
          Toast.info("Operation successful");
          actions.resetForm();
          dispatch({
            type: participantsConstants.participantsAddSubscription,
            payload: { ...data },
          });
          if (props.done) props.done();
          actions.setSubmitting(false);
          handleClose();
        },
        () => {
          Toast.error("Operation failed");
          actions.setSubmitting(false);
        }
      );
    } else {
      put(
        remoteRoutes.subscriptions + `?companyIds=${props.id}`,
        toSave,
        (data) => {
          Toast.info("Operation successful");
          actions.resetForm();
          dispatch({
            type: participantsConstants.participantsAddSubscription,
            payload: { ...data },
          });
          actions.resetForm();
          handleClose();
          if (props.done) props.done();
          actions.setSubmitting(false);
        },
        () => {
          Toast.error("Operation successful");
          actions.setSubmitting(false);
        }
      );
    }
  }

  function handleClose() {
    props.closeSlideOut();
  }
  function getCategories(value: string) {
    let items: string[] = [];
    if (!lodash.isEmpty(value)) {
      allCategories.forEach((item: any) => {
        if (item.name === value) {
          item.serviceCategories.forEach((category: any) => {
            items.push(category.name);
          });
        }
      });
    }
    return items;
  }

  function hasServiceType(state: string) {
    return lodash.isEmpty(state);
  }

  return (
    <div>
      <Formik
        initialValues={data}
        onSubmit={handleSubmit}
        validationSchema={schema}
        validateOnBlur
        enableReinitialize
        render={({ submitForm, isSubmitting, values, errors, touched }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box p={1}>
                  <Grid spacing={1} container direction="column">
                    <Grid item xs={12}>
                      <XSelectInput
                        size="small"
                        name="serviceType"
                        label="Service Type"
                        options={toOptions(subscriptionsServiceTypes)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <XSelectInput
                        size="small"
                        name="category"
                        label="Category"
                        disabled={hasServiceType(values.serviceType)}
                        options={toOptions(getCategories(values.serviceType))}
                        variant="outlined"
                      />
                      <FormHelperText>
                        Please first select a Service Type
                      </FormHelperText>
                    </Grid>
                    <Grid item xs={12}>
                      <XDateInput
                        name="subscriptionDate"
                        label="Subscription Date"
                        inputVariant="outlined"
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box p={1} mt={16}>
                  <Grid container spacing={1}>
                    <Grid item className={classes.cancel}>
                      <Button
                        className={classes.closeButton}
                        variant="text"
                        color="default"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        size="small"
                      >
                        Close
                      </Button>
                    </Grid>
                    <Grid item className={classes.submit}>
                      <Button
                        className={classes.submitButton}
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                        disabled={isSubmitting}
                        size="small"
                      >
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
};

export default SubscriptionsForm;
