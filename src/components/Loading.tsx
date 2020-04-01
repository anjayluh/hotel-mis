import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";
import {Box} from "@material-ui/core";

interface ProgressProps {
    loaderClass?: any
}
const Loading = (props: ProgressProps) => {
    const loaderClass = props.loaderClass && props.loaderClass
    return (
        <Box width='100%' display='flex' alignContent='center' justifyContent='center' pt={3}>
            <CircularProgress className={loaderClass}/>
        </Box>
    );
}
export default Loading;
