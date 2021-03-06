import React from 'react';
import { Button } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Form, Formik, FormikActions } from 'formik';
import { useDispatch } from 'react-redux'
import { handleLogin } from "../../data/redux/coreActions";
import { useLocation } from 'react-router-dom';
import * as yup from "yup";
import XTextInput from "../../components/inputs/XTextInput";
import { useLoginStyles } from "./loginStyles";
import { Dispatch } from "redux";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

function Login() {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useLoginStyles();
    const dispatch: Dispatch<any> = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const onSubmit = (data: any, actions: FormikActions<any>) => {
        dispatch(handleLogin({ username: "admin", role: "admin" }));
        history.push("/admin/home");
        enqueueSnackbar("Successfully logged in user")
    }

    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{
                        "email": "ekastimo@gmail.com",
                        "password": "Xpass@123"
                    }}
                    validationSchema={schema}
                    onSubmit={onSubmit}
                >
                    {(formState) => (
                        <Form className={classes.form}>
                            <XTextInput
                                type='email'
                                name='email'
                                label='Email Address'
                                autoComplete="email"
                                autoFocus
                                margin="normal"
                            />

                            <XTextInput
                                type='password'
                                name='password'
                                label='Password'
                                autoComplete="password"
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={formState.isSubmitting}
                            >
                                Sign in
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </main>
    );
}


export const schema = yup.object().shape(
    {
        email: yup.string().email('Invalid email').required("Email is required"),
        password: yup.string().required("Password is required")
    }
);

export default Login


