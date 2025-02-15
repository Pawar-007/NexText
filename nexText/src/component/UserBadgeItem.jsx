import React from 'react'
import { Box } from '@chakra-ui/react'
function UserBadgeItem({user,handleFunction}) {
  return (
    <Box
    px={2}
    py={2}
    borderRadius="7px"
    m={1}
    variant="solid"
    fontSize={12}
    cursor={'pointer'}
    color="white"
    backgroundColor="purple"
    onClick={handleFunction}
    >
      {user.name}
      <button type="button" class="btn-close" disabled aria-label="Close" 
      style={{marginLeft:"2px",color:"white"}}></button>
    </Box>
  )
}

export default UserBadgeItem
