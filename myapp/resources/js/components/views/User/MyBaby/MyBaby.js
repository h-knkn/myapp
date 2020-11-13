import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <TextField id="outlined-basic" label="名前" variant="outlined" />
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <TextField id="outlined-basic" label="生年月日" variant="outlined" />
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <ul className="mybaby_ul">
            <li><img src={boy}/></li>
            <li><img src={girl}/></li>
          </ul>
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <TextField id="outlined-basic" label="平熱" variant="outlined" />
        </div>
        <div className={classes.displayFlex}>
          <img className={classes.star} src={star}/>
          <TextField id="outlined-basic" label="メモ" variant="outlined" />
        </div>
      </form>
    </div>
    <div>
      
    </div>
   
  </div>
    
  );
  
}
  
export default MyBaby