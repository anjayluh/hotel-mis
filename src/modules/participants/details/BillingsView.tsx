import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Loading from "../../../components/Loading";
import XTable from "../../../components/table/XTable";
import React from "react";

// <Grid container spacing={2}>
//     <Grid item xs={9}>
//         <Box p={1} className={classes.root}>
//             <Box pb={2}>
//                 <Grid container>
//                     <Grid item sm={12} className={classes.pageHeading}>
//                         <Typography variant='h4'>Billing</Typography>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Box>
//     </Grid>
// </Grid>



const BillingsView = () => {
    const spacing= 5
    return (
        <Grid container spacing={spacing}>
            <Grid item xs={12} lg={3} md={4} sm={6}>
                <Grid container spacing={spacing}>
                    <Grid item lg={12} xs={12}>
                        <Typography variant='h4'>Billing</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default BillingsView;