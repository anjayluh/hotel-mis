import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    popOverContent: {
        width: '100%',
        "& img": {
            width: '700px',
            maxWidth: '100%',
          }
    },
    imageWrapper: {
        "& img": {
          width: '500px',
          maxWidth: '100%',
        }
  
      },
      figcaption: {
        textTransform: 'capitalize',
      }
  }),
);

interface IPopUp{
    // initialContent: any,
    // expandableContent: any
    popUpContent: any
    imageWrapper?: string
    anchorOrigin?: any
    transformOrigin?: any

}

export default function PopUP({popUpContent, imageWrapper, anchorOrigin, transformOrigin}: IPopUp) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick}>
        <figure style={{ marginLeft: 0, marginRight: 0 }} className={imageWrapper ? imageWrapper : classes.imageWrapper }>
            <img
            src={popUpContent.image}
            alt={popUpContent.alt} />
            <figcaption className={classes.figcaption}>{popUpContent.caption}</figcaption>
        </figure>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={
          anchorOrigin ? anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
          }
        }
        transformOrigin={
          transformOrigin ? transformOrigin : {
            vertical: 'top',
            horizontal: 'left',
          }
        }

        style={{height: "700px"}}
      >
        <Box className={classes.popOverContent}>
        <figure style={{ marginLeft: 0, marginRight: 0, width: "700px"}}>
            <img
            src={popUpContent.image}
            alt={popUpContent.alt} />
            <figcaption className={classes.figcaption}>{popUpContent.caption}</figcaption>
        </figure>
        </Box>
      </Popover>
    </div>
  );
}
