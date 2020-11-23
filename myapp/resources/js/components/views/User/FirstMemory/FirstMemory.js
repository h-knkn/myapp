import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuModal from '../../User/Home/MenuModal';
import axios from "axios";

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import baby from '../../../../../../public/img/baby.png';




const useStyles = makeStyles((theme) => ({
    root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'block',
    },
    },
    logoutButton: {
      margin: 'auto',
      backgroundColor: '#FFCC66',
      width: '10%',
      display:'block',
      margin: '0 0 0 auto',
      '&:hover': {
        background: "#FFCC66",
        opacity: 0.6,
     },
    },
    displayFlex: {
      display:'flex',
      alignItems:'flex-start',
    },
    dialog: {
        height:'370px',
    },
    addModal: {
      width:'600px',
      textAlign:'center',
      backgroundColor:'#FFCC66',
    },
    displayRight: {
      textAlign:'right',
    },
    addButton: {
        backgroundColor: '#FFCC66',
        color:'#333333',
        '&:hover': {
          background: "#FFCC66",
          opacity: 0.6,
       },
    },
    cancelButton: {
        backgroundColor: '#DCDCDC',
        color:'#333333',
        '&:hover': {
          background: "#DCDCDC",
          opacity: 0.6,
       },
    },
    
}));


const FirstMemory = () => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = useState(new Date());


    // はじめて情報入力
    const [userData, setUserData] = useState([]);
    const [first , setFirst] = useState("");
    const [memo , setMemo] = useState("");
    const [change , setChange] = useState("");
    

    // newDateをyyyy-mm-dd形式に変える
    const handleChange = (date) => {
        var changes = date.toISOString().slice(0, 10);
        setChange(changes);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const inputFirst = useCallback((event) => {
        setFirst(event.target.value);
    },[setFirst]);

    const inputMemo = useCallback((event) => {
        setMemo(event.target.value)
    },[setMemo]);

    const addFirstInfo = newFirstInfo => {
        return axios
        .post('api/firstmemory', newFirstInfo, {
           headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
           console.log(res.data);
          
        })
        .catch(err => {
           console.log(err)
        })
    }
    const onFirstInfoSubmit = (e) => {
        e.preventDefault()
        const newFirstInfo = {
          first: first,
          date: change,
          memo: memo,
        }
        addFirstInfo(newFirstInfo).then(res=>{
          alert("登録しました");
        })
    }



    // ログアウト
    const logoutButton = (e) => {
        e.preventDefault()
        const data = localStorage.getItem('access_token');
        console.log(data);
        const res = confirm("ログアウトしますか？");
        if( res == true ) {
        localStorage.clear();
        props.history.push('/');
        }
        else {
        return;
        }
    }
    

    return(
    <div>
        <h1 className="text1">はじめてを記録しよう</h1>
        <div className={classes.displayFlex}>
        <MenuModal />
        <Button className={classes.logoutButton} onClick={logoutButton}>
        ログアウト
        </Button>
        </div>
        <div className="firstcontents">
        <Button onClick={handleClickOpen} className={classes.addButton}>
        追加する
      </Button>
      {/* 追加モーダル */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title" className={classes.addModal}>はじめて</DialogTitle>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={onFirstInfoSubmit}>
        <DialogContent className={classes.dialog}>
          <TextField
           className={classes.TextField}
            id="standard-basic"
            margin="dense"
            label="出来るようになったこと"
            value={first}
            onChange={inputFirst}
            fullWidth
          />
          <TextField
           className={classes.TextField}
            id="standard-basic"
            margin="dense"
            label="メモ"
            value={memo}
            onChange={inputMemo}
            fullWidth
          />
          <DatePicker 
          selected={startDate}
          onChange={handleChange}
          value={change}
          />
        </DialogContent>
        <DialogActions className={classes.displayRight}> 
          <Button onClick={handleClose} color="primary" onClick={handleClose}　className={classes.cancelButton}>
            キャンセル
          </Button>
          <Button  type="submit" color="primary" className={classes.addButton}>
            登録
          </Button>
        </DialogActions>
        </form>
        </Dialog>
        </div>
    </div>
    );

}
export default FirstMemory