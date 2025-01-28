import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { ChatState } from '../../../context/ChatProvider';
import { Avatar, AvatarGroup } from "@/components/ui/avatar"
import ProfileModel from './profileModel';
function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {user}= ChatState();
  return (
    <>
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
         <ProfileModel>
          <li><button className="dropdown-item" type="button">My profile</button></li>
         </ProfileModel>
         <li><button className="dropdown-item" type="button">Logout</button></li>
</ul>
        </div>

      </Box>
    </>
  );
}

export default SideDrawer;
