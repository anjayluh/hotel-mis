import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import SectionTitle from "./info/SectionTitle";
import PersonIcon from '@material-ui/icons/PermIdentity';
/* import Info from "../../info/Info";
import {IParticipant} from "../../../types"; */

interface IProps {
    data: any
    handleClickedItem: (value: any) => any
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #cccccc'
    },
    link: {
        cursor: 'pointer'
    }
  }),
);
const DetailsHeading = (props: IProps) => {
    const classes = useStyles();
    useEffect(() => {
        }
        , [props.data]);

    const handleClick = (value: any) => {
        props.handleClickedItem(value);
    }
    return (
        <Grid item xs={12}>
            <Grid item container direction='row' xs={12} justify="flex-start" className={`${classes.header} ${classes.link}`}>
                {
                    props.data.map((heading: any) => (
                        <SectionTitle
                        handleClickedItem={handleClick}
                        key={heading.text}
                        title={heading.text}
                        status={heading.status}
                        customStyles='padding'
                        />
                        ))
                }
            </Grid>
            <Divider/>
        </Grid>
    );
}

export default DetailsHeading;
