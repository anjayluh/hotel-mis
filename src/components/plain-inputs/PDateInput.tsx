import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { dateFormat } from "../../utils/dateHelpers";

interface IProps {
  onChange: (date: Date | null) => any;
  value: Date | null;
  label?: string;
  name?: string;
  variant?: "inline";
  inputVariant?: "standard" | "outlined" | "filled";
  ariaLabel?: string;
  format?: string;
}

export default function PDateInput({
  value = null,
  onChange,
  variant,
  label,
  inputVariant,
  ariaLabel,
  format,
}: IProps) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        fullWidth
        disableToolbar
        inputVariant={inputVariant}
        size="small"
        variant={variant}
        format={format ? format : dateFormat}
        id="date-picker-inline"
        label={label}
        value={value}
        onChange={onChange}
        autoComplete="off"
        color="secondary"
        KeyboardButtonProps={{
          "aria-label": ariaLabel ? ariaLabel : "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
