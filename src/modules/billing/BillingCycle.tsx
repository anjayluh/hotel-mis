import * as React from "react";
import { useState } from "react";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import PDateInput from "../../components/plain-inputs/PDateInput";
import IBox from "../../components/ibox/IBox";
import { toOptions } from "../../components/inputs/inputHelpers";
import { Box } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import PSelectInput from "../../components/plain-inputs/PSelectInput";
import { organisationNames } from "./fakeData";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Summary from "./details/Summary";

interface IProps {
  onFilter: (data: any) => any;
  loading: boolean;
  requestData: any;
  tableDataCount: any;
}
const requestData = {};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 0,
      padding: theme.spacing(1),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    noPaddingLeft: {
      paddingLeft: 0,
    },
    loading: {
      position: "absolute",
      top: 300,
    },
  })
);
const Filter = ({ onFilter, loading, requestData, tableDataCount }: IProps) => {
  const classes = useStyles();
  const [data, setData] = useState({
    participantName: "",
    type: "",
    from: null,
    to: null,
    billNumber: "",
  });

  const rates = ["20", "30", "40"];

  function submitForm(values: any) {
    onFilter(values);
  }

  function handleChange(event: React.ChangeEvent<any>) {
    const name = event.target.name;
    const value = event.target.value;
    const newData = { ...data, [name]: value };
    setData({ ...newData });
    submitForm(newData);
  }
  const handleValueChange = (name: string) => (value: any) => {
    if (name === "from" || name === "to") {
      value = value ? value.toISOString() : value;
    }
    const newData = { ...data, [name]: value };
    setData(newData);
    submitForm(newData);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box>{requestData && <Summary data={requestData} />}</Box>
      </Grid>
    </Grid>
  );
};

export default Filter;
