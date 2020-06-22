import "date-fns";
import React, { useState } from "react";
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
  views?: any;
}

export default function PDateInput({
  value = null,
  onChange,
  variant,
  label,
  inputVariant,
  ariaLabel,
  format,
  views,
}: IProps) {
  const [open, setOpen] = useState(false);
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
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(true)}
        KeyboardButtonProps={{
          "aria-label": ariaLabel ? ariaLabel : "change date",
        }}
        PopoverProps={{
          anchorOrigin: { horizontal: "left", vertical: "bottom" },
          transformOrigin: { horizontal: "left", vertical: "top" },
        }}
        views={views}
      />
    </MuiPickersUtilsProvider>
  );
}
