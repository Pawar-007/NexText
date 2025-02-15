import { Box, Text} from '@chakra-ui/react';
import {AvatarGroup,Avatar} from "@/components/ui/avatar"
function UserListItem({ user, handleFunction }) {
  return (
    <Box
      onClick={handleFunction}
      display="flex"
      _hover={{
        bgColor: "marun",
        border:"4px solid green",
        boxShadow: "lg",
      }}
      cursor="pointer"
      w="100%"
      alignItems="center"
      color="gray.700"
      bg="gray.50"
      px={2}
      py={0}
      mb={2}
      borderRadius="md"
      boxShadow="md"
      transition="all 0.2s ease-in-out"
    >
      <AvatarGroup mr={2}>
        <Avatar size="md" name={user.name} src={user.pic} />
      </AvatarGroup>
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {user.name}
        </Text>
        <Text fontSize="sm" color="gray.500">
          <b>Email: </b> {user.email}
        </Text>
      </Box>
    </Box>
  );
}

export default UserListItem;
