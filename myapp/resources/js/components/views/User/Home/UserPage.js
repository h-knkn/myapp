import React , {useState, useEffect, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import PhotoButton from './PhotoButton';
import MenuModal from './MenuModal';
import {getSignedIn, getUsersName} from '../../../../../../redux/users/selectors';
import {useDispatch, useSelector} from "react-redux";
import {singOut} from "../../../../../../redux/users/operations";

const useStyles = makeStyles((theme) => ({
    main: {
      padding: '50px 5%',
      backgroundColor: '#FFE4E1',
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
    },
}));

const UserPage = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const getLoginState = getSignedIn(selector);
  const getName = getUsersName(selector);
  const [userData, setUserData] = useState([]);

  console.log(getLoginState);
  console.log(getName);
  

  useEffect(() => {
    axios
    .get('api/user', {
               headers: {Authorization:`Bearer${localStorage.access_token}`}
              })
            .then(res => {
              console.log(res);
              console.log(res.data);
              setUserData(res.data);
            })
  }, []);

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
  <div className={classes.main}>
    <div className={classes.displayFlex}>
      <MenuModal />
      <Button className={classes.logoutButton} onClick={() => dispatch(singOut())}>
        ログアウト
      </Button>
    </div>
    <div>こんにちは{userData.name}さん</div> 
    <div>あなたのメールアドレスは{userData.email}です</div>
    <p>{getName}</p>
    <PhotoButton />
  </div>
    
  );
  
}
  
export default UserPage