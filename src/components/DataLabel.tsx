import React from 'react';
import {Typography} from "@material-ui/core";

interface IProps {
    children?: React.ReactNode
    noColon?: boolean
    bold?: boolean
    noWrap?: false | true
}

const DataLabel = (props: IProps) => {
    if (props.bold)
        return (
            <Typography variant='body2' noWrap component='div' {...props}>
                <b>{props.children}{props.noColon ? '' : ':'}</b>
            </Typography>
        );
    return (
        <Typography variant='body2' noWrap component='div' {...props}>
            {props.children}{props.noColon ? '' : ':'}
        </Typography>
    );
}


export default DataLabel;
