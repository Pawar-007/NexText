import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box,Center,IconButton,Text } from '@chakra-ui/react';
import CloseButton from 'react-bootstrap/CloseButton'
import getSender,{getSenderFull } from '../config/ChatLogic.js';
import ProfileModel from './authentication/miscellaneous/profileModel.jsx';
import UpdateGroupChatModal from './authentication/miscellaneous/updateGroupChatModal.jsx';
import { Form, FormControl } from 'react-bootstrap';
import axios from 'axios';
import './singleChat.css'
import { toast } from 'react-toastify';
import ScrollableChat from './ScrollableChat.jsx';
import { io } from 'socket.io-client';
import TypingIndicator from './authentication/miscellaneous/typingIndicator.jsx';
const ENDPOINT='http://localhost:8000'
var socket ,selectedChatCompare;


function SingleChat() {
  const {user,selectedChat,setSelectedChat,notification,setNotification}=ChatState();
  const [fetchAgain,setFetchAgain]=useState('');
  const [newMessage,setNewMessage]=useState("");
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState([]);
  const [socketConnected,setSocketConnected]=useState(false);
  const [typing,setTyping]=useState(false);
  const [isTyping,setIsTyping]=useState(false);
 
  const handleBack=()=>{
   setSelectedChat('');
  }
    useEffect(()=>{
       socket=io(ENDPOINT);
       socket.emit("setup",user);
       socket.on("connected",()=>
         setSocketConnected(true)
       )
       socket.on("typing",()=>{
        
         setIsTyping(true);
       })
       socket.on("stop typing",()=>{
         setIsTyping(false);
       })
   },[])
  const fetchMessage=async()=>{
       if(!selectedChat) return;
       setLoading(true);
       try {
         const config={
               headers:{
                  "authorization":`Bearer ${user.token}`
               }
            }
         
        const {data}=await axios.get(`app/message/${selectedChat._id}`,config);
        setMessage(data);
        socket.emit("join room",selectedChat._id);
       } catch (error) {
         toast.error(
            <div>
            Error: occurd
        </div>,
        {
          position: "top-left",
          autoClose: 3000,            // Time limit (3 seconds)
          hideProgressBar: true,     // Hide progress bar
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",             // Dark theme for error toasts
        }
         )
       }finally{
         setLoading(false);
       }
  }

  useEffect(()=>{
     fetchMessage();
     selectedChatCompare=selectedChat
  },[selectedChat])

  useEffect(()=>{
       socket.on("notification",(notification)=>{
            setNotification(notification);
            console.log("notification",notification);
       })
  },[]);
  useEffect(()=>{
   socket.on("Message recieved",(newMessageRecived)=>{
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecived.chat._id){
          if(!notification?.includes(newMessageRecived.chat._id)){
               console.log("new message",newMessageRecived);
               setNotification([newMessageRecived,...notification]);
               setFetchAgain(!fetchAgain);

      }
      }else{
         setMessage((prevMessages) => {
           if (prevMessages.some((msg) => msg._id === newMessageRecived._id)) {
          return prevMessages; // Return the same state if message already exists
          }
          return [...prevMessages, newMessageRecived]; // Append new message if not duplicate
});
      }
   })
   return () => {
        socket.off("new Message"); 
    };
  })

const markMessagesAsDelivered = async () => {
    try {
        await axios.put("/app/Message/delivered", {
            chatId: selectedChat._id,
        }, {
            headers: { Authorization: `Bearer ${user.token}` },
        });

        // 🔄 Update UI after marking as delivered
       setNotification(prevNotifications => [
            ...prevNotifications,
            ...message.filter(msg => !msg.delivered).map(msg => ({
                ...msg, delivered: true
            }))
        ]);

    } catch (error) {
        console.error("Error updating delivered status", error);
    }
};
 
  const sendMessage=async(event)=>{
      socket.emit("stop typing",selectedChat._id);
      if(event.key === 'Enter' && newMessage){
         event.preventDefault();
         try {
            
            const config={
               headers:{
                  "authorization":`Bearer ${user.token}`,
                  "Content-Type":"application/json"
               }
            }
            setNewMessage("")
            const {data}=await axios.post('/app/message',{
               content:newMessage,
               chatId:selectedChat._id 
            },config);
            
            socket.emit("new Message",data);
            console.log("new Message",data);
            setMessage((prevMessages) => {
           if (prevMessages.some((msg) => msg._id === data._id)) {
          return prevMessages; // Return the same state if message already exists
          }
          return [...prevMessages, data]; });
             markMessagesAsDelivered();

         } catch (error) {
            toast.error(
               <div>
                  <strong>Error</strong>:message not sent
               </div>,
                 {
          position: "top-left",
          autoClose: 3000,            // Time limit (3 seconds)
          hideProgressBar: true,     // Hide progress bar
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",             // Dark theme for error toasts
        }
            )
         }
      }
  }
  

// const typingHandler = (e) => {

//   setNewMessage(e.target.value);

//   if (!socketConnected) return;
   
//   if(!typing){
//       setTyping(true);
//       socket.emit("typing",selectedChat._id);
//   }
//    let typingTimeout;
//    clearTimeout(typingTimeout);
//    typingTimeout=new Date().getTime();
//    console.log("typingTimeout",typingTimeout);
//    var timeLimit=3000;

//    setTimeout(()=>{
//          let currentTime=new Date().getTime();
//          let timeDiff=currentTime-typingTimeout;
//          console.log(timeDiff);
//          if(timeDiff>=timeLimit && typing){
//          setTyping(false);
//          socket.emit("stop typing",selectedChat._id);
//       }
//       },timeLimit);
      
   
   
// };

let typingTimeoutId; // Store the timeout ID outside the handler to persist between calls

const typingHandler = (e) => {
  setNewMessage(e.target.value);

  if (!socketConnected) return;

  // Emit "typing" event when the user starts typing
  if (!typing) {
    setTyping(true);
    socket.emit("typing", selectedChat._id);
  }

  // Clear the previous timeout (if any)
  if (typingTimeoutId) {
    clearTimeout(typingTimeoutId);
  }

  // Set a new timeout to emit "stop typing" after 3 seconds of inactivity
  const timeLimit = 3000;
  typingTimeoutId = setTimeout(() => {
    setTyping(false);
    socket.emit("stop typing", selectedChat._id);
  }, timeLimit);
};

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
      display={{base:"flex",md:"none"}}
      style={{
         justifyItems:"center",
         backgroundColor:"gray",
         color:"black",
         padding:"8px",
         fontSize:"large",
         borderRadius:"5px"
      }}
      onClick={()=>handleBack()}
      >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
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
         <UpdateGroupChatModal
         fetchAgain={fetchAgain}
         setFetchAgain={setFetchAgain}
         fetchMessage={fetchMessage}
         />
         </>
      )}
      </Text>
      <Box
      display="flex"
      flexDir="column"
      justifyContent="flex-end"
      bg="#E8E8E8"
      w="100%"
      h="100%"
      borderRadius="1g"
      overflowY="hidden"
      >
      {
      loading?(
         <div className="spinner-border" role="status"
         style={{
         margin:"auto",
         marginLeft:"50%",
         marginTop:"30%",
         boxSizing:"initial"
  }}
         >
         <span className="sr-only">Loading...</span>
         </div>
      ):(
      <>
         <div className='message'>
             <ScrollableChat messages={message} />
         </div>
         <Box>
            <Form>
         {isTyping?<TypingIndicator/>:<></>}
         <Box display="flex" alignItems="center" gap={2}>
         <Form.Control
            onKeyDown={(e) => sendMessage(e)}
            placeholder="Enter message"
            style={{
               background: "#E0E0E0",
               flex: "1",  
               padding: "10px",
               borderRadius: "5px",
            }}
            onChange={(e) => typingHandler(e)}
            value={newMessage}
         />
         <Box style={{
            padding: "10px 15px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
         }}
         margin="none"
         onClick={(e)=>sendMessage(e)}
         >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
</svg>
         </Box>
      </Box>
         </Form>
         </Box>
      </>
            
      )
      }
      </Box>
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
