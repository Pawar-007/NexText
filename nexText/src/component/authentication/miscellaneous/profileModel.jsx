import React from 'react';
import {
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
function ProfileModel({user,children}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     {children?(
      <span onClick={onOpen}>
        {children}
      </span>
    ):
    (
      <i className="fas fa-bell"></i>
     )
   }
   <div>
      <Modal isOpen={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{user.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  )
}

export default ProfileModel;
