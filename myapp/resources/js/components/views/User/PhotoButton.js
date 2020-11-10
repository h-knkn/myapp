import React , {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import firebase, { storage } from "../../../../../firebase/firebase";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
  
    const [image, setImage] = useState("");
    const [files, setFiles] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
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
          });
    };

    useEffect(() => {
    const fetchImages = async () => {

    let result = await storageRef.child('images').listAll();
        let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
    
        console.log(result);
        console.log(urlPromises);
        return Promise.all(urlPromises);

    }
    
    const loadImages = async () => {
        const urls = await fetchImages();
        setFiles(urls);
    }
    loadImages();
    }, []);
    

    // // Now we get the references of these images
    // storageRef.listAll().then(function(result) {
    //     // console.log(result);
    //     result.items.forEach(function(imageRef) {
    //     // And finally display them
    //     // console.log(result.items);
    //     displayImage(imageRef);
    //     });
    // }).catch(function(error) {
    //     alert("ops!")
    // });

    // // useEffect(() => {
    // //     displayImage();
    // // }, []);
  
    // const displayImage = (imageRef) => {
    //     imageRef.getDownloadURL().then(data => {
    //         setFiles([data]);
    //     })
    //     // console.log(files);
            
    // }

    const deletePhtot = () => {
        // Create a reference to the file to delete
        var desertRef = storage.ref(`/images/${image.name}`);

        // Delete the file
        desertRef.delete().then(function() {
            alert("削除しました");
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
            <img src={imageUrl} />
            <Button className={classes.PhotoButton} onClick={deletePhtot}>削除</Button>

            <Slider {...settings}>            
                {files.map((file, index) => (
                    <img key={'unique_key_string' + index} src={file} />
                ))}
            </Slider>

    
        </div>
    );

}



export default PhotoButton

