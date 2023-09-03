import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import Data from "../../../utils/threads.json";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUserCard } from "../hooks/useUserCard";
import { UserType } from "../../../types/interface/IType";
import { API } from "../../../lib/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types/rootState";

export function RightBar() {
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
        <Text>My Profile</Text>
        <Image
          borderRadius={5}
          height={"200px"}
          width={"100%"}
          objectFit={"cover"}
          src="https://i2.wp.com/blog.tripcetera.com/id/wp-content/uploads/2020/10/pulau-padar.jpg"
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
      <Box
        border="2px"
        borderColor="#2f2f2f"
        borderRadius="15px"
        margin={2}
        p={3}
      >
        <Text mb={2}>Suggested for You</Text>
        <Box>
          <UserProfile />
        </Box>
      </Box>
    </Box>
  );
}

export function UserProfile() {
  const [data, setData] = useState<UserType[]>([]);

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

  const [dataa, _] = useState(Data);
  const navigate = useNavigate();

  // console.log("usernya", dataa);

  // console.log(data);
  return (
    <>
      {data.map((props, i) => (
        <Box
          key={i}
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
              props.profile_picture ??
              "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg"
            }
            alt="image"
          />

          <Box>
            <Link to={`/profil/user/${props.id}`}>
              <Box display="flex" gap="10px">
                {/* <Text>{props.id}</Text> */}
                <Text>{props.full_name}</Text>
                <Text color={"#6f6f6f"} fontStyle={"italic"}>
                  @{props.username}
                </Text>
              </Box>
              <Text>
                {props.profile_description ?? "Ini tu belom ada deskripsi..."}
              </Text>
            </Link>
          </Box>
        </Box>
      ))}
    </>
  );
}
