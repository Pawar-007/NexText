import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {  Image,Text } from '@chakra-ui/react';
import { Avatar, AvatarGroup } from "@/components/ui/avatar"

function ProfileModel({ user, children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <>
      {children ? (
        <span onClick={handleShow} style={{ cursor: 'pointer' }}>
          {children}
        </span>
      ) : (
        <AvatarGroup>
          <Avatar  size="small" pic={user?.pic} name={user?.name}
          onClick={handleShow}
          ></Avatar>
     </AvatarGroup>
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
          name={user?.name}
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
