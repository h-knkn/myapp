import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';



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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState('');

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  },[setPassword]);

  const history = useHistory();

  const Login = user => {
    return axios
        .post('api/login', user, {
          email: user.email,
          password: user.password
        },{
           headers: {'Content-Type': 'application/json'}
          })
        .then(res => {
          localStorage.setItem('access_token', res.data.access_token)
          // console.log(res.data.access_token);
          // console.log(user);
          // alert("ログインしました");
          // props.history.push('/userprofile')
          // console.log(res)

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
    const appState = {
      isLoggedIn: true
    };
    Login(user).then(res => {
      // console.log(res);
      // return res;
      if(user){
        alert('ログインできた');
        console.log(user);
        history.push('/userprofile')
      }
      else {
        alert('ログインできない');
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
            <form onSubmit={onSubmit}>
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
          <Button type="submit" className={classes.signUpButton}>
            ログイン
          </Button>
                </form>
            </div>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    
    </div>
  );
}


export default LoginModal