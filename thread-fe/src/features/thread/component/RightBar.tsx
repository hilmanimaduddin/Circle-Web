import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import Data from "../../../utils/threads.json";
import { useParams } from "react-router-dom";
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
        <Text>{user.full_name}</Text>
        <Text>@{user.username}</Text>
        <Text>{user.profile_description}</Text>
      </Box>
      <Box
        border="2px"
        borderColor="#2f2f2f"
        borderRadius="15px"
        margin={2}
        p={3}
      >
        <Text>Suggested for You</Text>
        <Box>
          <ThreadCard />
        </Box>
      </Box>
    </Box>
  );
}

export function ThreadCard() {
  const [data, _] = useState(Data);
  console.log(data);
  return (
    <>
      {data.map((props, i) => (
        <Box key={i} display="flex" gap="10px" mb="10px">
          <Image
            borderRadius="full"
            boxSize="50px"
            objectFit="cover"
            src={props.user.profile_picture}
            alt="image"
          />

          <Box>
            <Box display="flex" gap="10px">
              <Text>{i}</Text>
              <Text>{props.user.full_name}</Text>
              <Text>@{props.user.username}</Text>
              <Text>{props.posted_at}</Text>
            </Box>
            <Text>{props.content}</Text>
            {/* <img style={{width}} src={props.image} alt="foto" /> */}
            <Button
              bg="none"
              variant="none"
              leftIcon={props.is_liked ? <VscHeartFilled /> : <VscHeart />}
            >
              {props.likes_count} likes
            </Button>
            <Button bg="none" variant="none">
              {props.replies_count} replies
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
}
