import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import firebase, { storage } from "../../../../../../firebase/firebase";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getUsersId} from '../../../../../../redux/users/selectors';
import {singOut} from "../../../../../../redux/users/operations";
import MenuModal from '../../User/Home/MenuModal';
import star from '../../../../../../public/img/star.png';
import boy from '../../../../../../public/img/boy.png';
import girl from '../../../../../../public/img/girl.png';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const useStyles = makeStyles((theme) => ({
    root: {
    '& > *': {
      margin: theme.spacing(1),
      display: 'block',
    },
    },
    upLoadButton: {
      margin: 'auto',
      backgroundColor: '#FFCC66',
      '&:hover': {
        background: "#FFCC66",
        opacity: 0.6,
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
    displayFlexUpdate: {
      display:'flex',
      alignItems:'flex-start',
      marginTop:'30px',
      
    },
    star: {
      margin:'0',
      marginRight:'10px',
    },
    changeColor: {
      backgroundColor: 'black',
    },
    icon: {
      marginRight: 8,
      height: 48,
      width: 48
    },
    dialog: {
      width:'500px',
      height:'400px',
    },
}));

const MyBaby = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const id = getUsersId(selector);

  // Babyinfo入力
  const [open, setOpen] = useState(false);
  const [birth, setBirth] = useState(new Date());
  const [change , setChange] = useState("");
  const [userData, setUserData] = useState([]);
  const [name , setName] = useState("");
  const [gender , setGender] = useState("");
  const [averagetemperature , setAverageTemperature] = useState("");
  const [memo , setMemo] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // newDateをyyyy-mm-dd形式に変える
    const handleChange = (date) => {
    var changes = date.toISOString().slice(0, 10);
    setChange(changes);
  }

  const inputName = useCallback((event) => {
    setName(event.target.value);
  },[setName]);

  const inputBirth = useCallback((event) => {
    setBirth(event.target.value)
  },[setBirth]);

  const selectBoy = useCallback((event) => {
    setGender(0);
    document.getElementById('on').classList.toggle("change-color");
    document.getElementById('off').classList.remove("change-color");
    console.log("Boy");
  },[setGender]);

  const selectGirl = useCallback((event) => {
    setGender(1);
    document.getElementById('off').classList.toggle("change-color");
    document.getElementById('on').classList.remove("change-color");
    console.log("Girl");
  },[setGender]);

  const inputAverageTemperature = useCallback((event) => {
    setAverageTemperature(event.target.value);
    console.log("クリックされた");
  },[setAverageTemperature]);
  
  const inputMemo = useCallback((event) => {
    setMemo(event.target.value)
  },[setMemo]);

  //ベイビー情報取得
  useEffect(() => {
    const getInfo = async () => {
      const response = await axios.get(`api/babyinfo`);
        const items = response.data;
        console.log(items);
        // 配列から指定のオブジェクトを1つだけ取り出す
        const result = items.find(item => item.user_id === id);
        console.log(result);
        setUserData(result);
      }
      getInfo();
  },[]);

  //ベイビー情報登録
  const addBabyInfo = () => {
    if(name === '' || gender === ''|| averagetemperature ==='' || change === '' || memo === '') {
      alert('必須項目が未入力です。');
      return false
    }
    if (name.length > 10) {
      alert('名前は10文字以内で入力してください')
      return false
    }
    if (averagetemperature.length > 10) {
      alert('平熱は10文字以内で入力してください')
      return false
    }
    if (memo.length > 100) {
      alert('メモは100文字以内で入力してください')
      return false
    }
    axios
      .post(`api/babyinfo`, {
        id: id,
        user_id: id,
        name: name,
        birth: change,
        gender: gender,
        average_temperature: averagetemperature,
        memo: memo,
        })
        .then(res => {
          alert("登録しました。");
          location.reload();
        })
        .catch(err => {
          alert("登録に失敗しました。");
        }); 
  }

  // 更新
  const updateInfo = () => {
    if(name === '' || gender === ''|| averagetemperature ==='' || change === '' || memo === '') {
      alert('必須項目が未入力です。');
      return false
    }
        if (name.length > 10) {
      alert('名前は10文字以内で入力してください')
      return false
    }
    if (averagetemperature.length > 10) {
      alert('平熱は10文字以内で入力してください')
      return false
    }
    if (memo.length > 100) {
      alert('メモは100文字以内で入力してください')
      return false
    }
    const upInfo = {
      // id: id,
      user_id: id,
      name: name,
      birth: change,
      gender: gender,
      average_temperature: averagetemperature,
      memo: memo,
    }
    axios
      .put(`api/babyinfo/${id}`, upInfo)
      .then(res => {
        console.log("成功！");
      })
      .catch(err => {
        alert("更新に失敗しました");
      });
      handleClose();
      location.reload();
  };


  // Firebase画像アップロード
  const storageRef = firebase.storage().ref();
  
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [files, setFiles] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const handleImage = event => {
    const image = event.target.files[0];
    setPreview(image);
    
  };

  const onSubmit = event => {
    event.preventDefault();
    if (preview === "") {
      console.log("ファイルが選択されていません");
      return;
    }
    // アップロード処理
    const uploadTask = storage.ref(`/profile/${id}/${preview.name}`).put(preview);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
    alert("アップロードしました");
  };

  const next = snapshot => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };

  const error = error => {
    console.log(error);
  };

  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    storage
      .ref(`/profile/${id}/`)
      .child(preview.name)
      .getDownloadURL()
      .then(fireBaseUrl => {
      setImageUrl(fireBaseUrl);
      // location.reload();
    });
  };

  // プロフィール画像取得
  useEffect(() => {
    const fetchImages = async () => {

    let result = await storageRef.child(`profile/${id}`).listAll();
    let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    console.log(urlPromises);
    return Promise.all(urlPromises);
    }
    const loadImages = async () => {
      const urls = await fetchImages();
      setFiles(urls);
    }
    loadImages();
  }, []);

  return (
  <div>
     <h1 className="text1">My Baby</h1>
     <div className={classes.displayFlex}>
      <MenuModal />
      <Button className={classes.logoutButton} onClick={() => dispatch(singOut())}>
        ログアウト
      </Button>
    </div>
    <h2>{id}</h2>
    <div className="contents">
    {!userData ? (
      <div className="info-box">
          <div className={classes.displayFlex}>
            <img className={classes.star} src={star}/>
            <TextField 
            id="outlined-basic" 
            label="名前" 
            value={name}
            onChange={inputName}
            variant="outlined"/>
          </div>
          <div className={classes.displayFlex}>
            <img className={classes.star} src={star}/>
            <DatePicker 
            selected={birth}
            placeholderText="生年月日"
            onChange={handleChange}
            value={change}
            />
          </div>
          <div className={classes.displayFlex}>
            <img className={classes.star} src={star}/>
            <ul className="mybaby_ul">
              <li id="on" onClick={selectBoy} ><img src={boy}/></li>
              <li id="off" onClick={selectGirl}><img src={girl}/></li>
            </ul>
          </div>
          <div className={classes.displayFlex}>
            <img className={classes.star} src={star}/>
            <TextField id="outlined-basic" 
            label="平熱" 
            value={averagetemperature}
            onChange={inputAverageTemperature} 
            variant="outlined"/>
          </div>
          <div className={classes.displayFlex}>
            <img className={classes.star} src={star}/>
            <TextField 
            id="outlined-basic" 
            label="メモ" 
            value={memo}
            onChange={inputMemo} 
            variant="outlined"/>
          </div>
          <Button className={classes.upLoadButton} onClick={addBabyInfo}>登録</Button>
      </div>
      ) : (
        <div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <p>{userData.name}</p>
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <p>{userData.birth}</p>
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <>
                {userData.gender === 0 ? (
                     <p><img src={boy}/></p>
                ) : (
                    <p><img src={girl}/></p>
                )}                
          </>
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <p>{userData.average_temperature}</p>
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <p>{userData.memo}</p>
        </div>
        <Button className={classes.upLoadButton} onClick={handleClickOpen}>編集</Button>

        {/* 編集画面モーダル */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogContent　className={classes.dialog}>

          <TextField
              margin="dense"
              placeholder={userData.name}
              value={name}
              onChange={inputName}
              fullWidth
            />
            <DatePicker 
            selected={birth}
            placeholderText="生年月日"
            onChange={handleChange}
            value={change}
            />
            <div className={classes.displayFlexUpdate}>
              <ul className="mybaby_ul">
                <li id="on" onClick={selectBoy}><img src={boy}/></li>
                <li id="off" onClick={selectGirl}><img src={girl}/></li>
              </ul>
            </div>
            <TextField
              margin="dense"
              placeholder={userData.average_temperature}
              value={averagetemperature}
              onChange={inputAverageTemperature} 
              fullWidth
            />
            <TextField
              margin="dense"
              placeholder={userData.memo}
              value={memo}
              onChange={inputMemo}
              fullWidth
              rows={5}
            />
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={updateInfo} color="primary">
              登録
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      )}  
        
    <div>
      <div className="img-div">
        <img src={files}/>
        <p>{image.name}</p>
        {/* <img src={preview}/> */}
      </div>
    
      <form onSubmit={onSubmit}>
          <IconButton  className={classes.icon}>
            <label>
            <AddPhotoAlternateIcon/>
            <input type="file" className="display-none" onChange={handleImage}/>
            </label>
          </IconButton>
       
        <Button type="submit" className={classes.upLoadButton}>プロフィール画像を登録する</Button>
      </form>
    </div>
   
  </div>
  </div>
    
  ); 
}
  
export default MyBaby
