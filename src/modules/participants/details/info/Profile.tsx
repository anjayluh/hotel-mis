import React from 'react';
import Grid from '@material-ui/core/Grid';
// import {ContactCategory, getNin, IContact, renderName, IParticipant} from "../../types";
// import {getNin} from "../../types";
import { IParticipant} from "../../types";
import {Box, createStyles, makeStyles, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/Business";
import {grey} from "@material-ui/core/colors";
import {SuccessIcon} from "../../../../components/xicons";

interface IProps {
    data: IParticipant
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
            borderRadius: 0
        },

        image: {
            height: 60,
            width: 60,
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(1)
        },
        nameHolder: {
            paddingTop: theme.spacing(1)
        },
        profileButton: {
            backgroundColor: '#4bb050',
            padding: '0px 10px',
        }
    })
);

const Profile = ({data}: IProps) => {
    const classes = useStyles()
    // const nin = getNin(data)
    // const isPerson = data.category === ContactCategory.Person
    return (
        <Grid container>
            <Grid item sm={6}>
                <Grid container justify="flex-start" alignItems="flex-start">
                    <Avatar className={classes.image}><PersonIcon fontSize='large'/></Avatar>
                    <Grid item className={classes.nameHolder}>
                        <Typography variant='h5'>{data.name}</Typography>
                        <Typography variant='body2'>{data.type.name}</Typography>
                        <Button size='small' variant="contained" color='primary' className={classes.profileButton}>
                            {data.status.name}
                        </Button>
                       
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
export default Profile;
