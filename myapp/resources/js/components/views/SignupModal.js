import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useForm } from 'react-hook-form'


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
        '&:hover': {
          background: "#FFCC66",
          opacity: 0.6,
       },
      },
      toLogin: {
        textAlign: 'center',
        margin: 0
      },
  }));


const SignupModal = (props) => {

  const classes = useStyles();

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [password_confirmation , setPassword_confirmation] = useState("");

  const { register, handleSubmit, errors } = useForm();
  // const onSubmit = data => console.log(data);

  const inputName = useCallback((event) => {
    setName(event.target.value)
  },[setName]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[setEmail]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  },[setPassword]);

  const inputPassword_confirmation = useCallback((event) => {
    setPassword_confirmation(event.target.value)
  },[setPassword_confirmation]);

  const Register = newUser => {
    return axios
        .post('api/register', newUser, {
           headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
           console.log(res.data);
           setName("") 
           setEmail("") 
           setPassword("") 
           setPassword_confirmation("")
           return props.handleClose() 
        })
        .catch(err => {
           console.log(err)
        })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
    Register(newUser).then(res=>{
      alert("登録しました。ログインしてください");
      return props.onClickLogin()
      
    })
  }

  return (

    <div>
      <form onSubmit={onSubmit}>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"　className={classes.title}>新規登録</DialogTitle>
        <DialogContent className={classes.content}>
            <div className={classes.text}> 
                <TextField
                label="名前"
                value={name}
                onChange={inputName}
                fullWidth
                name="name"
                inputRef={register({ required:"名前を入力してください" , maxLength: 10 })}
                rows={1}/>

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
                <TextField
                label="パスワード確認"
                value={password_confirmation}
                onChange={inputPassword_confirmation}
                fullWidth
                rows={1}/>
            </div>
        </DialogContent>
        <p className={classes.toLogin} onClick={props.onClickLogin}>ログインはこちら</p>
        <DialogActions>
          <Button type="submit" className={classes.signUpButton}>
            登録
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </div>
  );
}


export default SignupModal