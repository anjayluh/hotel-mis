import React, { useState } from "react";
import { Form, Formik, FormikActions } from "formik";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

interface IProps {
  schema?: any;
  onSubmit: (values: any, actions: FormikActions<any>) => any;
  onCancel?: () => any;
  onDelete?: () => any;
  debug?: boolean;
  children?: React.ReactNode;
  initialValues?: any;
  submitText?: string;
  closeText?: string;
  customSubmit?: any;
  customSubmitClass?: any;
  boxWraper?: any;
  submitButtonGrid?: any;
}

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

const XFormSimple = (props: IProps) => {
  const classes = useStyles();
  const [count, setCount] = useState<number>(0);
  function handleDelete() {
    if (count === 1) {
      setCount(0);
      props.onDelete && props.onDelete();
    } else {
      setCount(count + 1);
    }
  }

  return (
    <>
      <Formik
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        validationSchema={props.schema}
        validateOnBlur
        enableReinitialize
        render={({ submitForm, isSubmitting, values, errors, touched }) => (
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12} className={props.submitButtonGrid ? props.submitButtonGrid : undefined}>
                <Box p={1}>{props.children}</Box>
              </Grid>
              <Grid item xs={12} className={props.submitButtonGrid ? props.submitButtonGrid : undefined}>
                <Box p={1} mt={16} className={props.boxWraper ? props.boxWraper : undefined}>
                  <Grid container spacing={1}>
                    {props.onDelete && (
                      <Grid item>
                        <Button
                          variant="contained"
                          color="default"
                          onClick={handleDelete}
                          disabled={isSubmitting}
                        >
                          {count === 1 ? "! Confirm" : "Delete"}
                        </Button>
                      </Grid>
                    )}
                    {props.onCancel && (
                      <Grid item className={classes.cancel}>
                        <Button
                          className={classes.closeButton}
                          variant="text"
                          color="default"
                          onClick={props.onCancel}
                          disabled={isSubmitting}
                          size="small"
                        >
                          {props.closeText ? props.closeText : "Close"}
                        </Button>
                      </Grid>
                    )}

                    <Grid item className={props.customSubmit ? props.customSubmit : classes.submit}>
                      <Button
                        className={props.customSubmitClass ? props.customSubmitClass : classes.submitButton}
                        variant="contained"
                        color="primary"
                        onClick={submitForm}
                        disabled={isSubmitting}
                        size="small"
                      >
                        {props.submitText ? props.submitText : "Save"}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              {props.debug && (
                <Grid item xs={12}>
                  <pre style={{ width: "100%", height: "100%" }}>
                    {JSON.stringify({ values, errors, touched }, null, 2)}
                  </pre>
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      />
    </>
  );
};

export default XFormSimple;
