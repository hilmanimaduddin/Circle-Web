import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { API } from "../../../lib/api";

export default function FollowCard(data: any) {
  const prop = data?.prop;

  const [isFollowed, setIsFollowed] = useState(Boolean);
  const [followed, setFollowed] = useState("");

  async function GetFollow() {
    try {
      const followed = await API.get(`/followed/${prop.id}`);
      setFollowed(followed.data);
    } catch (err) {
      console.log("error", err);
    }
  }
  useEffect(() => {
    GetFollow();
  }, []);

  function handleFollow() {
    try {
      if (!isFollowed) {
        const response = API.post("/follow", { followed_user_id: prop.id });
        console.log("add", response);
      } else {
        const response = API.delete(`/follow/${prop.id}`);
        console.log(response);
      }
      setIsFollowed(!isFollowed);
    } catch (err) {
      console.log("error ni", err);
    }
  }

  useEffect(() => {
    if (followed === null) {
      setIsFollowed(false);
    } else {
      setIsFollowed(true);
    }
  }, [followed]);

  return (
    <>
      <Box marginBlock={2}>
        <Box border={"2px"} borderRadius={"xl"} borderColor="#2f2f2f" p={3}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display={"flex"} gap={3} alignItems={"center"}>
              <Box>
                <Image
                  boxSize={"50px"}
                  borderRadius={"full"}
                  src={
                    prop?.profile_picture ??
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
                  }
                  alt=""
                />
              </Box>
              <Box>
                <Text>{prop?.full_name}</Text>
                <Text>@{prop?.username}</Text>
                <Text>{prop?.profile_description ?? "Akun Baru"}</Text>
              </Box>
            </Box>
            <Box>
              <Button onClick={handleFollow}>
                {isFollowed ? "Unfollow" : "Follow"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
