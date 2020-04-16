import React from "react";
import { action } from "@storybook/addon-actions";
import DetailsViewSimple, { IRec } from "../components/DetailViewSimple";
import {
  EditIconButton,
  AddIconButton,
  DeleteIconButton
} from "../components/EditIconButton";
import { Grid } from "@material-ui/core";
export default {
  title: "DetailsViewSimple",
  component: DetailsViewSimple
};

let data: IRec[] = [
  {
    label: "",
    value: "Kampala"
  },
  {
    label: "",
    value: "0978654321"
  }
];
export const Details = () => (
  <Grid container item justify="center">
    <DetailsViewSimple
      data={data}
      editButton={<EditIconButton />}
      deleteButton={<DeleteIconButton />}
    ></DetailsViewSimple>
  </Grid>
);

/* export const Emoji = () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
); */
