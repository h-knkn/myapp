import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuModal from '../../User/Home/MenuModal';
import TextField from '@material-ui/core/TextField';
import star from '../../../../../../public/img/star.png';
import ShareInfo from './ShareInfo';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const useStyles = makeStyles((theme) => ({
      displayFlex: {
        display:'flex',
        alignItems:'flex-start',
      },
      allergiesOn: {
        marginRight:'20px',
      },
      editButton: {
        margin: 'auto',
        backgroundColor: '#FFCC66',
        '&:hover': {
          background: "#FFCC66",
          opacity: 0.6,
       },
      },
}));

const ShareInfoData = (props) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const { shareInfo, setShareInfo, allergies ,setAllergies , allergiesName, setAllergiesName, houseRules, setHouseRules, kidsRules, setKidsRules, requestTo, setRequestTo, memo, setMemo , 
            onAllergies ,offAllergies, inputHouseRules, inputKidsRules, inputRequest, inputMemo ,showAllergiesName, inputAllergiesName } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    // 更新
    const editShareInfo = () => {
      const newShareInfo = {
      allergies: allergies,
      allergies_name: allergiesName,
      house_rules: houseRules,
      kids_rules: kidsRules,
      request_to: requestTo,
      memo: memo,
      }
      axios
        .put(`api/share/1`, newShareInfo)
        .then(res => {
         console.log("成功！");
        })
        .catch(err => {
         alert("更新に失敗しました");
      });
        handleClose();
        location.reload();
    }



    return(
        <div className="share-info-contents">
            <div className={classes.displayFlex}>
                <p className="under">アレルギー:</p>
                {shareInfo.allergies ===0 ? 
                    <>
                    <p className={classes.allergiesOn}>有</p>
                    <span>({shareInfo.allergies_name})</span>
                    </>
                : 
                  <p>無</p>
                }
            </div>
            <div className={classes.displayFlex}>
                <p className="under">お家ルール:</p>
                <p>{shareInfo.house_rules}</p>
            </div>
            <div className={classes.displayFlex}>
                <p className="under">子供との決め事:</p>
                <p>{shareInfo.kids_rules}</p>
            </div>
            <div className={classes.displayFlex}>
                <p className="under">シッターへのリクエスト:</p>
                <p>{shareInfo.request_to}</p>
            </div>
            <div className={classes.displayFlex}>
               <p className="under">その他:</p>
                <p>{shareInfo.memo}</p>
            </div>
            <Button className={classes.editButton} onClick={handleClickOpen}>編集</Button>

            {/* 編集画面モーダル */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
            <div className={classes.displayFlexUpdate}>
              <ul className="mybaby_ul">
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

            <TextField
              label="お家ルール"
              onChange={inputHouseRules}
              defaultValue={shareInfo.house_rules}
              fullWidth
            />
            <TextField
                label="子供との決め事"
                onChange={inputKidsRules}
                defaultValue={shareInfo.request_to}
                fullWidth
            />
            <TextField
              label="シッターへのリクエスト"
              onChange={inputRequest}
              defaultValue={shareInfo.memo}
              fullWidth
            />
            <TextField
              label="その他"
              onChange={inputMemo}
              defaultValue={shareInfo.kids_rules}
              fullWidth
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">キャンセル</Button>
                <Button color="primary" onClick={editShareInfo}>登録</Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}

export default ShareInfoData