import * as React from "react";
import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { toOptions } from "../../components/inputs/inputHelpers";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import PSelectInput from "../../components/plain-inputs/PSelectInput";
import PDateInput from "../../components/plain-inputs/PDateInput";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ResetButton from "../../components/ResetButton";

interface IProps {
  onFilter: (data: any) => any;
  loading: boolean;
}

const Filter = ({ onFilter, loading }: IProps) => {
  const [data, setData] = useState({
    nin: "",
    cardNumber: "",
    participant: "",
    status: "",
    requestId: "",
    from: null,
    to: null,
    initiator: "",
  });

  const [resetButton, setResetButton] = useState(false)

  function submitForm(values: any) {
    let toSave = {
      Nin: values.nin,
      CardNumber: values.cardNumber,
      participant: values.participant,
      Status: values.status === "All" ? "" : values.status,
      RequestId: values.requestId,
      "Date.From": values.from,
      "Date.To": values.to,
      Initiator: values.initiator,
    };
    onFilter(toSave);
  }

  function handleChange(event: React.ChangeEvent<any>) {
    const name = event.target.name;
    const value = event.target.value;
    const newData = { ...data, [name]: value };
    setData(newData);
    submitForm(newData);
    setResetButton(true)
  }
  function handleSubmit() {
    submitForm(data);
  }

  function resetForm() {
    const resetData = {
      nin: "",
      cardNumber: "",
      participant: "",
      status: "",
      requestId: "",
      from: null,
      to: null,
      initiator: "",
    }
    setData(resetData)
    submitForm(resetData)
    setResetButton(false)
  }
  const handleValueChange = (name: string) => (value: any) => {
    if (name === "from" || name === "to") {
      value = value ? value.toISOString() : value;
    }
    const newData = { ...data, [name]: value };
    setData(newData);
    submitForm(newData);
  };
  

  // const handleComboValueChange = (name: string) => (value: any) => {
  //
  //     const newData = {...data, [name]: value}
  //     const newFilterData = {...data, [name]: value?value.id:null}
  //     setData(newData)
  //     submitForm(newFilterData)
  // }

  const initiators = ["Angella", "Evie", "TimK"];
  const statuses = ["All", "Pending", "Successful", "Failed", "Rejected"];

  return (
    <form>
      <Grid spacing={3} container>
        <Grid item xs={12}>
          <Box display="flex" pb={1}>
            <Box flexGrow={1}>
              <Typography color={"textSecondary"} variant="h5">
                Search
              </Typography>
            </Box>
          </Box>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="nin"
            value={data["nin"]}
            onChange={handleChange}
            label="NIN"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="cardNumber"
            value={data["cardNumber"]}
            onChange={handleChange}
            label="Card Number"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <PSelectInput
            name="status"
            value={data["status"]}
            onChange={handleChange}
            label="Request Status"
            variant="outlined"
            size="small"
            color="secondary"
            options={toOptions(statuses)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="requestId"
            value={data["requestId"]}
            onChange={handleChange}
            label="Request ID"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <PDateInput
            name="from"
            value={data["from"] || null}
            onChange={handleValueChange("from")}
            label="From"
            variant="inline"
            inputVariant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <PDateInput
            name="to"
            value={data["to"] || null}
            onChange={handleValueChange("to")}
            label="To"
            variant="inline"
            inputVariant="outlined"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <PSelectInput
            name="Initiator"
            value={data["Initiator"]}
            onChange={handleChange}
            label="Initiator"
            variant="outlined"
            size="small"
            color="secondary"
            options={toOptions(initiators)}
          />
        </Grid> */}
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row">
            <Box mr={'auto'}>
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              size="small"
            >
              Apply Filter
            </Button>
            </Box>
            <Box>
            {resetButton && <ResetButton text={"Reset"} onClick={resetForm}/>}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default Filter;
