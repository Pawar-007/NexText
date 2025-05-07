import { Box, Input } from '@chakra-ui/react';
import React,{useState} from 'react'
import { Modal, Button, FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ChatProvider, { ChatState } from '../../../context/ChatProvider.jsx';
import { Await } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserListItem from './../../UserListItem.jsx';
import UserBadgeItem from '../../UserBadgeItem.jsx';
function GroupChatModel({children}) {
  const [show, setShow] = useState(false);
  const [groupChatName,setGroupChatName]=useState('');
  const [selectedUsers,setSelectedUsers]=useState([]);
  const [search,setSearch]=useState('');
  const [searchResult,setSearchResult]=useState([]);
  const [loading,setLoading]=useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    
  const {user,chats,setChats}=ChatState();

  const handleSearch=async (query)=>{
       setSearch(query);
       if(!query){
        return;
       }
       try {
        setLoading(true);
        const config={
          headers:{
            "Authorization": `Bearer ${user.token}`,
          }
        }

        const {data}=await axios.get(`/app/user?search=${query}`,config);
      
        setLoading(false);
        setSearchResult(data);
       } catch (error) {
        setLoading(false);
        toast.error(
        <div>
          <strong>Error:</strong> Faild to access chat
        </div>,
        {
          position: "top-center",
          autoClose: 1000,            // Time limit (3 seconds)
          hideProgressBar: true,     // Hide progress bar
          closeOnClick: true,
          draggable: true,
          theme: "dark",             // Dark theme for error toasts
        }
      )
     
       }
  }
  const handleSubmit=async()=>{
        if(!groupChatName || !selectedUsers){
          toast.warning(
             <div>
            fill all requirement
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
          return;
        }

        try {
          const config={
            headers:{
            "Authorization": `Bearer ${user.token}`,
          }
          }

          const {data}=await axios.post(`/app/chats/group`,{
            name:groupChatName,
            users:selectedUsers?.map(u=>u._id)
          },config);

          setChats([data,...chats]);
          handleClose();
          setSelectedUsers([]);
          toast.success(
             <div>
            group successfully created
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
        } catch (error) {
           toast.error(
             <div>
              {console.log(error.response.data)}
            faild to create group
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
        }
  }
  const handleGroup=(userToAdd)=>{
       if(selectedUsers?.includes(userToAdd)){
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
      setSelectedUsers([...selectedUsers,userToAdd]);

  }
   
  const handleDelete=(delUser)=>{
      setSelectedUsers(
        selectedUsers.filter((sel)=>sel._id !== delUser._id)
      )
  }

  return (
    <>
      {children ? (
        <span onClick={handleShow} style={{ cursor: 'pointer' }}>
          {children}
        </span>
      ) : (
        <i className="fas fa-bell" onClick={handleShow} style={{ cursor: 'pointer' }}></i>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton
        >
          <Modal.Title
          style={{  fontSize:"35px",
        fontStyle:"work sans",
        d:"flex",
        justifyContent:"center"}}>create group Chats</Modal.Title>
        </Modal.Header>
        <Modal.Body
        style={{display:"flex",flexDirection:"column"}} 
        >
          <Form.Text
          style={{fontSize:"20px",fontFamily:"work sans"}}
          >Enter Chat Name</Form.Text>
         <input
         placeholder="Group chat name"
         style={{
          width:"100%",
          border:"2px solid black",
          borderRadius:"5px",
          height:"40px",
          backgroundColor:"white",
          fontFamily:"work sans",
          fontSize:"20px"

         }}
         
        onChange={(e) => {setGroupChatName(e.target.value)}}
       />

       <Form.Text
          style={{fontSize:"20px",fontFamily:"work sans",marginTop:"20px"}}
          >Search for users</Form.Text>
        <input
         placeholder="Group chat name"
         style={{
          width:"100%",
          border:"2px solid black",
          borderRadius:"5px",
          height:"40px",
          backgroundColor:"white",
          fontFamily:"work sans",
          fontSize:"20px"

         }}
         
        onChange={(e) => {handleSearch(e.target.value)}}
       />

      <Box width="100%" display="flex" flexWrap="wrap">
         {
        selectedUsers?.map(user=>(
          <UserBadgeItem
          key={user._id}
          user={user}
          handleFunction={()=>{handleDelete(user)}}
          />
        ))
       }
      </Box>

       {
        loading?
        <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
     </div>
        :(
           searchResult?.slice(0,3).map(user=>(
          
            <Box
            style={{marginTop:"5px"}}
            >
                <UserListItem
               key={user?._id} 
               user={user}
               handleFunction={()=>{handleGroup(user) }}
            />
            </Box>
          
           ))
        )
       }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmit}>
            Create Chat
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GroupChatModel
