import React from "react";
import { Grid } from "@material-ui/core";
import DetailView, { IRec } from "../../../../components/DetailView";

interface IProps {
  data?: any;
}

const Summary = ({ data }: IProps) => {
  const fields: IRec[] = [
    {
      label: "Service",
      value: "ID Verification",
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div>
          <DetailView data={fields} />
        </div>
      </Grid>
    </Grid>
  );
};

export default Summary;
