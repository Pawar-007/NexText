import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box,IconButton,Text } from '@chakra-ui/react';
import CloseButton from 'react-bootstrap/CloseButton'
function SingleChat() {
  const {user,selectedChat,setSelectedChat}=ChatState();
  return (
   <>
   {selectedChat?(
      <>
      <Text
      fontSize={{base:"28px",md:"30px"}}
      pb={3}
      px={2}
      w="100%"
      fontFamily="work sans"
      display="flex"
      justifyContent={{base:"space-between"}}
      alignItems="center"
      >
      <CloseButton
      style={{
         display:"none"
      }}
      onClick={()=>setSelectedChat('')}
      />
      </Text>
      </>
   ):
   <Box
   display="flex" alignItems="center" justifyContent="center" h="100%"
   fontFamily="Work snas" fontSize="3xl"
   >
      Click on a user to start chatting
   </Box>
   }
   </>
  )
}

export default SingleChat
