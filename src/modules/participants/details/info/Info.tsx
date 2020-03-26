import {Grid} from "@material-ui/core";
import React from "react";
// import Identifications from "./Identifications";
// import Emails from "./Emails";
// import Phones from "./Phones";
// import Addresses from "./Addresses";
// import Tags from "./Tags";
import {IParticipant} from "../../types";
import ContactInfo from "./ContactInfo";

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
                        <ContactInfo data={data}/>
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} >
                        <Phones data={data}/>
                    </Grid>
                    <Grid item xs={12} >
                        <Emails data={data}/>
                    </Grid>
                </Grid>
            </Grid> */}

            {/* <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12} >
                        <Addresses data={data}/>
                    </Grid>
                    <Grid item xs={12} >
                    </Grid>
                </Grid>
            </Grid> */}
            {/* <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item xs={12}>
                        <Identifications data={data}/>
                    </Grid>
                    <Grid item xs={12} >
                        <Tags data={data}/>
                    </Grid>
                </Grid>
            </Grid> */}

        </Grid>
    );
}

export default Info;
