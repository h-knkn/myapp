import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase, { storage } from "../../../../../../firebase/firebase";
import axios from "axios";
import MenuModal from '../../User/Home/MenuModal';
import star from '../../../../../../public/img/star.png';
import boy from '../../../../../../public/img/boy.png';
import girl from '../../../../../../public/img/girl.png';



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
    star: {
      margin:'0',
      marginRight:'10px',
    },
}));

const MyBaby = (props) => {

  const classes = useStyles();

  // Babyinfo入力
  const [userData, setUserData] = useState([]);
  const [name , setName] = useState("");
  const [birth , setBirth] = useState("");
  const [gender , setGender] = useState("");
  const [averagetemperature , setAverageTemperature] = useState("");
  const [memo , setMemo] = useState("");

  const inputName = useCallback((event) => {
    setName(event.target.value);
    console.log(setName);
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

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('api/babyinfo');
        console.log(response.data.data);
        setUserData(response.data.data);
      }
      getUser();
    },[]);
    console.log(userData);

  const addInfo = newInfo => {
    return axios
        .post('api/babyinfo', newInfo, {
           headers: {'Content-Type': 'application/json'}
        })
        .then(res => {
           console.log(res.data);
          
        })
        .catch(err => {
           console.log(err)
        })
  }
  const onInfoSubmit = (e) => {
    e.preventDefault()
    const newInfo = {
      name: name,
      birth: birth,
      gender: gender,
      average_temperature: averagetemperature,
      memo: memo,
    }
    addInfo(newInfo).then(res=>{
      alert("登録しました。");
    })
  }


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


  return (
  <div>
     <h1 className="text1">My Baby</h1>
     <div className={classes.displayFlex}>
      <MenuModal />
      <Button className={classes.logoutButton} onClick={logoutButton}>
        ログアウト
      </Button>
    </div>
    <div className="contents">
    {name ? (
      <div className="info-box">
        <form className={classes.root} noValidate autoComplete="off" onSubmit={onInfoSubmit}>
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
              <li onClick={selectGirl} ><img src={girl}/></li>
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
          <Button type="submit" className={classes.upLoadButton}>登録</Button>
        </form>
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
          <p>{userData.gender}</p>
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <p>{userData.average_temperature}</p>
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <p>{userData.memo}</p>
        </div>
        <Button type="submit" className={classes.upLoadButton}>編集</Button>
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