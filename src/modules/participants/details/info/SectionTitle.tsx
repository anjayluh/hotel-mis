import React, {useEffect, useState} from 'react';
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

interface IProps {
    title: string
    editButton?: any
    icon?: any
    handleClickedItem?: (item: any) => any
    status?: any
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      paddingTop: '3px',
    },
    active: {
        borderBottom: '3px solid'
    }
  }),
);
const SectionTitle = ({title, editButton, icon, handleClickedItem, status}: IProps) => {
    const classes = useStyles();
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const [isActive, setIsActive] = useState(status);
    const handleEntered = () => {
        setCanEdit(true)
    }
    const handleLeave = () => {
        setCanEdit(false)
    }
    useEffect(() => {
        setIsActive(status)
    }
        , [status]);
    const handleClick = () => {
        if(handleClickedItem){
            handleClickedItem(title)
        }
    }
    const active = isActive ? classes.active : ''
    return (
        <Box display="flex" px={1} py={1}
             onMouseEnter={handleEntered}
             onMouseLeave={handleLeave}
             onClick={handleClick}
            className={`has-hidden-icon ${active}`}
        >
            <Box display='flex' flexGrow={1} className={classes.heading} mr={2} ml={2}>
                <Box>
                    <Typography variant='body1'>{icon}</Typography>
                </Box>
                <Box>
                    <Typography variant='body2'>&nbsp;<b>{title}</b></Typography>
                </Box>
            </Box>
            {editButton &&
            <Box>
                {canEdit && editButton}
            </Box>
            }
        </Box>
    );
}


export default SectionTitle;
