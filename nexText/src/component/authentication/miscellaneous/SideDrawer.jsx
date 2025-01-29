import React, { useState } from 'react';
import { Box, Text, Input} from '@chakra-ui/react';
import { ChatState } from '../../../context/ChatProvider';
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import ProfileModel from './profileModel';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify";
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

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [open, setOpen] = useState(false);
  
  const navigate=useNavigate();
  const {user}= ChatState();
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
          <button
            className="btn btn-secondary"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          style={{backgroundColor:"white",border:"none",color:"black"}}
          >
            <i className="fas fa-bell"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><button className="dropdown-item" type="button">Action</button></li>
            <li><button className="dropdown-item" type="button">Another action</button></li>
            <li><button className="dropdown-item" type="button">Something else here</button></li>
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
            <button 
            style={{border:"2px solid black",backgroundColor:"white",width:"100%",marginBottom:"10px"}}
            >
              <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            borderBottomWidth="1px"
            key={user._id}
            >
              <Avatar name={user.name} src={user.pic} size="sm"/>
              <Text>{user.name}</Text>
            </Box>
            </button>
          )
        }))
      }
      </DrawerBody>
    <DrawerFooter />
  </DrawerContent>
</DrawerRoot>
    </>
  );
}

export default SideDrawer;
