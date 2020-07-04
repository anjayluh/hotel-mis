import React, { useEffect } from "react";
import Loading from "../../../../components/Loading";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { IState } from "../../../../data/types";
import Summary from "./Summary";

interface IProps {
  closeSlideOut?: () => any;
  data: any;
  loading: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 0,
      padding: theme.spacing(1),
      position: "relative",
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
    title: {
      marginLeft: 8,
      marginTop: 4,
    },
    unitPrice: {
      textAlign: "right",
    },
  })
);

const Details = (props: IProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div>
      {props.loading ? (
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box>
                <Loading loaderClass={classes.loading} />
              </Box>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" py={1}>
                <Box flexGrow={1} pt={1}>
                  <Typography variant="h5">{props.data.name}</Typography>
                  <Typography variant="body2">Service Category</Typography>
                </Box>
              </Box>
              <Divider />
              <Box pt={1} mb={3}>
                <Summary />
              </Box>
              <Grid item xs={12} style={{ marginBottom: 13 }}>
                <Typography variant="h6" className={classes.title}>
                  Rates
                </Typography>
                <Divider />
              </Grid>
              <Grid
                item
                spacing={1}
                container
                direction="row"
                alignItems="center"
              >
                <Grid item xs={5}>
                  <Typography variant="h6" className={classes.title}>
                    FROM
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6">TO</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant="h6"
                    className={`${classes.title} ${classes.unitPrice}`}
                  >
                    UNIT PRICE
                  </Typography>
                </Grid>
              </Grid>
              {props.data.rates.map((item: any) => (
                <Grid
                  item
                  spacing={2}
                  container
                  direction="row"
                  alignItems="center"
                >
                  <Grid item xs={5}>
                    <Typography variant="subtitle2" className={classes.title}>
                      {item.from}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle2">{item.to}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle2"
                      className={`${classes.title} ${classes.unitPrice}`}
                    >
                      {item.unitPrice}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Details;
