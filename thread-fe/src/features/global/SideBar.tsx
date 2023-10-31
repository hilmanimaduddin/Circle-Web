import { Box, Button, Text } from "@chakra-ui/react";
import { FaHeart, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_LOGOUT } from "../../stores/rootReducer";

export function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logOut() {
    dispatch(AUTH_LOGOUT());
    navigate("/login");
  }
  return (
    <Box>
      <Box fontSize={20} p={7} display="flex" flexDirection="column" gap={3}>
        <Text color="#04a51e" fontSize={45} fontWeight="bold">
          Circle
        </Text>
        <Link to={`/`}>
          <Text display="flex" gap={2} alignItems="center">
            <FaHome /> Home
          </Text>
        </Link>
        <Text display="none" gap={2} alignItems="center">
          <FaSearch /> Search
        </Text>
        <Link to={`/follower`}>
          <Text display="flex" gap={2} alignItems="center">
            <FaHeart /> Follow
          </Text>
        </Link>
        <Link to={`/profil`}>
          <Text display="flex" gap={2} alignItems="center">
            <FaUser /> Profile
          </Text>
        </Link>
        {/* <Button borderRadius={50} bgColor="#04a51e">
          <Link to="/login">Create Post</Link>
        </Button> */}
        <Button borderRadius={50} bgColor="#04a51e" onClick={logOut}>
          Log Out
        </Button>
      </Box>
    </Box>
  );
}
