import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API } from "../../lib/api";
import { RootState } from "../../stores/types/rootState";
import { UserType } from "../../types/interface/IType";

export function RightBar() {
  const user = useSelector((state: RootState) => state.user);

  const [data, setData] = useState<UserType[]>([]);

  const dataFilter = data.filter((props) => props.id !== user.id);

  async function fetchData() {
    try {
      const res = await API.get("/auth");
      setData(res.data);
    } catch (err) {
      console.log("error", err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

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
          src={
            user?.profile_picture ??
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"
          }
          alt="profil"
        />
        <Link to={`/profil`}>
          <Text>{user.full_name}</Text>
          <Text>@{user.username}</Text>
          <Text>{user.profile_description}</Text>
        </Link>
      </Box>
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
          {dataFilter.map((props, i) => (
            <UserProfile prop={props} key={i} />
          ))}
        </Box>
      </Box>
    </Box>
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
