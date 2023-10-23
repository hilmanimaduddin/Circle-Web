import { Box, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types/rootState";

export function ProfileUser() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Box
          p={4}
          border={"2px"}
          borderRadius={9}
          borderColor="#2f2f2f"
          display={"flex"}
          flexDirection={"column"}
        >
          <Image
            src={
              user.profile_background ??
              "https://i.vimeocdn.com/video/1118803646-cf91319cca62e75b948f598e639f3a7e1e295d7bf007d09df37b778ed32683a4-d_640x360.jpg"
            }
            alt=""
          />
          <Image
            borderRadius="full"
            boxSize="140px"
            mt={"-80px"}
            ml={"7%"}
            objectFit={"cover"}
            src={
              user.profile_picture ??
              "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg"
            }
            alt="profil"
          />
          <Text>{user.full_name}</Text>
          <Text>@{user.username}</Text>
          <Text>{user.email}</Text>
          <Text>{user.profile_description}</Text>
        </Box>
      </Box>
    </>
  );
}
