import React from "react";
import { Grid } from "@material-ui/core";
import Info from "../../../info/Info";
import { IParticipant } from "../../../../types";

interface IProps {
  data: IParticipant;
}

const GeneralOverview = (props: IProps) => {
  return (
    <Grid item xs={12} style={{ paddingTop: 0 }}>
      <Info data={props.data} />
    </Grid>
  );
};

export default GeneralOverview;
