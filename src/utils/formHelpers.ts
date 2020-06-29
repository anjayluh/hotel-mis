import {handleError, post, put} from "./ajax";
import Toast from "./Toast";
import {FormikActions} from "formik";
import { useSnackbar, withSnackbar } from 'notistack';

export interface ISubmission {
    url: string
    values: any
    isNew: boolean
    actions: FormikActions<any>
    onAjaxComplete?: (data: any) => any
}

export function handleSubmission(submission: ISubmission) {
  // const { enqueueSnackbar } = useSnackbar();
    const {isNew, actions, values, onAjaxComplete, url} = submission
    if (isNew) {
        post(url, values,
            (data) => {
                Toast.info('Operation successful')
              // enqueueSnackbar('Operation successful', {
              //   variant: 'success',
              // });
                actions.resetForm()
                onAjaxComplete && onAjaxComplete(data)
            },
            (err, resp) => {
                handleError(err, resp)
            }, () => {
                actions.setSubmitting(false);
            }
        )
    } else {
        put(url, values,
            (data) => {
                Toast.info('Update successful')
                actions.resetForm()
                onAjaxComplete && onAjaxComplete(data)
            },
            (err, resp) => {
                handleError(err, resp)
            }, () => {
                actions.setSubmitting(false);
            }
        )
    }
}
