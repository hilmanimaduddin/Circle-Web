import { Box, Button, Text } from "@chakra-ui/react";
import { FaHeart, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export function SideBar() {
  return (
    <Box>
      <Box fontSize={20} p={7} display="flex" flexDirection="column" gap={3}>
        <Text color="#04a51e" fontSize={45} fontWeight="bold">
          Circle
        </Text>

        <Text display="flex" gap={2} alignItems="center">
          <Link to={`/`}>
            <FaHome />
          </Link>
          <Link to={`/`}>Home</Link>
        </Text>
        <Text display="flex" gap={2} alignItems="center">
          <FaSearch /> Search
        </Text>
        <Text display="flex" gap={2} alignItems="center">
          <FaHeart /> Follow
        </Text>
        <Text display="flex" gap={2} alignItems="center">
          <FaUser /> Profile
        </Text>
        <Button borderRadius={50} bgColor="#04a51e">
          <Link to="/login">Create Post</Link>
        </Button>
      </Box>
    </Box>
  );
}
