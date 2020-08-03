import React from "react";
import { Grid } from "@material-ui/core";
import DetailView, { IRec } from "../../../../components/DetailView";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";

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
          <ErrorBoundary>
            <DetailView data={fields} />
          </ErrorBoundary>
        </div>
      </Grid>
    </Grid>
  );
};

export default Summary;
