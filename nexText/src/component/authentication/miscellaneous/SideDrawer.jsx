import React, { useState } from 'react';
import { Box, Text, Input} from '@chakra-ui/react';
import { ChatState } from '../../../context/ChatProvider';
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import ProfileModel from './profileModel';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
import NotificationBadge, { Effect } from 'react-notification-badge'
import getSender from '../../../config/ChatLogic.js';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import ChatLoading from '../../ChatLoading.jsx';
import axios from 'axios';
import UserListItem from './../../UserListItem.jsx';
function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [open, setOpen] = useState(false);
  
  const navigate=useNavigate();
  const {user,setSelectedChat,chats,setChats,notification,setNotification}= ChatState();
    const logout=()=>{
    localStorage.removeItem("userInfo");
    navigate("/")
  }

  const handleSearch=async ()=>{
    setLoading(true);
    if(!search){
      toast.error(
        <div>
          <strong>Error:</strong> Search box is empty
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
      setLoading(false);
      return;
    }
     try {
      
      const config = {
        headers: {
      "Authorization": `Bearer ${user.token}`,
       },
      };
    console.log("search",)
    const data = await axios.get(
    `http://localhost:8000/app/user?search=${search}`,
      config
     );
     console.log("search data ",data);
     setSearchResult(data.data);   
      
     } catch (error) {
      toast.error(
        <div>
          <strong>Error:</strong>"faild to search user"
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
     setLoading(false);
      return;
  }

  const accessChat=async (userId)=>{
    try {
      setLoadingChat(true);
      const config = {
        headers:{
          "Authorization": `Bearer ${user.token}`,
          "content-type":"application/json"
        }
      }

      const {data}=await axios.post(`/app/chats`,{userId},config);
      console.log("data",data);
      if(!chats.find(chat=>chat._id===data._id)){setChats([data,...chats])}
      setSelectedChat(data);
      setLoadingChat(false);
      setOpen(false);
    } catch (error) {
      toast.error(
        <div>
          <strong>Error:</strong> Faild to access chat
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
      setLoadingChat(false);
      setOpen(false);
    }
  }

  const handleNotification=(notify)=>{
    if(notify){
      setSelectedChat(notify?.chat);
      setNotification(notification.filter(n=>n._id!==notify._id));
    }
      
  }
  return (
    <>
    <ToastContainer/>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        {/* Search Button */}
        <button
          type="button"
          className="btn btn-secondary"
          data-toggle="tooltip"
          title="Search user here"
          variant="ghost"
          style={{
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setOpen(true)}
        >
          <i className="fas fa-search"></i>
          <Text
            display={{ base: "none", md: "flex" }}
            px="1"
            style={{ margin: "auto" }}
          >
            Search user
          </Text>
        </button>

        {/* Nex-Text */}
        <Text fontSize="2xl" fontFamily="Work-sans">
          Nex-Text
        </Text>

        
         <div className="dropdown">
          <NotificationBadge
            count={notification.length}
            effect={Effect.SCALE}
          />
          <button
            className="btn btn-secondary"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          style={{backgroundColor:"white",border:"none",color:"black"}}
          >
            
            <i className="fas fa-bell">
              
            </i>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
             {
               notification.length===0?(
                  <li><button className="dropdown-item" type="button">No notification</button></li>
               ):null
             }
             {
                notification?.map((notify)=>{
                  return(
                    <li key={notify._id}>
                      <button className="dropdown-item" type="button" onClick={()=>handleNotification(notify)}>
                        {notify.chat?.isGroupChat?notify.chat?.chatName:getSender(user,notify.chat?.users)} 
                        </button>
                    </li>
                  )
                })
              }
          </ul>
            <button
              className="btn btn-secondary"
  type="button"
  id="dropdownMenuButton2"
  data-bs-toggle="dropdown"
  aria-expanded="false"
  style={{ backgroundColor: "white", border: "none", color: "black" }}
      >
            <AvatarGroup>
             <Avatar size="sm" name={user.name} />
            </AvatarGroup>
          </button> 
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
         <ProfileModel user={user}>
          <li><button className="dropdown-item" type="button">My profile</button></li>
         </ProfileModel>
         <li><button className="dropdown-item" type="button" onClick={logout}>Logout</button></li>
</ul>
        </div>

      </Box>
      <DrawerRoot 
      open={open} 
      onOpenChange={(e) => setOpen(false)}
      placement="left"
      
      >
   <DrawerBackdrop />
     <DrawerTrigger />
       <DrawerContent bg="white" >
       <DrawerCloseTrigger />
       <DrawerHeader borderBottomWidth="1px" >
        <h3>search user</h3>
     </DrawerHeader>
      <DrawerBody>
        <Box display="flex" pb={4} >
          <Input
          border="2px solid var"
          placeholder='search user'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />
          <button
          style={{marginLeft:"10px",border:"1px solid black", padding:"10px",backgroundColor:"gray",borderRadius:"5px"}}
          onClick={e=>handleSearch()}
          > 
            <i className="fas fa-search"/>
          </button>
        </Box>
         {
        loading?(<ChatLoading/>):
        (searchResult?.map((user)=>{
          return(
            <UserListItem key={user?._id} user={user} handleFunction={()=>{accessChat(user?._id)}} />
          )
        }))
      }
      {loadingChat && <ChatLoading/>}
      </DrawerBody>

    <DrawerFooter />
  </DrawerContent>
</DrawerRoot>
    </>
  );
}

export default SideDrawer;
