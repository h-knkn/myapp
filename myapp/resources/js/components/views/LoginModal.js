import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';



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
          localStorage.setItem('access_token', res.data.access_token);
          const token = localStorage.getItem('access_token');
          const isAuth = {setIsLoggedIn:token};
          console.log(isLoggedIn);
          // setIsLoggedIn(true);
          console.log(isAuth);
          console.log(user.token);
          if(token){
            alert('ログインできた');
            // 入力欄の値であってユーザー情報ではない
            console.log(user);
            isAuth ? history.push('/userprofile') : <Redirect to={'/'} />;
            // if (isLoggedIn === true) {
            //    history.push('/userprofile');
            // }
            // history.push('/userprofile');
          }
          return props.handleClose() 
        })
        .catch(error => {
          alert("名前、パスワードが一致しません。");
        })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const user = {
      email: email,
      password: password
    }
    if(user.email && user.password) {
    Login(user)
    }
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
              label="メールアドレス"
              value={email}
              onChange={inputEmail}
              fullWidth
              rows={1}/>
              <TextField
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