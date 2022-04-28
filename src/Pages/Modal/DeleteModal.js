import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteModal = ({show, handleClose, title, message, setDeleteSer}) => {
  return (
    <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={()=>setDeleteSer(true)}>
           Delete
          </Button>
        </Modal.Footer>
      </Modal>
  );
};

export default DeleteModal;