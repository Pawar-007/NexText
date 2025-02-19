import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap'
import { ChatState } from '../../../context/ChatProvider.jsx';
import { Box } from '@chakra-ui/react';
import UserBadgeItem from '../../UserBadgeItem.jsx';
import {Form} from 'react-bootstrap'
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import UserListItem from '../../UserListItem.jsx';
function UpdateGroupChatModal({fetchAgain,setFetchAgain}) {
  const [show, setShow] = useState(false);
  const [groupChatName,setGroupChatName]=useState();
  const [searchReasult,setSearchReasult]=useState();
  const [search,setSearch]=useState();
  const [loading,setloading]=useState(false);
  const [renameLoading,setRenameLoading]=useState(false);
  const [newMember,setNewMember]=useState([]);
  const [addLoading,setAddLoading]=useState(false);
  const {selectedChat,setSelectedChat,user}=ChatState();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRemove=(u)=>{}
  
  const handleSearch=async (query)=>{
       setSearch(query);
       if(!query){
        return;
       }
       console.log(query);
       try {
        setloading(true);
        const config={
          headers:{
            "Authorization": `Bearer ${user.token}`,
          }
        }

        const {data}=await axios.get(`/app/user?search=${query}`,config);
        console.log(data);
        setloading(false);
        setSearchReasult(data);
       } catch (error) {
        setloading(false);
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
          theme: "dark",               // Dark theme for error toasts
        }
      )
     
       }
  }

  const handleRename=async ()=>{
      if(!groupChatName) return;

      try {
        setRenameLoading(true);
        const config={
          headers:{
            "Authorization": `Bearer ${user.token}`
          }
        }
        const {data}=await axios.put("/app/chats/rename",{
          chatId:`${selectedChat._id}`,
          chatName:`${groupChatName}`
        },config);
        console.log("data",data);
        setSelectedChat(data);
        
        setRenameLoading(false);
      } catch (error) {
        setRenameLoading(false);
        console.error("Rename Chat Error:", error.response?.data || error.message);
        toast.warning(
          <div>
          <strong>Warning:</strong>"faild to update name"
         </div>,
        {
          position: "top-center",
          autoClose: 2000,            
          hideProgressBar: true,    
          closeOnClick: true,
          draggable: true,
          theme: "dark",            
        }
        )
      }
    setGroupChatName('');

  }
  const handleGroup=(user1)=>{
    console.log(user);
        if(selectedChat.groupAdmin._id !== user._id){
            toast.warning(
          <div>
            Only admin can add somone!
          </div>,
          {
          position: "top-center",
          autoClose: 2000,            // Time limit (3 seconds)
          hideProgressBar: true,     // Hide progress bar
          closeOnClick: true,
          draggable: true,
          theme: "dark",             // Dark theme for error toasts
        }
        )
        return;
        }
        if(selectedChat.users.some(u=> u._id===user1._id)){
          toast.warning(
          <div>
            user is allredy present in group chat
          </div>,
          {
          position: "top-center",
          autoClose: 2000,            // Time limit (3 seconds)
          hideProgressBar: true,     // Hide progress bar
          closeOnClick: true,
          draggable: true,
          theme: "dark",             // Dark theme for error toasts
        }
        )
        return;
        }
        else if(newMember.some(u => u._id === user1._id)){
          toast.warning(
          <div>
            user is allredy selected
          </div>,
          {
          position: "top-center",
          autoClose: 2000,            // Time limit (3 seconds)
          hideProgressBar: true,     // Hide progress bar
          closeOnClick: true,
          draggable: true,
          theme: "dark",             // Dark theme for error toasts
        }
        )
        return;
        }

        setNewMember([...newMember,user1]);
  }
   const handleDelete=(user)=>{
    console.log(newMember);
        setNewMember(newMember.filter((u)=>u._id!==user._id));
   }
    
   const addMenberInGroup=async()=>{
    if(!newMember) return;
    try {
      setAddLoading(true);
      const config={
        headers:{
          "Authorization": `Bearer ${user.token}`,
        }
      }
      const newUserIds=newMember?.map((u)=>u._id);
      const {data}=await axios.put("/app/chats/addIngroup",{
        chatId:selectedChat._id ,
        userIds:newUserIds
      },config);
      
      setSelectedChat(data);
      setNewMember('');

    } catch (error) {
      console.log(error);
      toast.error(
        <div>
          <strong>error</strong> member not added
        </div>,{
          
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
      setAddLoading(false);
    }
   }
  return (
    <>
    <ToastContainer/>
      <Button onClick={handleShow}
      style={{backgroundColor:"gray",border:"none",}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
       </svg>  
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title
          style={{
            fontFamily:"work sans",
            fontSize:"35px",
            justifyContent:"center",
            display:"flex"
          }}
          >{selectedChat.chatName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box
          w="100%" display="flex" flexWrap="wrap" pb={3}
          >
            {selectedChat?.users.map((u)=>(
          <UserBadgeItem
          key={u._id}
          user={u}
          handleFunction={()=>{handleRemove(u)}}
          />
            ))}
          </Box>
      <Form style={{display:"flex", flexDir:"coloum", flexWrap:"wrap",justifyContent:"space-between"}}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"
      style={{
        border:"1px solid black",
        borderRadius:"5px",

      }}
      >
        <Form.Control type="text"
         placeholder="enter group new name"
         value={groupChatName} 
         onChange={(e)=>(setGroupChatName(e.target.value))}
         style={{width:"100%"}}
         />
      </Form.Group>
       <Button variant="success" style={{height:"100%"}}
       onClick={()=>(handleRename())}
       >{renameLoading?(
        <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
      </div>
       ):("update")}</Button>
    
       {
        selectedChat.groupAdmin._id===user._id?(
           <input
         placeholder="Search users "
         style={{
          width:"100%",
          border:"2px solid black",
          borderRadius:"5px",
          height:"40px",
          backgroundColor:"white",
          fontFamily:"work sans",
          fontSize:"20px"

         }}
         value={search}
         onChange={(e) => {handleSearch(e.target.value)}}
       />
        ):''
       }
       
      <Box width="100%" display="flex" flexWrap="wrap">
         {
        newMember?.map(user=>(
          <UserBadgeItem
          key={user._id}
          user={user}
          handleFunction={()=>{handleDelete(user)}}
          />
        ))
       }
      </Box>
       <Box       
       width="100%"
       margin='10px'
       >
         {
        loading?(
          <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
           </div>
        ):(
          searchReasult?.map((user)=>(
             <UserListItem
             key={user._id}
             user={user}
             handleFunction={()=>handleGroup(user)}
             />
          ))
        )
       }
       </Box>
       <Box onClick={()=>addMenberInGroup()}>add</Box>
    </Form>
          
          </Modal.Body>
        <Modal.Footer>
          <Button  onClick={()=>handleRemove(user)}
            style={{
              backgroundColor:"red",
              border:"none",

            }}
            >
            Leave group
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateGroupChatModal;
