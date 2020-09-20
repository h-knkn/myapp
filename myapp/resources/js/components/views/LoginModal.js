import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from  'react-router-dom';


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

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  },[setPassword]);

  const Login = user => {
    return axios
        .post('api/login', user, {
          email: user.email,
          password: user.password
        },{
           headers: {'Content-Type': 'application/json'}
          })
        .then(res => {
          console.log(user.email);
          localStorage.setItem('access_token', res.data.access_token)
          console.log(res.data.access_token);
          alert("ログインしました");
          props.history.push('/userprofile')

          return props.handleClose() 
        })
        .catch(err => {
          console.log(err)
        })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const user = {
      email: email,
      password: password
    }
    console.log(user.email + "二回目");
    Login(user).then(res=>{
      if(res) {
        props.history.push('/userprofile')
        alert("ログインしました");
      }
    })
  }


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
              <TextField
              id="standard-basic" 
              label="メールアドレス"
              value={email}
              onChange={inputEmail}
              fullWidth
              rows={1}/>
              <TextField
              id="standard-basic"
              label="パスワード"
              value={password}
              onChange={inputPassword}
              fullWidth
              rows={1}/>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} className={classes.signUpButton}>
            ログイン
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default (withRouter(LoginModal))