import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuModal from '../../User/Home/MenuModal';
import TextField from '@material-ui/core/TextField';
import ShareInfoData from './ShareInfoData';
import {useDispatch, useSelector} from "react-redux";
import {singOut} from "../../../../../../redux/users/operations";


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
    TextField: {
      display:'flex',
      width:'70%',
    },
    addButton: {
        margin: 'auto',
        backgroundColor: '#FFCC66',
        marginTop:'20px',
        '&:hover': {
          background: "#FFCC66",
          opacity: 0.6,
       },
      },
}));

const ShareInfo = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);

    const [shareInfo, setShareInfo] = useState("");
    const [allergies, setAllergies] = useState("");
    const [allergiesName, setAllergiesName] = useState("");
    const [houseRules, setHouseRules] =  useState("");
    const [kidsRules, setKidsRules] =  useState("");
    const [requestTo, setRequestTo] =  useState("");
    const [memo, setMemo] =  useState("");
    const [showAllergiesName, setShowAllergiesName] = useState(false);

    const onAllergies = useCallback((event) => {
        setAllergies(0);
        setShowAllergiesName(true);
        document.getElementById('on').classList.toggle("change-color");
        document.getElementById('off').classList.remove("change-color");
        console.log("有");
    },[setAllergies]);

    const offAllergies = useCallback((event) => {
        setAllergies(1);
        setShowAllergiesName(false);
        document.getElementById('off').classList.toggle("change-color");
        document.getElementById('on').classList.remove("change-color");
        console.log("無");
    },[setAllergies]);

    const inputAllergiesName = useCallback((event) => {
        setAllergiesName(event.target.value);
      },[setAllergiesName]);

    const inputHouseRules = useCallback((event) => {
        setHouseRules(event.target.value);
      },[setHouseRules]);

    const inputKidsRules = useCallback((event) => {
        setKidsRules(event.target.value);
      },[setKidsRules]);

    const inputRequest = useCallback((event) => {
        setRequestTo(event.target.value);
      },[setRequestTo]);

    const inputMemo = useCallback((event) => {
        setMemo(event.target.value);
      },[setMemo]);

    // 取得
    useEffect(() => {
        axios
          .get(`api/share`)
          .then(res => {
            setShareInfo(res.data.data);
          })
          .catch(err => {
            alert(err);
          });
    }, []);
    console.log(shareInfo);

    // 登録
    const addShareInfo = () => {
        axios
        .post(`api/share`, {
            allergies: allergies,
            allergies_name: allergiesName,
            house_rules: houseRules,
            kids_rules: kidsRules,
            request_to: requestTo,
            memo: memo,
        })
        .then(res => {
          alert("共有事項を登録しました。");
          location.reload();
        })
        .catch(err => {
          alert("登録に失敗しました。");
        }); 
    }


    return(
        <>
            <h1 className="text1">共有事項</h1>
            <div className={classes.displayFlex}>
            <MenuModal />
            <Button className={classes.logoutButton} onClick={() => dispatch(singOut())}>
            ログアウト
            </Button>
            </div>
            <div>
            {!shareInfo ? (
            <div className="info-box">
                    <div className={classes.TextField}>
                        <ul className="allergies_ul">
                            <li id="on" onClick={onAllergies}>有</li>
                            <li id="off" onClick={offAllergies}>無</li>
                            { showAllergiesName ? 
                              <TextField
                              className={classes.TextField}
                              placeholder="アレルギー名"
                              value={allergiesName}
                              onChange={inputAllergiesName}
                              fullWidth
                              />:
                            ''}
                        </ul>
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            value={houseRules}
                            onChange={inputHouseRules}
                            label="お家ルール" 
                            fullWidth
                        />
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            value={kidsRules}
                            onChange={inputKidsRules}
                            label="子供との決め事"
                            fullWidth
                        />
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            value={requestTo}
                            onChange={inputRequest}
                            label="シッターへのリクエスト"
                            fullWidth
                        />
                    </div>
                    <div className={classes.TextField}>
                        <TextField
                            value={memo}
                            onChange={inputMemo}
                            label="その他"
                            fullWidth
                        />
                    </div>
                <Button className={classes.addButton} onClick={addShareInfo}>登録</Button>
            </div>
             ) : (
                <ShareInfoData shareInfo={shareInfo} setShareInfo={setShareInfo} allergies={allergies} setAllergies={setAllergies}
                    allergiesName={allergiesName} setAllergiesName={setAllergiesName} houseRules={houseRules} setHouseRules={setHouseRules} 
                    kidsRules={kidsRules} setKidsRules={setKidsRules} requestTo={requestTo} setRequestTo={setRequestTo} memo={memo} setMemo={setMemo}
                    onAllergies={onAllergies} offAllergies={offAllergies} inputHouseRules={inputHouseRules} inputKidsRules={inputKidsRules}
                    inputRequest={inputRequest} inputMemo={inputMemo} showAllergiesName={showAllergiesName} inputAllergiesName={inputAllergiesName}
                />
            )}    
            </div>
        </>
    )
}
export default ShareInfo