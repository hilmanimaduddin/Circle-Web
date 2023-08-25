import { Box, Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import GetReply from "../features/thread/component/GetReply";
import { AddReply } from "../features/thread/component/ReplyPost";
import { RightBar } from "../features/thread/component/RightBar";
import { SideBar } from "../features/thread/component/SideBar";
import { CreatePost } from "../features/thread/component/createPost";
import { useReply } from "../features/thread/hooks/useReply";
import { API } from "../lib/api";
import { ThreadCardType } from "../types/interface/IType";

export function Blog() {
  const { id } = useParams();

  const [thread, setThread] = useState<ThreadCardType[]>([]);

  const { reply } = useReply();

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

  // const { handleChange, postData } = useReply();

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
                      <Text>
                        {moment(prop?.posted_at).startOf("minute").fromNow()}
                      </Text>
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
                <Image src={prop?.image as string} alt="" />
              </Box>
            </Box>
          </Box>
          <Box>
            <AddReply />
          </Box>
          {reply.map((item, index) => {
            return (
              <GetReply
                key={index}
                username={item.user?.username}
                full_name={item.user?.full_name}
                posted_at={item.posted_at}
                profile_picture={item.user?.profile_picture}
                content={item.content}
              />
            );
          })}
        </GridItem>
        <GridItem colSpan={3}>
          <RightBar />
        </GridItem>
      </Grid>
    </>
  );
}
