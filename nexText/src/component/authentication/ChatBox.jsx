import React from 'react'
import { ChatState } from '../../context/ChatProvider.jsx'
import { Box, Flex } from '@chakra-ui/react';
import SingleChat from '../SingleChat.jsx';
export default function ChatBox({fetchAgain,setFetchAgain}) {
  const {selectedChat} = ChatState();
  return (
    <Box
    display={{base:selectedChat?"flex":"none",md:"flex"}}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    width={{base:"100%",md:"68%"}}
    borderWidth="1px"
    color="black"
    >
      <SingleChat/>
    </Box>
  )
}
