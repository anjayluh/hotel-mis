import {makeStyles, Theme} from "@material-ui/core";
import createStyles from "@material-ui/core/styles/createStyles";

export const useLoginStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(3 * 2),)]: {
        width: 655,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      // marginTop: theme.spacing(16),
      marginTop: 206,
      display: 'flex',
      alignItems: 'center',
      padding: `${theme.spacing(6)}px ${theme.spacing(6)}px ${theme.spacing(6)}px`,
      height: 300
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      marginTop: theme.spacing(3),
      height: 50
    },
    coatOfArms: {
      width: 112,
      height: 120
    }
  }),
);
