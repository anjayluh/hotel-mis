import {Grid} from "@material-ui/core";
import React from "react";
import {IParticipant} from "../../types";

interface IProps {
    data: IParticipant
}

const Info = ({data}: IProps) => {
    const spacing= 5
    return (
        <Grid container spacing={spacing}>
            <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item lg={12} xs={12}>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Info;
