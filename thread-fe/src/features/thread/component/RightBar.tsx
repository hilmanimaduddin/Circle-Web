import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import Data from "../../../utils/threads.json";

export function RightBar() {
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
          src="https://awsimages.detik.net.id/community/media/visual/2023/05/10/ilustrasi-kucing-1_169.jpeg?w=600&q=90"
          alt="profil"
        />
        <img src="" alt="" />
        <Text>Hilman Imaduddin</Text>
        <Text>@hielmannn</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          culpa harum impedit, vitae exercitationem soluta aliquid incidunt
          optio porro ratione!
        </Text>
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
