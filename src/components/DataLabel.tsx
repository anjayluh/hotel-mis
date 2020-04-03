import React from 'react';
import {Typography} from "@material-ui/core";

interface IProps {
    children?: React.ReactNode
    noColon?: boolean
    bold?: boolean
    noWrap?: false | true
}

const DataLabel = ({bold, noColon, children,...props}: IProps) => {
    if (bold)
        return (
            <Typography variant='body2' noWrap component='div' {...props}>
                <b>{children}{noColon ? '' : ':'}</b>
            </Typography>
        );
    return (
        <Typography variant='body2' noWrap component='div' {...props}>
            {children}{noColon ? '' : ':'}
        </Typography>
    );
}


export default DataLabel;
