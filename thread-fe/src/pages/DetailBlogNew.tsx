import { Box, Button, GridItem, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { VscArrowLeft, VscHeart, VscHeartFilled } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RightBar } from "../features/global/RightBar";
import { SideBar } from "../features/global/SideBar";
import SimpleSidebar from "../features/global/sidebar/NewSideBar";
import { ReplyNew } from "../features/thread/component/reply/ReplyPostNew";
import { API } from "../lib/api";
import { RootState } from "../stores/types/rootState";
import { ThreadCardType } from "../types/interface/IType";

export function DetailBlog() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.user);
  console.log(id);

  const [thread, setThread] = useState<ThreadCardType>();
  const [likee, setLikee] = useState<any[]>([]);

  // const { reply } = useReply();

  async function fetchData() {
    try {
      const res = await API.get(`/thread/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setThread(res.data);
    } catch (error) {
      console.error({ error: "salah ya ni" });
    }
  }

  const getLike = async () => {
    try {
      const res = await API.get(`/like/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setLikee(res.data);
    } catch (error) {
      console.error("error");
    }
  };

  useEffect(() => {
    fetchData();
    getLike();
  }, []);

  const filter = likee.find((prop) => prop.thread.id == id);

  let likeLength = Array.isArray(thread?.likes) ? thread?.likes.length : 0;

  const likeIs = filter?.id !== undefined;

  const [likesCount, setLikedCount] = useState(Number);
  const [isLikes, setIsLiked] = useState(Boolean);

  useEffect(() => {
    if (likeIs === false) {
      setIsLiked(false);
    } else if (likeIs === true) {
      setIsLiked(true);
    }
  }, [likeIs]);

  useEffect(() => {
    setLikedCount(likeLength as number);
  }, [likeLength]);

  function handleLike() {
    try {
      if (!isLikes) {
        setLikedCount(likesCount + 1);
        const response = API.post("/like", { thread_id: id });
        console.log("add", response);
      } else {
        setLikedCount(likesCount - 1);
        const response = API.delete(`/like/${id}`);
        console.log(response);
      }
      setIsLiked(!isLikes);
    } catch (err) {
      console.log("error ni", err);
    }
  }

  // const { handleChange, postData } = useReply();

  return (
    <>
      <Box display={{ base: "block", sm: "block", md: "none" }}>
        <SimpleSidebar />
      </Box>
      <Box display={"flex"} h="fit-content" gap={4}>
        <GridItem
          colSpan={2}
          display={{ base: "none", sm: "none", md: "block" }}
          minW={"200px"}
        >
          <SideBar />
        </GridItem>
        <GridItem
          colSpan={5}
          borderEnd="2px"
          borderLeft="2px"
          borderColor="#2f2f2f"
          p={5}
          // display={["none", "none", "none", "none", "block"]}
          w={["100%", "100%", "100%", "100%", "100%"]}
        >
          <Box
            fontSize="40px"
            fontWeight="medium"
            display={"flex"}
            gap={3}
            alignItems={"center"}
          >
            <Link to={`/`}>
              <VscArrowLeft />
            </Link>
            <Text>Status</Text>
          </Box>
          <Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box width="100%">
                <Box key={id} display="flex" gap="10px" mb="10px" p={3}>
                  <Image
                    borderRadius="full"
                    boxSize="90px"
                    objectFit="cover"
                    src={thread?.user?.profile_picture as string}
                    alt="image"
                  />

                  <Box>
                    <Box display="flex" gap="10px">
                      <Link to={`/profil/user/${thread?.user?.id}`}>
                        <Text>{thread?.user?.full_name}</Text>
                      </Link>
                      <Text color={"#6f6f6f"} fontStyle={"italic"}>
                        @{thread?.user?.username}
                      </Text>
                      <Text>
                        {moment(thread?.posted_at).startOf("minute").fromNow()}
                      </Text>
                    </Box>
                    <Text>{thread?.content}</Text>
                    <Button
                      bg="none"
                      variant="none"
                      onClick={handleLike}
                      leftIcon={isLikes ? <VscHeartFilled /> : <VscHeart />}
                    >
                      {likesCount} likes
                    </Button>
                    {/* <Button bg="none" variant="none">
                      {thread?.replies_count} replies
                    </Button> */}
                  </Box>
                </Box>
                <Image src={thread?.image as string} alt="" />
              </Box>
            </Box>
          </Box>
          <Box>
            <ReplyNew />
          </Box>
        </GridItem>
        <GridItem
          colSpan={3}
          display={["none", "none", "none", "block", "block"]}
          minW={"400px"}
        >
          <RightBar />
        </GridItem>
      </Box>
    </>
  );
}
