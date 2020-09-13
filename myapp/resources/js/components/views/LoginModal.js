import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    text: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    title: {
        textAlign: 'center',
        backgroundColor: '#FFCC66',
      },
    content: {
        padding: 50,
      },
      signUpButton: {
        margin: 'auto',
        backgroundColor: '#FFCC66',
      },
      toLogin: {
        textAlign: 'center',
        margin: 0
      },
  }));


const LoginModal = (props) => {
    const classes = useStyles();

  return (

    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"　className={classes.title}>ログイン</DialogTitle>
        <DialogContent className={classes.content}>
            <div className={classes.text}> 
                <TextField id="standard-basic" label="メールアドレス" fullWidth　rows={1}/>
                <TextField id="standard-basic" label="パスワード" fullWidth　rows={1}/>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} className={classes.signUpButton}>
            ログイン
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default LoginModal