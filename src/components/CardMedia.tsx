import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Card } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";


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
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2),
    },
    loginPage:{
        maxWidth: "100%",
      },
      alignImage: {
        [theme.breakpoints.down("sm")]: {
            marginBottom: 20,
          },

          "&:nth-child(1)": {
            [theme.breakpoints.up("lg")]: {
                width: "100%",
              },
          }
          
      }
  })
);

interface IImage {
    src: string[]
}

const ImageHolder = ({src}: IImage) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardActionArea>
            <Grid container>
            {src.map((src) => (
                <Grid item sm={12} lg={6} className={classes.alignImage}>
                <Box pr={1}>
                <CardMedia
                    image={src}
                    component="img"
                    title="Login"
                    className={classes.loginPage}
                />
                </Box>
                </Grid>
                ))}
                
                {/* <Grid item sm={12} lg={6}>
                <Box pl={1}>
                <CardMedia
                    image={"http://via.placeholder.com/640x360"}
                    component="img"
                    title="Auth service login"
                    className={classes.loginPage}
                />
                </Box>
                </Grid> */}
            </Grid>
            
            <CardContent style={{padding: 8}}>
                <Typography variant="body2" color="textSecondary" component="p">
                Figure 1:Log into the user management system
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  );
};

export default ImageHolder;
