import { Box, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../stores/types/rootState";

export function RightBarFollow() {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Box>
      <Box
        border="2px"
        borderColor="#2f2f2f"
        borderRadius="15px"
        margin={2}
        p={3}
      >
        <Text fontSize={"2xl"} fontWeight={"bold"} mb={2}>
          My Profile
        </Text>
        <Image
          borderRadius={5}
          height={"200px"}
          width={"100%"}
          objectFit={"cover"}
          src={
            user.profile_background ??
            "https://i2.wp.com/blog.tripcetera.com/id/wp-content/uploads/2020/10/pulau-padar.jpg"
          }
          alt=""
        />
        <Image
          borderRadius="full"
          boxSize="100px"
          mt={"-14"}
          ml={4}
          objectFit={"cover"}
          src={user.profile_picture}
          alt="profil"
        />
        <Link to={`/profil`}>
          <Text>{user.full_name}</Text>
          <Text>@{user.username}</Text>
          <Text>{user.profile_description}</Text>
        </Link>
      </Box>
    </Box>
  );
}
