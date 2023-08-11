import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import Data from "../../../src/utils/threads.json";
import { RightBar } from "../../features/thread/component/RightBar";
import { SideBar } from "../../features/thread/component/SideBar";
import { ThreadCardType } from "../../types/Threads/Threads";
import API from "../../lib/api";

export function Blog() {
  const { id } = useParams();

  const [thread, setThread] = useState<ThreadCardType[]>([]);

  async function fetchData() {
    try {
      const res = await API.get("/");
      setThread(res.data);
    } catch (error) {
      console.error("yfdyued");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const prop = thread.find((props) => props.id == id);

  const [likesCount, setLikedCount] = useState(prop?.liked || 0);
  const [isLikes, setIsLiked] = useState(prop?.is_liked || false);

  const handleLike = () => {
    if (isLikes) {
      setLikedCount(likesCount - 1);
    } else {
      setLikedCount(likesCount + 1);
    }
    setIsLiked(!isLikes);
  };

  return (
    <>
      <Grid h="fit-content" templateColumns="repeat(10, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <SideBar />
        </GridItem>
        <GridItem
          colSpan={5}
          borderEnd="2px"
          borderLeft="2px"
          borderColor="#2f2f2f"
          p={5}
        >
          <Box mb={4}>
            <Text fontSize={30}>Home</Text>
            <Box display="flex" gap="10px">
              <Image
                borderRadius="full"
                boxSize="30px"
                objectFit="cover"
                src="https://cdn1.katadata.co.id/media/images/thumb/2021/10/06/Kucing_Bengal-2021_10_06-10_17_15_ad40e6fefe890f0db85dd31bd4d5d0c9_960x640_thumb.jpg"
                alt="image"
              />
              <Input type="text" placeholder="What is happening?" />
              <Button bgColor="#04a51e">Post</Button>
            </Box>
          </Box>
          <Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box width="100%">
                <Box key={id} display="flex" gap="10px" mb="10px" p={3}>
                  <Image
                    borderRadius="full"
                    boxSize="90px"
                    objectFit="cover"
                    src={prop?.user?.profile_picture}
                    alt="image"
                  />

                  <Box>
                    <Box display="flex" gap="10px">
                      <Text>{prop?.user?.full_name}</Text>
                      <Text>@{prop?.user?.username}</Text>
                      <Text>{prop?.posted_at}</Text>
                      <Text>{prop?.liked}</Text>
                      <Text>{prop?.user?.id}</Text>
                      <Text>{prop?.likes?.likes_count}</Text>
                    </Box>
                    <Text>{prop?.content}</Text>

                    <Button
                      bg="none"
                      variant="none"
                      onClick={handleLike}
                      leftIcon={isLikes ? <VscHeartFilled /> : <VscHeart />}
                    >
                      {likesCount} likes
                    </Button>
                    <Button bg="none" variant="none">
                      {prop?.replies_count} replies
                    </Button>
                  </Box>
                </Box>
                <Image src={prop?.image} alt="" />
              </Box>
            </Box>
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <RightBar />
        </GridItem>
      </Grid>
    </>
  );
}
