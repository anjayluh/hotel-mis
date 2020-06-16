import * as React from "react";
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navigation from "../../components/Layout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          flexGrow: 1,
      },
      heading: {
          fontSize: theme.typography.pxToRem(15),
          flexBasis: '33.33%',
          flexShrink: 0,
      },

  }),
);

const  Settings = () =>{
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
      <Navigation>
          <Grid className={classes.root}>
              <Grid container spacing={2}>
                  <Grid item sm={12}>
                      <Typography variant="h4">
                        Settings
                      </Typography>
                  </Grid>
                  <Grid item sm={12}>
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
              </Grid>
          </Grid>
      </Navigation>
    );
}


export default Settings
