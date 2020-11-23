import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import baby_icon from '../../../../../../public/img/baby_icon.png';
import PropTypes from 'prop-types' ;
import { withRouter } from 'react-router';
import MyBaby from '../MyBaby/MyBaby';
import FirstMemory from '../FirstMemory/FirstMemory';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const MenuModal = () => { 

  const history = useHistory();
 
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToUserHome = () => {
    history.push('/userprofile');
    handleClose();
  };
  const handleToMyBabyPage = () => {
    history.push('/babyprofile');
    handleClose();
  };
  const handleToFirstMemory = () => {
    history.push('/firstmemory');
    handleClose();
  };


  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <img src={baby_icon}/>
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>   
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button onClick={handleToUserHome}>
            <ListItemText primary="ホーム"/>
          </ListItem>

          <ListItem button onClick={handleToMyBabyPage}>
            <ListItemText primary="My Baby"/>
          </ListItem>
        
          <ListItem button>
            <ListItemText primary="カレンダー" />
          </ListItem>
     
          <ListItem button onClick={handleToFirstMemory}>
            <ListItemText primary="はじめてを記録" />
          </ListItem>
   
          <ListItem button>
            <ListItemText primary="共有事項" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
export default withRouter(MenuModal)
