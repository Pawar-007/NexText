import React, { useEffect } from 'react'
import { useState } from 'react';
import { Box, Stack,Text } from '@chakra-ui/react';
import { ChatState } from '../../context/ChatProvider.jsx';
import axios from 'axios';
import ChatLoading from '../ChatLoading.jsx'
import getSender from '../../config/ChatLogic.js';
import GroupChatModeal from './miscellaneous/GroupChatModel.jsx'
import { Toast } from 'react-bootstrap';
function MyChats({fetchAgain}) {
  let {user,setUser,selectedChat,setSelectedChat,chats,setChats}= ChatState();
  const [loggedInUser, setLoggedInUser] = useState('');


  const fetchChats=async()=>{
    if (!user || !user.token) return;
    try {
      const config={ 
        headers:{ 
          Authorization:`Bearer ${user.token}`,
        }}
        const {data} = await axios.get(`/app/chats`, config);
        console.log("chats",data);
        setChats(data);
      }
        
        catch (error) {
          console.error("Error fetching chats:", error);
        }
      }
    
      useEffect(()=>{
        setLoggedInUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
      },[fetchAgain]);

  return (
    <Box
    display ={{base: selectedChat?"none":"flex",md:"flex" }}
    flexDirection={{base:"column"}}
    alignItems={"center"}
    bg={"white"}
    w={{base:"100%",md:"31%"}}
    borderRadius="1g"
    borderWidth="1px"
    color={"black"}
    >
    <Box
    px={3}
  fontSize={{ base: "28px", md: "30px" }}
  fontFamily="Work Sans"
  justifyContent="space-between"
  alignItems="center"
  display="flex"
  color="black"
    >
    <h1>Chats</h1>
    <GroupChatModeal>
      <button
    style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green", // Green background
    border: "none",
    borderRadius: "8px",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
    transition: "all 0.3s ease",
  }}

>
<i className="bi bi-plus"> New Group</i> 
</button>
    </GroupChatModeal>

    </Box>

    <Box
    d="flex"
    flexDir="column"
    p={3}
    bg="#f8f8f8"
    overflow="hidden"
    width="100%"
    >
     {
      chats ? (
       <Stack overflowY="scroll"
       
       >
          {chats.map((chat)=>{
            return(
              <Box
               key={chat._id}
             onClick={()=>setSelectedChat(chat)}
             px={3}
             py={2}
             borderRadius="5px"
             color={selectedChat === chat ? "white" : "black"}
             _hover={{color:"white",backgroundColor:"green"}}
             backgroundColor="gray.200"
             margin="5px"
            
          >
            <Text>
              {!chat.isGroupChat?getSender(loggedInUser,chat.users):
              (chat.chatName)}
            </Text>
          </Box>
            )
          })}
       </Stack>
      ):(
         <ChatLoading/>
      )
     }
    </Box>
    </Box>
  )
}

export default MyChats;
