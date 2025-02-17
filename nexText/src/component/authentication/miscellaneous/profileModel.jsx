import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {  Image,Text } from '@chakra-ui/react';


function ProfileModel({ user, children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   console.log("user ",user)
  return (
    <>
      {children ? (
        <span onClick={handleShow} style={{ cursor: 'pointer' }}>
          {children}
        </span>
      ) : (
        <i className="fas fa-bell" onClick={handleShow} style={{ cursor: 'pointer' }}></i>
      )}

      <Modal show={show} onHide={handleClose}
      style={{marginTop:"50px"}}
      >
        <Modal.Header closeButton>
          <Modal.Title>{user?.name || 'Guest user'}</Modal.Title>
        </Modal.Header>
        <Modal.Body
        style={{display:"flex",flexDirection:"column",alignItems:"center"}}
        >
          <Image
          borderRadius="full"
          boxSize="150px"
          src={user?.pic}
          alt={user?.name}
          />
          <Text
          fontSize={{base:"26px",md:"29px"}}
          fontFamily="work sans"
          >{user?.email}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileModel;
