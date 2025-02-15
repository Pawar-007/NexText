import React, { useState } from 'react'
import { ChatState } from '../context/ChatProvider.jsx'
import SideDrawer from '../component/authentication/miscellaneous/SideDrawer.jsx';
import { Box } from '@chakra-ui/react';
import ChatBox from '../component/authentication/ChatBox.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyChats from '../component/authentication/MyChats.jsx';
function ChatsPage() {
  const {user}= ChatState();
  const [fetchAgain,setFetchAgain]=useState();
    const navigate=useNavigate();
    useEffect(()=>{
      const userInfo=JSON.parse(localStorage.getItem("userInfo"));
      console.log("chat home ",userInfo);
      if(!userInfo){
        navigate("/");
      }

   },[navigate]);

  return (
    <div style={{width:"100%"}}>
      {user && <SideDrawer/>}
      <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      height="91vh" // Full height minus potential header
      padding="10px"
      color="white"
      >
      {user && <MyChats fetchAgain={fetchAgain}/>}
      {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />} 
      </Box>
    </div>
  )
}

export default ChatsPage;
