import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

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

        {/* Notifications */}
        <div>
           <Menu>
        <MenuButton as="button">
          <i className="fas fa-bell"></i>
        </MenuButton>
        <MenuList>
          <MenuItem>Notification 1</MenuItem>
          <MenuItem>Notification 2</MenuItem>
        </MenuList>
      </Menu>
        </div>
      </Box>
    </>
  );
}

export default SideDrawer;
