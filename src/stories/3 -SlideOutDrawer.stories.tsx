import React, { useState } from "react";
import NewParticipantForm from "../modules/participants/forms/NewParticipantForm";
import SlideOutDrawer from "../components/SlideOutDrawer";
import { Anchor } from "../data/types";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";

export default {
  title: "SlideOutDrawer",
  component: SlideOutDrawer
};

export const SlideOut = () => {
  const [anchor, setAnchor] = useState<Anchor>("right");
  const [openSlideOut, setOpenSlideOut] = useState(false);

  function handleClick() {
    handleToggleDrawer();
  }
  function handleToggleDrawer() {
    setOpenSlideOut(!openSlideOut);
  }
  return (
    <Grid>
      <Box onClick={handleClick}>
        <Typography>Turn on Slideout</Typography>
      </Box>
      <SlideOutDrawer
        handleToggleDrawer={handleToggleDrawer}
        open={openSlideOut}
        anchor="right"
        title="Story Book"
      >
        {/* <NewParticipantForm
          closeSlideOut={handleToggleDrawer}
        ></NewParticipantForm> */}
      </SlideOutDrawer>
    </Grid>
  );
};

/* export const Emoji = () => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
); */
