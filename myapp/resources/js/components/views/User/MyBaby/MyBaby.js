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
import { elementType } from 'prop-types';



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
}));

const MyBaby = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const id = getUsersId(selector);

  // Babyinfo入力
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [name , setName] = useState("");
  const [birth , setBirth] = useState("");
  const [gender , setGender] = useState("");
  const [averagetemperature , setAverageTemperature] = useState("");
  const [memo , setMemo] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputName = useCallback((event) => {
    setName(event.target.value);
  },[setName]);

  const inputBirth = useCallback((event) => {
    setBirth(event.target.value)
  },[setBirth]);

  const selectBoy = useCallback((event) => {
    setGender(0);
    console.log("Boy");
  },[setGender]);

  const selectGirl = useCallback((event) => {
    setGender(1);
    console.log("Girl");
  },[setGender]);

  const inputAverageTemperature = useCallback((event) => {
    setAverageTemperature(event.target.value);
    console.log("クリックされた");
  },[setAverageTemperature]);
  
  const inputMemo = useCallback((event) => {
    setMemo(event.target.value)
  },[setMemo]);


  console.log(id);

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
  console.log(userData);

  //ベイビー情報登録
  const addBabyInfo = () => {
    axios
      .post(`api/babyinfo`, {
        user_id: id,
        name: name,
        birth: birth,
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
    const upInfo = {
      name: name,
      birth: birth,
      gender: gender,
      average_temperature: averagetemperature,
      memo: memo,
    }
    axios
      .put('api/babyinfo/1', upInfo)
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
  const [files, setFiles] = useState([]);
  // const [imageUrl, setImageUrl] = useState("");
  const handleImage = event => {
    const image = event.target.files[0];
    setImage(image);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
      return;
    }
    // アップロード処理
    const uploadTask = storage.ref(`/profile/${image.name}`).put(image);
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
      .ref("profile")
      .child(image.name)
      .getDownloadURL()
      .then(fireBaseUrl => {
      setImageUrl(fireBaseUrl);
      location.reload();
    });
  };

  useEffect(() => {
    const fetchImages = async () => {

    let result = await storageRef.child('profile').listAll();
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
            variant="outlined" />
          </div>
          <div className={classes.displayFlex}>
            <img className={classes.star} src={star}/>
            <TextField 
            id="outlined-basic" 
            label="生年月日"
            value={birth}
            onChange={inputBirth} 
            variant="outlined" />
          </div>
          <div className={classes.displayFlex}>
            <img className={classes.star} src={star}/>
            <ul className="mybaby_ul">
              <li onClick={selectBoy} ><img src={boy}/></li>
              <li onClick={selectGirl}><img src={girl}/></li>
            </ul>
          </div>
          <div className={classes.displayFlex}>
            <img className={classes.star} src={star}/>
            <TextField id="outlined-basic" 
            label="平熱" 
            value={averagetemperature}
            onChange={inputAverageTemperature} 
            variant="outlined" />
          </div>
          <div className={classes.displayFlex}>
            <img className={classes.star} src={star}/>
            <TextField 
            id="outlined-basic" 
            label="メモ" 
            value={memo}
            onChange={inputMemo} 
            variant="outlined" />
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
          <DialogContent>

          <TextField
              margin="dense"
              label={userData.name}
              value={name}
              onChange={inputName}
              fullWidth
            />
            <TextField
              margin="dense"
              label={userData.birth}
              value={birth}
              onChange={inputBirth}
              fullWidth
            />
            <div className={classes.displayFlexUpdate}>
              <ul className="mybaby_ul">
                <li onClick={selectBoy}><img src={boy}/></li>
                <li onClick={selectGirl}><img src={girl}/></li>
              </ul>
            </div>
            <TextField
              margin="dense"
              label={userData.average_temperature}
              value={averagetemperature}
              onChange={inputAverageTemperature} 
              fullWidth
            />
            <TextField
              margin="dense"
              label={userData.memo}
              value={memo}
              onChange={inputMemo}
              fullWidth
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
      <img src={files}/>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={handleImage} />
        <Button type="submit" className={classes.upLoadButton}>アップロード</Button>
      </form>
    </div>
   
  </div>
  </div>
    
  ); 
}
  
export default MyBaby