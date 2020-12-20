import React , {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import firebase, { storage } from "../../../../../../firebase/firebase";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    addPhotoText: {
        fontSize: '15px',
        textAlign: 'center',
    },
    PhotoButton: {
      margin: 'auto',
      backgroundColor: '#FFCC66',
      '&:hover': {
        background: "#FFCC66",
        opacity: 0.6,
     },
    },
}));


const PhotoButton = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    const classes = useStyles();

    var storageRef = firebase.storage().ref();
  
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");
    const [files, setFiles] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [pickImage, setpickImage] = useState("");
    const handleImage = event => {
        const image = event.target.files[0];
        setImage(image);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = event => {
        event.preventDefault();
        if (image === "") {
          console.log("ファイルが選択されていません");
          return;
        }
        // アップロード処理
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
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
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(fireBaseUrl => {
          setImageUrl(fireBaseUrl);
          location.reload();
        });
    };

    useEffect(() => {
    const fetchImages = async () => {
    let result = await storageRef.child('images').listAll();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    
        console.log(result);
        console.log(urlPromises);
        console.log(files);
        console.log(image);
        return Promise.all(urlPromises); 
    }
    
    const loadImages = async () => {
        const urls = await fetchImages();
        setFiles(urls);
    }
    loadImages();
    }, []);

    // クリックした画像をモーダルに表示
    const showPhoto = () => {
        setOpen(true);
        // DOM要素の取得
        var eventDOM = event.target;
        var src = eventDOM.getAttribute('src');
        setpickImage(src);
        console.log(src);
    }
    
    const deletePhtot = () => {
        // ダウンロードURLからの参照
        var httpsReference = storage.refFromURL(pickImage);
        // ファイル名取得
        let fileName = httpsReference.name;
        var desertRef = storageRef.child(`/images/${fileName}`);
        console.log(fileName);
        
        desertRef.delete().then(function() {
            alert("削除しました");
            location.reload();
        }).catch(function(error) {
            alert("削除エラー");
        });
    }
    

    return(
        <div>
            <h3 className={classes.addPhotoText}>写真を登録してね</h3>
            <div className="addphoto">
            <form onSubmit={onSubmit}>
                <input type="file" onChange={handleImage} />
                <Button type="submit" className={classes.PhotoButton}>登録</Button>
            </form>
            </div>
            {/* <img src={imageUrl} /> */}
            <Button className={classes.PhotoButton} onClick={deletePhtot}>削除</Button>

            <Slider {...settings} >            
                {files.map((file, index) => (
                    <img key={'unique_key_string' + index} src={file} onClick={showPhoto}/>
                ))}
            </Slider>

            {/* 削除モーダル */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"削除しますか？"}</DialogTitle>
                <DialogContent>
                    <img src={pickImage}/>
                </DialogContent>
                <DialogActions>
                <Button onClick={deletePhtot} color="primary">
                    削除
                </Button>
                </DialogActions>
            </Dialog>
    
        </div>
    );
}

export default PhotoButton

