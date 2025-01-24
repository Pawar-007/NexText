import { Box, Text } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';

import React from 'react'

function SideDrawer() {
  return (
    <>
    <div>
      
      <Box>
       <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom">
         <Text d={{base:"none",md:"flex"}}>
           search user
         </Text>
       </button>
      </Box>
    </div>
    </>
  )
}

export default SideDrawer;

