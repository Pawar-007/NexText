import {  createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const chatContext=createContext();

const ChatProvider=({children})=>{
   let navigate=useNavigate();
   const [user,setUser]=useState('');
   const [selectedChat,setSelectedChat]=useState('');
   const [chats,setChats]=useState([]);
useEffect(()=>{
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);
      
      if (userInfo) {
        navigate("/chats");
      }
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      navigate("/")
    }},[navigate])

   return (
      <chatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats}}>
         {children}
      </chatContext.Provider>
   )
}


export const ChatState=()=>{

   return useContext(chatContext);
}

export default ChatProvider;