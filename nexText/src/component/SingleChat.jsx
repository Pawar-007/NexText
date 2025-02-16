import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box,IconButton,Text } from '@chakra-ui/react';
import CloseButton from 'react-bootstrap/CloseButton'
import getSender,{getSenderFull } from '../config/ChatLogic.js';
import ProfileModel from './authentication/miscellaneous/profileModel.jsx';
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
      color="black"
      >
      <Box
      d={{base:"flex",md:"none"}}
      style={{
         justifyItems:"center",
         backgroundColor:"gray",
         color:"black",
         padding:"8px",
         fontSize:"large",
         borderRadius:"5px"
      }}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
      </svg>
      </Box>
      {!selectedChat.isGroupChat?(
         <>
         {getSender(user,selectedChat.users)}
         <ProfileModel user={getSenderFull(user,selectedChat.users)}/>
         </>
      ):(
         <>
         {selectedChat.chatName.toUpperCase()}

         </>
      )}
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
