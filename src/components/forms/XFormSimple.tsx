import React, {useState} from "react";
import {Form, Formik, FormikActions} from 'formik';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

interface IProps {
    schema?: any
    onSubmit: (values: any, actions: FormikActions<any>) => any
    onCancel?: () => any
    onDelete?: () => any
    debug?: boolean
    children?: React.ReactNode
    initialValues?: any
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actions:{
            position: 'fixed',
            bottom: '0',
            right: '0',
            left: '0',
            marginLeft: '20px',
            marginRight: '20px',
        },
        buttonClose: {
            textTransform: 'capitalize',
            fontWeight: 'normal',

        },
        cancel: {
            position: 'fixed',
            bottom: '20px',
        },
        submit: {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            marginLeft: 'auto'
        }
    }),
);

const XForm = (props: IProps) => {
    const classes = useStyles()
    const [count, setCount] = useState<number>(0)
    function handleDelete() {
        if (count === 1) {
            setCount(0)
            props.onDelete && props.onDelete()
        } else {
            setCount(count + 1)
        }
    }

    return <>
        <Formik
            initialValues={props.initialValues}
            onSubmit={props.onSubmit}
            validationSchema={props.schema}
            validateOnBlur
            enableReinitialize
            render={({submitForm, isSubmitting, values, errors, touched}) => (
                <Form>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Box p={1}>
                                {props.children}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box p={1} mt={16}>
                                <Grid container spacing={1} justify='space-between'>
                                    {
                                        props.onDelete &&
                                        <Grid item >
                                            <Button
                                                variant='contained'
                                                color='default'
                                                onClick={handleDelete}
                                                disabled={isSubmitting}
                                            >{count === 1?'! Confirm':'Delete'}</Button>
                                        </Grid>
                                    }
                                    {
                                        props.onCancel &&
                                        <Grid item className={classes.cancel}>
                                            <Button
                                            className={classes.buttonClose}
                                                variant='text'
                                                color='default'
                                                onClick={props.onCancel}
                                                disabled={isSubmitting}
                                            >Close</Button>
                                        </Grid>
                                    }
                                    <Grid item className={classes.submit}>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={submitForm}
                                            disabled={isSubmitting}
                                        >Save</Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        {
                            props.debug &&
                            <Grid item xs={12}>
                                <pre style={{width: '100%', height: "100%"}}>
                                    {JSON.stringify({values, errors, touched}, null, 2)}
                                </pre>
                            </Grid>
                        }
                    </Grid>
                </Form>
            )}
        />
    </>
}

export default XForm
