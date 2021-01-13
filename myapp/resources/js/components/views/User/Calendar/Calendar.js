import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuModal from '../../User/Home/MenuModal';
import Calendars from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getUsersId} from '../../../../../../redux/users/selectors';
import {singOut} from "../../../../../../redux/users/operations";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
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
  calendarUi: {
    width:'85%',
    margin: '0 auto',
  },
  detailDialog: {
    width:'400px',
    height: '300px',
  },
}));


const Calendar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const individualID = getUsersId(selector);
  // カレンダー入力情報
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(new Date());
  const [selectDay, setSelectDay] = useState("");
  const [database, setDatabase] = useState([]);
  // モーダル
  const [openAdd, setOpenAdd] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const inputTitle = useCallback((event) => {
    setTitle(event.target.value);
  },[setTitle]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  },[setDescription]);

  // 日付のフォーマット + モーダルオープン 
  const handleChange = (date) => {
    date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() + 540);
    var changes = date.toISOString().slice(0, 10);
    setSelectDay(changes);

    console.log(changes);
    database.forEach(element => {
      if(changes === element.date) {
        setOpenSchedule(true);
        console.log("詳細モーダル");
      }
        // setOpenAdd(true);
    });// end forEach
     
  }
  
  // モーダルオープン 
  const handleClickOpen = () => {
    if(selectDay === "") {
      setOpenAdd(true);
    }
    // else {
    //   setOpenSchedule(true);
    // }
  };
  
  const handleClose = () => {
    setOpenAdd(false);
    setOpenSchedule(false);
    setOpenEdit(false);
    setSelectDay("");
  };

  // 取得
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('api/calendar');
        console.log(response.data);
        const items = response.data;
        // 配列から条件に合うもの全てを返す
        const result = items.filter(item => item.user_id === individualID);
        console.log(result);
        setDatabase(result);
      }
      getData();
  },[setDatabase]);
  
  // 予定追加
  const addSchedule = () => {
    if(title === '' || description === '') {
      alert('必須項目が未入力です。');
      return false
    }
    if (title.length > 50) {
      alert('タイトルは50文字以内で入力してください')
      return false
    }
    if (description.length > 100) {
      alert('メモは100文字以内で入力してください')
      return false
    }
    axios
    .post(`api/calendar`, {
        user_id: individualID,
        title: title,
        date: selectDay,
        description: description
    })
    .then(res => {
      alert("予定を保存しました。");
      location.reload();
    })
    .catch(err => {
      alert("失敗しました。");
    }); 
  }

  // 編集画面へ
  const showEdit = () => {
    setOpenEdit(true);
    setOpenSchedule(false);
  };

  // 予定更新
  const editSchedule = () => {
    if(title === '' || description === '') {
      alert('必須項目が未入力です。');
      return false
    }
    if (title.length > 20) {
      alert('タイトルは50文字以内で入力してください')
      return false
    }
    if (description.length > 100) {
      alert('メモは100文字以内で入力してください')
      return false
    }

    let id = "";
    database.forEach(element => {
      if(selectDay === element.date) {
        id = element.id;
      }
    });// end forEach

    console.log(id);
    console.log(selectDay);
    
    const newEditInfo = {
      user_id: individualID,
      title: title,
      date: selectDay,
      description: description
      }
      axios
        .put(`api/calendar/${id}`, newEditInfo)
        .then(res => {
         console.log("成功！");
        })
        .catch(err => {
         alert("更新に失敗しました");
      });
        handleClose();
        location.reload();
  }

  // 予定削除
  const deleteSchedule = () => {
    let id = "";
    database.forEach(element => {
      if(selectDay === element.date) {
        id = element.id;
      }
    });// end forEach
    console.log(id);
    axios
      .delete(`api/calendar/${id}`)
      .then(res => {
          console.log("削除しました");
      })
      .catch(err => {
          alert("削除できませんでした");
      });
      handleClose();
      location.reload();
  }

  // 保存済みの予定のタイトルをカレンダーに表示
  const getTileContent = (calendar) => {
    let year = calendar.date.getFullYear();
    let month = calendar.date.getMonth() + 1;
    let day = calendar.date.getDate();
    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);
    const formatDate = (year + '-' + month + '-' + day);

    let message = "";

    // 取得したjsonデータを読み込みカレンダーの日付と一致する場合にタイル内容設定
    database.forEach(element => {
      if(formatDate === element.date) {
         message = element.title;
      }
    });// end forEach
    
    const MAX_LENGTH = 5;
     if (message.length > MAX_LENGTH) {
  
      // substr(何文字目からスタートするか, 最大値);
      return message.substr(0, MAX_LENGTH);
    }
    //　文字数がオーバーしていなければそのまま返す
    return  <p>{message}</p>
    
  }
  
    return(
        <>
          <h1 className="text1">カレンダー</h1>
          <div className={classes.displayFlex}>
          <MenuModal />
          <Button className={classes.logoutButton} onClick={() => dispatch(singOut())}>
            ログアウト
          </Button>
          </div>
  
          <Calendars
            value={value}
            onChange={handleChange}
            onClickDay={handleClickOpen}
            tileContent={getTileContent}
            className={classes.calendarUi}
          />

          {/* 予定追加モーダル */}
          <Dialog open={openAdd} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">予定</DialogTitle>
            <DialogContent>
              <p>日付: {selectDay}</p>
              <TextField
                label="タイトル"
                onChange={inputTitle}
                fullWidth
              />
              <TextField
                label="メモ"
                onChange={inputDescription}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={addSchedule} color="primary">
                保存
              </Button>
            </DialogActions>
          </Dialog>

          {/* 予定詳細モーダル */}
          <Dialog open={openSchedule} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">予定</DialogTitle>
            <DialogContent className={classes.detailDialog}>
              {database.map((row,index) => (
                <div key={index}>
                    {selectDay === row.date ? (
                      <>
                        <p>{row.date}</p>
                        <p>{row.title}</p>
                        <p>{row.description}</p>
                      </>
                    ) : (
                        ''
                    )}
                </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={showEdit} color="primary">
                編集
              </Button>
              <Button onClick={deleteSchedule} color="primary">
                削除
              </Button>
            </DialogActions>
          </Dialog>

          {/* 予定更新モーダル */}
          <Dialog open={openEdit} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent className={classes.detailDialog}>
            {database.map((row,index) => (
              <div key={index}>
              {selectDay === row.date ? (
                <>
                  <p>日付: {selectDay}</p>
                  <TextField
                    placeholder={row.title}
                    onChange={inputTitle}
                    value={title}
                    fullWidth
                  />
                  <TextField
                    placeholder={row.description}
                    onChange={inputDescription}
                    value={description}
                    fullWidth
                  />
                </>
                ) : (
                  ''
                )}
              </div>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={editSchedule} color="primary">
                保存
              </Button> 
            </DialogActions>
          </Dialog>
        </>
    )
}


export default Calendar