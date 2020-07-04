import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import * as yup from "yup";
import { reqString, reqNumber } from "../../../../data/validations";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../../components/forms/XFormSimple";
import XTextInput from "../../../../components/inputs/XTextInput";
import { useDispatch } from "react-redux";
import { remoteRoutes } from "../../../../data/constants";
import { post } from "../../../../utils/ajax";
import { settingsConstants } from "../../../../data/redux/settings/reducer";
import { useSnackbar } from "notistack";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
const schema = yup.object().shape({
  name: reqString,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 25,
      width: 400,
      marginTop: 64,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    title: {
      marginLeft: 8,
      marginTop: 4,
    },
    input: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    unitPrice: {
      textAlign: "right",
    },
    unitPriceContainer: {
      "& input": {
        textAlign: "right",
      },
    },
    addNewButton: {
      color: "#428BCA",
      textTransform: "capitalize",
      fontStyle: "italic",
      fontSize: 12,
      lineHeight: 0.5,
      marginBottom: -5,
      marginTop: -6,
      fontWeight: "normal",
    },
    addIcon: {
      marginLeft: -5,
      marginRight: -10,
      height: "0.7em",
      fontSize: 13,
    },
  })
);

interface IProps {
  closeSlideOut: () => any;
  done?: () => any;
}

const ServiceCategoryForm = (props: IProps) => {
  const classes = useStyles();
  const [data, setData] = useState({
    name: "",
    rates: [
      {
        from: 0,
        to: 100,
        unitPrice: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 2,
        }).format(1000),
      },
      {
        from: 101,
        to: 200,
        unitPrice: new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 2,
        }).format(2000),
      },
    ],
  });
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const baseUrl = remoteRoutes.billing.split("bills")[0];
  const paymentsUrl = baseUrl + "payments";

  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: any = {
      name: values.name,
      rates: [],
    };
    values.rates.forEach((value: any) => {
      toSave.rates.push({
        from: value.from,
        to: value.to,
        unitPrice: Number(value.unitPrice.replace(/,/g, "")),
      });
    });
    post(
      paymentsUrl,
      toSave,
      (data) => {
        dispatch({
          type: settingsConstants.serviceCategoriesAddServiceCategory,
          payload: toSave,
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
        dispatch({
          type: settingsConstants.serviceCategoriesAddServiceCategory,
          payload: toSave,
        });
        enqueueSnackbar("Operation successful");
        actions.resetForm();
        handleClose();
      }
    );
  }

  function handleClose() {
    props.closeSlideOut();
  }
  function handleNew() {
    setData({
      name: data.name,
      rates: [
        ...data.rates,
        {
          from: 101,
          to: 200,
          unitPrice: new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 2,
          }).format(2000),
        },
      ],
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
          <Typography variant="h6" className={classes.title}>
            Rates
          </Typography>
          <Divider />
        </Grid>
        <Grid item spacing={2} container direction="row" alignItems="center">
          <Grid item xs={4} style={{ paddingBottom: 0 }}>
            <Typography variant="h6" className={classes.title}>
              FROM
            </Typography>
          </Grid>
          <Grid item xs={3} style={{ paddingBottom: 0 }}>
            <Typography variant="h6">TO</Typography>
          </Grid>
          <Grid item xs={5} style={{ paddingBottom: 0 }}>
            <Typography
              variant="h6"
              className={`${classes.title} ${classes.unitPrice}`}
            >
              UNIT PRICE
            </Typography>
          </Grid>
        </Grid>
        {data.rates.map((item, index) => (
          <Grid
            item
            spacing={2}
            container
            direction="row"
            alignItems="center"
            key={index}
          >
            <Grid item xs={4} className={classes.input}>
              <Typography variant="body2" className={classes.title}>
                {item.from}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.input}>
              <XTextInput
                name={`rates[${index}].to`}
                type="text"
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={5}
              className={`${classes.unitPriceContainer} ${classes.input}`}
            >
              <XTextInput
                name={`rates[${index}].unitPrice`}
                type="text"
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12} className={classes.unitPrice}>
          <Button
            className={classes.addNewButton}
            startIcon={<AddIcon className={classes.addIcon} />}
            variant="text"
            onClick={handleNew}
          >
            Add New
          </Button>
        </Grid>
      </Grid>
    </XFormSimple>
  );
};

export default ServiceCategoryForm;
