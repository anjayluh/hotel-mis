import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import React, {useState} from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Loading from "../../../../../components/Loading";
import XTable from "../../../../../components/table/XTable";
import PDateInput from "../../../../../components/plain-inputs/PDateInput";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        filterPaper: {
            borderRadius: 0,
            padding: theme.spacing(2)
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        pageHeading: {
            display: 'flex'
        },

    }),
);
const AccountStatement = () => {
    const classes = useStyles();
    const [data, setData] = useState({
        from: null,
        to: null,
    })


    const handleValueChange = (name: string) => (value: any) => {
        if (name === 'to' || name === 'from') {
            value = value ? value.toISOString() : value
        }
        const newData = {...data, [name]: value}
        setData(newData)
    }

    function downloadStatement() {
        console.log(data.from, data.to)
    }

    const spacing= 5
    return (
        <Grid container spacing={spacing}>
            <Grid item xs={12}>
                    <Box pb={2}>
                        <Grid container>
                            <Grid item sm={12} className={classes.pageHeading}>
                                <Typography variant='h5'>Account Statement</Typography>
                            </Grid>
                            <Grid item sm={12}>
                                <Typography variant='body2' noWrap component='div'>
                                    Choose from and to dates then download the account statement in Excel format
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <form>
                        <Grid container spacing={2} className={classes.root}>
                            <Grid item xs={12}>
                                <Grid container spacing={spacing}>
                                    <Grid item>
                                        <PDateInput
                                            name="from"
                                            value={data['from'] || null}
                                            onChange={handleValueChange('from')}
                                            label="From"
                                            variant="inline"
                                            inputVariant='outlined'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <PDateInput
                                            name="to"
                                            value={data['to'] || null}
                                            onChange={handleValueChange('to')}
                                            label="To"
                                            variant="inline"
                                            inputVariant='outlined'
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            // disabled={loading}
                                            variant="contained"
                                            color="primary"
                                            onClick={downloadStatement}
                                        >
                                            Download statement
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
            </Grid>
        </Grid>
    );
}

export default AccountStatement;
