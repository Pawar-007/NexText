import React from 'react'
import { ChatState } from '../context/ChatProvider.jsx'
import SideDrawer from '../component/authentication/miscellaneous/SideDrawer.jsx';
import { Box } from '@chakra-ui/react';
import MyChats from '../component/authentication/MyChats.jsx';
import ChatBox from '../component/authentication/ChatBox.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function ChatsPage() {
  const {user}= ChatState();
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
      {user && <MyChats style={{ width: '30%' }} />} 
      {user && <ChatBox style={{ width: '65%' }} />} 
      </Box>
    </div>
  )
}

export default ChatsPage;
