import { Box, Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { RightBar } from "../features/thread/component/RightBar";
import { SideBar } from "../features/thread/component/SideBar";
import { API } from "../lib/api";
import { ThreadCardType } from "../types/IType";
import { CreatePost } from "../features/thread/component/createPost";

export function Blog() {
  const { id } = useParams();

  const [thread, setThread] = useState<ThreadCardType[]>([]);

  async function fetchData() {
    try {
      const res = await API.get("/thread/", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setThread(res.data);
    } catch (error) {
      console.error({ error: "salah ya ni" });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const prop = thread.find((props) => props.id == id);

  const [likesCount, setLikedCount] = useState(prop?.likes?.likes_count || 0);
  const [isLikes, setIsLiked] = useState(prop?.is_liked || false);
  console.log(prop);

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
          <CreatePost />
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
