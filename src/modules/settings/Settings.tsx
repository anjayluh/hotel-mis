import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Layout";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
// import { IWorkflowFilter } from "./types";
import Typography from "@material-ui/core/Typography";
// import {workflowTypes} from "./config";
import Box from "@material-ui/core/Box";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          flexGrow: 1,
      },
      pageHeading: {
          display: "flex",
      },
      heading: {
          fontSize: theme.typography.pxToRem(15),
          flexBasis: '33.33%',
          flexShrink: 0,
      },
      filterPaper: {
          borderRadius: 0,
          padding: theme.spacing(2),
      },

  })
);

type Anchor = "top" | "left" | "bottom" | "right";

const Settings = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };
    // const [filter, setFilter] = useState<IWorkflowFilter>({
    //     workflowTypes: workflowTypes,
    //     showNew: false,
    //     showAssigned: true,
    // });
    //
    //
    //
    //
    // function handleFilter(f: IWorkflowFilter) {
    //     setFilter({ ...filter, ...f });
    // }
    return (
      <Navigation>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Box p={1} className={classes.root}>
                      <Box pb={2}>
                          <Grid container>
                              <Grid item sm={12} className={classes.pageHeading}>
                                  <Typography variant="h4">
                                      Settings
                                  </Typography>
                              </Grid>
                          </Grid>
                      </Box>
                      <Grid item xs={12}>
                          <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                              >
                                  <Typography className={classes.heading}>Account Settings</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                  <Typography>
                                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                                      maximus est, id dignissim quam.
                                  </Typography>
                              </ExpansionPanelDetails>
                          </ExpansionPanel>
                          <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                              >
                                  <Typography className={classes.heading}>Participant Types</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                  <Typography>
                                      Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                                      diam eros in elit. Pellentesque convallis laoreet laoreet.
                                  </Typography>
                              </ExpansionPanelDetails>
                          </ExpansionPanel>
                          <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                              >
                                  <Typography className={classes.heading}>Payment Types</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                  <Typography>
                                      Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                      vitae egestas augue. Duis vel est augue.
                                  </Typography>
                              </ExpansionPanelDetails>
                          </ExpansionPanel>
                          <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel4bh-content"
                                id="panel4bh-header"
                              >
                                  <Typography className={classes.heading}>Contact Person Roles</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                  <Typography>
                                      Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                      vitae egestas augue. Duis vel est augue.
                                  </Typography>
                              </ExpansionPanelDetails>
                          </ExpansionPanel>
                          <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                              <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel5bh-content"
                                id="panel5bh-header"
                              >
                                  <Typography className={classes.heading}>Services & Categories</Typography>
                              </ExpansionPanelSummary>
                              <ExpansionPanelDetails>
                                  <Typography>
                                      Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                                      vitae egestas augue. Duis vel est augue.
                                  </Typography>
                              </ExpansionPanelDetails>
                          </ExpansionPanel>
                      </Grid>
                  </Box>
              </Grid>
              {/*<Grid item xs={3} style={{ display: open ? "block" : "none" }}>*/}
              {/*  <Box pt={6}>*/}
              {/*    <Paper className={classes.filterPaper} elevation={0}>*/}
              {/*      <Filter onFilter={handleFilter} loading={loading} />*/}
              {/*    </Paper>*/}
              {/*  </Box>*/}
              {/*</Grid>*/}
          </Grid>
      </Navigation>
    );
};

export default Settings;
