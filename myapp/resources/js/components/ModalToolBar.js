import React from 'react';
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import login_modal from '../../../public/img/login_modal.png';
import { makeStyles } from '@material-ui/core/styles';

const customStyles = {
    content : {
      width: '400px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  };

  const useStyles = makeStyles((theme) => ({

  }));
  


  Modal.setAppElement('#app')

const ModalToolBar = () => {
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {        
        subtitle.style.color = '#3ab60b';
    }

    function closeModal(){
        setIsOpen(false);
    }
    
    return (    
        <div>
        <Button className="mr-2 btn btn-warning login" onClick={openModal}><img src="http://localhost/img/login_modal.png"/></Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>新規登録</h2>
          <Button variant="success" className="mr-2" onClick={closeModal}>close</Button>
          <div>テキストテキスト</div>          
        </Modal>
      </div>
    );
}

export default ModalToolBar;
