import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import MenuModal from '../../User/Home/MenuModal';
import FirstMemoryData from './FirstMemoryData';
import axios from "axios";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import searchIcon from '../../../../../../public/img/search.png';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
        marginRight:'30px',
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
    searchButton: {
        marginLeft:'10px',
        '&:hover': {
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
    // const [initialItem , setInitialItem] = useState([]);
    const [items , setItems] = useState([]);
    // 検索用
    const [firstAll , setFirstAll] = useState([]);
    // const [memoAll , setMemoAll] = useState([]);
    // const [searchAllList , setSearchAllList] = useState([]);

  


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
      // モーダル閉じると値リセット
      setFirst("");
      setMemo("");
      setChange("");
    };

    const inputFirst = useCallback((event) => {
        setFirst(event.target.value);
    },[setFirst]);

    const inputMemo = useCallback((event) => {
        setMemo(event.target.value)
    },[setMemo]);


    // 追加
    const addFirstInfo = newFirstInfo => {
        return axios
        .post('api/firstmemory', newFirstInfo, {
           headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
            setFirst("");
            setChange(new Date());
            setMemo("");
            return handleClose();
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
          location.reload();
        })
    }

    useEffect(() => { 
      setItems(firstAll);
      console.log(items);
    }, []);
    
    // 全件取得
    useEffect(() => { 
      const getAll = async () => {
        const response = await axios.get(`api/firstmemory`);
          setUserData(response.data.data); 
          const res = response.data.data;
          const firstlist = res.map(item => item.first);
          setFirstAll(firstlist);
          // const memoAll = res.map(item => item.memo);
          // setMemoAll(memoAll);
        }
        getAll();
    }, []);

    console.log(userData);
    console.log(firstAll);
    console.log(items);
    // console.log(memoAll);
    // console.log(searchAllList);
    
    const filterList = (e) => {
      const updateList = firstAll.filter((item) => {
        return item.toLowerCase().search( e.target.value.toLowerCase()) !== -1;
      })
      setItems(updateList);
      console.log(items);
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
        <h1 className="text1">はじめて記録</h1>
        <div className={classes.displayFlex}>
        <MenuModal />
        <Button className={classes.logoutButton} onClick={logoutButton}>
        ログアウト
        </Button>
        </div>
        <div className="firstcontents">
            <div className="search-box">
                <Button onClick={handleClickOpen} className={classes.addButton}>
                追加する
                </Button>
                  <Input placeholder="検索" onChange={filterList}/>
                  <img src={searchIcon} className={classes.searchButton}/>
                <div>
                  {items.map((item, index) => {
                    return (
                      <li key={index}>{item}</li>
                    )  
                  })}
                <TableContainer component={Paper} className={classes.table}>
                  <Table>
                    <TableHead className={classes.head}>
                      <TableRow>
                        <TableCell align="center">できたこと</TableCell>
                          <TableCell align="center">日付</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.map((item, index) => {
                    return (
                      <TableCell key={index}>{item}</TableCell>
                    )  
                      })}
                    
                  </TableBody>
                </Table>
              </TableContainer>
                </div>
            </div>
    
            {/* 追加モーダル */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title" className={classes.addModal}>はじめて</DialogTitle>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={onFirstInfoSubmit}>
            <DialogContent className={classes.dialog}>
            <TextField
            className={classes.TextField}
                margin="dense"
                label="出来るようになったこと"
                value={first}
                onChange={inputFirst}
                fullWidth
            />
            <TextField
            className={classes.TextField}
                margin="dense"
                label="メモ"
                value={memo}
                onChange={inputMemo}
                fullWidth
            />
            <DatePicker 
            selected={startDate}
            placeholderText="日付"
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
        {!userData ? (
            <div className="nondata">
                <p>はじめての記録を追加してみよう！</p>
            </div>
            ) : (
            <FirstMemoryData userData={userData} setUserData={setUserData} startDate={startDate} 
            first={first} setFirst={setFirst} memo={memo} setMemo={setMemo} change={change} setChange={setChange}/>
        )}    
    </div>
    );

}
export default FirstMemory
