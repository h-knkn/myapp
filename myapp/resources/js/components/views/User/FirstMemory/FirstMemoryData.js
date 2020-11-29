import React , {useState, useEffect, useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom';
import baby from '../../../../../../public/img/baby.png';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
    table: {
        width: 750,
        margin:'0 auto',
    },
    head: {
      backgroundColor:'#FFCC66',
    },
});

const FirstMemoryData = (props) => {

    const classes = useStyles();

    const history = useHistory();

    const { userData, setUserData, startDate ,first , setFirst, memo, setMemo, change, setChange} = props;

    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState("");
    const [show, setShow] = useState(false);
    const detailId = detail.id;
    
  

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setShow(false);
    };

    const inputFirst = useCallback((event) => {
        setFirst(event.target.value);
    },[setFirst]);

    const inputMemo = useCallback((event) => {
        setMemo(event.target.value)
    },[setMemo]);

    // newDateをyyyy-mm-dd形式に変える
        const handleChange = (date) => {
        var changes = date.toISOString().slice(0, 10);
        setChange(changes);
    }

    // 詳細取得
    const handleRowClick = (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        e.preventDefault();
        const getDetails = async () => {
        const response = await axios.get(`api/firstmemory/${id}`);
        setDetail(response.data.data); 
        // history.push(`/firstmemory/${id}`,[id]);
        }
        getDetails();
    }
    

    // 編集画面へ
    const showEdit = () => {
        setShow(true);
    };
    // もどるボタン
    const goBack = () => {
        setShow(false);
        setOpen(true);
    }
    // 更新
    const updateFirstInfo = (e) => {
        const upInfo = {
            first: first,
            date: change,
            memo: memo,
        }
        console.log(detailId);
        axios
        .put(`api/firstmemory/${detailId}`, upInfo)
        .then(res => {
            console.log("成功！");
        })
        .catch(err => {
            alert("更新に失敗しました");
        });
        handleClose();
        location.reload();
    };
       
    return(
    <>
        <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell align="center">できたこと</TableCell>
              <TableCell align="center">日付</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row,index) => (
              <TableRow key={index} onClick={(e) => {
                handleClickOpen();
                handleRowClick(e);
              }} data-id={row.id}>
                <TableCell  align="center">{row.first}</TableCell>
                <TableCell  align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>

      {/* モーダル */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent> 
            { show ? <DatePicker 
            selected={startDate}
            placeholderText="日付"
            onChange={handleChange}
            value={change}
            />:
            <p>{detail.date}</p> }
            
            { show ? <TextField
            className={classes.TextField}
            id="standard-basic"
            margin="dense"
            placeholder={detail.first}
            value={first}
            onChange={inputFirst}
            fullWidth
            />:
            <p>{detail.first}</p> }

            { show ?<TextField
            className={classes.TextField}
           
            margin="dense"
            placeholder={detail.memo}
            value={memo}
            onChange={inputMemo}
            fullWidth
            />:
            <p>{detail.memo}</p> }
        </DialogContent>
        <DialogActions>
        {!show ?
          <Button onClick={showEdit} color="primary">
            編集
          </Button>:
          <>
            <Button onClick={goBack} color="primary">
                もどる
            　</Button>
            <Button onClick={updateFirstInfo} color="primary">
                更新する
            </Button>
         </>
        }
        </DialogActions>
      </Dialog>

    </>    
    );
}

export default withRouter(FirstMemoryData)