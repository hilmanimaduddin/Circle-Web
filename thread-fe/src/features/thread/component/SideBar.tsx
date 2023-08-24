import { Box, Button, Text } from "@chakra-ui/react";
import { FaHeart, FaHome, FaSearch, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../stores/types/rootState";
import { AUTH_LOGOUT } from "../../../stores/rootReducer";
import { useDispatch } from "react-redux";

export function SideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  function logOut() {
    // dispatch(AUTH_LOGOUT());
    localStorage.removeItem("token");
    navigate("/login");
  }
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
        <Button borderRadius={50} bgColor="#04a51e" onClick={logOut}>
          Log Out
        </Button>
      </Box>
    </Box>
  );
}
