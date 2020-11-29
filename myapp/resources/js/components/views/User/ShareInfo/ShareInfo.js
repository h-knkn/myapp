import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MenuModal from '../../User/Home/MenuModal';


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
}));

const ShareInfo = () => {

    const classes = useStyles();






    

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
        <>
            <h1 className="text1">共有事項</h1>
            <div className={classes.displayFlex}>
            <MenuModal />
            <Button className={classes.logoutButton} onClick={logoutButton}>
            ログアウト
            </Button>
            </div>
        </>
    )
}
export default ShareInfo