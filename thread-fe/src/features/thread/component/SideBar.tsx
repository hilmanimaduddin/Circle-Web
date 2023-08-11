import { Box, Button, Text, Image, Flex } from "@chakra-ui/react";
import { FaHome, FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export function SideBar() {
  return (
    <Box>
      <Box fontSize={20} p={7} display="flex" flexDirection="column" gap={3}>
        <Text color="#04a51e" fontSize={50} fontWeight="bold">
          circle
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
