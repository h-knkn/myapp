import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import {resetPassword} from "../../../../redux/users/operations";
import {push} from "connected-react-router";
import {useDispatch, useSelector} from "react-redux";



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


const ResetModal = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [email , setEmail] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[setEmail]);



  const history = useHistory();

  return (

    <div>
     
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"　className={classes.title}>パスワードリセット</DialogTitle>
        <DialogContent className={classes.content}>
            <div className={classes.text}> 
              <TextField
              label="メールアドレス"
              type="email"
              value={email}
              onChange={inputEmail}
              fullWidth
              rows={1}/>
          <Button className={classes.signUpButton} onClick={() => dispatch(resetPassword(email))}>
            送信
          </Button>
          
            </div>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    
    </div>
  );
}


export default ResetModal