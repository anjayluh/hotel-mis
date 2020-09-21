import React, { useState } from "react";
import { Field, FieldProps, getIn } from "formik";
import "date-fns";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import DateFnsUtils from "@date-io/date-fns";
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from "@material-ui/pickers";
import { hasValue } from "./inputHelpers";
import { dateFormat } from "../../utils/dateHelpers";

interface IProps {
  name: string;
  label: string;
  value?: string;
  inputVariant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  disableFuture?: boolean;
}

const Component = ({ field, form,  ...other }: FieldProps, {disableFuture}:IProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const error = getIn(form.errors, field.name);
  const isTouched = getIn(form.touched, field.name);
  const wasSubmitted = form.submitCount > 0;
  const showError = hasValue(error) && (isTouched || wasSubmitted);
  const [open, setOpen] = useState(false);


  function handleTouch() {
    return form.setFieldTouched(field.name, true, true);
  }

  function handleChange(date: any) {
    setOpen(false);
    return form.setFieldValue(field.name, date, true);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          fullWidth
          margin="normal"
          format={dateFormat}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          autoOk
          name={field.name}
          value={field.value || null}
          placeholder={dateFormat}
          helperText={showError && error}
          error={Boolean(showError)}
          onChange={handleChange}
          onTouchEnd={handleTouch}
          onBlur={handleTouch}
          PopoverProps={{
            anchorOrigin: { horizontal: "left", vertical: "bottom" },
            transformOrigin: { horizontal: "left", vertical: "top" },
          }}
          disableFuture={disableFuture}
          {...other}
        />
    </MuiPickersUtilsProvider>
  );
};

const XDateInput = (props: IProps) => {
  return <Field {...props} component={Component} />;
};

export default XDateInput;
