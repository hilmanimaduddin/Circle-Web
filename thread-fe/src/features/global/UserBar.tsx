import { Box, Button, Image, Text } from "@chakra-ui/react";
import { API } from "../../lib/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../stores/types/rootState";
import { useSelector } from "react-redux";

export function UserBar() {
  const [data, setData] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.user);
  async function FetchUser() {
    try {
      const data = await API.get(`/auth`);
      setData(data.data);
    } catch (err) {
      console.log("error", err);
    }
  }

  const dataFilter = data.filter((prop) => prop.id !== user.id);

  useEffect(() => {
    FetchUser();
  }, []);
  return (
    <>
      <Box
        border="2px"
        borderColor="#2f2f2f"
        borderRadius="15px"
        margin={2}
        p={3}
      >
        <Text mb={2} fontSize={"2xl"} fontWeight={"bold"}>
          Suggested for You
        </Text>
        <Box>
          {dataFilter.map((prop, index) => (
            <UserProfile prop={prop} key={index} />
          ))}
        </Box>
      </Box>
    </>
  );
}

export function UserProfile(prop: any) {
  const props = prop.prop;

  const [isFollowed, setIsFollowed] = useState(Boolean);

  const [followed, setFollowed] = useState("");

  async function GetFollow() {
    try {
      const followed = await API.get(`/followed/${props.id}`);
      setFollowed(followed.data);
    } catch (err) {
      console.log("error", err);
    }
  }

  useEffect(() => {
    if (followed === null) {
      setIsFollowed(false);
    } else {
      setIsFollowed(true);
    }
  }, [followed]);

  useEffect(() => {
    GetFollow();

    if (followed === "") {
      setIsFollowed(false);
    } else {
      setIsFollowed(true);
    }
  }, []);

  function handleFollow() {
    try {
      if (!isFollowed) {
        const response = API.post("/follow", { followed_user_id: props.id });
        console.log("add", response);
      } else {
        const response = API.delete(`/follow/${props.id}`);
        console.log(response);
      }
      setIsFollowed(!isFollowed);
    } catch (err) {
      console.log("error ni", err);
    }
  }
  return (
    <>
      <Box
        display="flex"
        gap="10px"
        mb="10px"
        borderBottom={"2px"}
        borderColor="#2f2f2f"
        pb={2}
      >
        <Image
          borderRadius="full"
          boxSize="50px"
          objectFit="cover"
          src={
            props?.profile_picture ??
            "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg"
          }
          alt="image"
        />

        <Box display="flex" justifyContent={"space-between"} w={"100%"}>
          <Link to={`/profil/user/${props?.id}`}>
            <Box display="flex" gap="10px">
              {/* <Text>{props.id}</Text> */}
              <Text>{props?.full_name}</Text>
              <Text color={"#6f6f6f"} fontStyle={"italic"}>
                @{props?.username}
              </Text>
            </Box>
            <Text>
              {props?.profile_description ?? "Ini tu belom ada deskripsi..."}
            </Text>
          </Link>
          <Box>
            <Button
              borderRadius={50}
              bg={"none"}
              border={"2px"}
              borderColor={"#2f2f2f"}
              onClick={handleFollow}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
