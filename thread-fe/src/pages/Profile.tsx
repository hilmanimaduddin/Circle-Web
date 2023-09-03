import { Grid, GridItem, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RightBar, UserProfile } from "../features/thread/component/RightBar";
import { SideBar } from "../features/thread/component/SideBar";
import ThreadCard from "../features/thread/component/ThreadCard";
import { CreatePost } from "../features/thread/component/createPost";
import { useParams, Link } from "react-router-dom";
import { API } from "../lib/api";
import { ThreadCardType } from "../types/interface/IType";
import { useDispatch } from "react-redux";
import { THREAD_GET } from "../stores/rootReducer";
import { RootState } from "../stores/types/rootState";
import { useSelector } from "react-redux";
import { ProfileUser } from "../features/auth/component/profile";
import { VscHeart, VscHeartFilled, VscArrowLeft } from "react-icons/vsc";

export function Profile() {
  const [thread, setThread] = useState<ThreadCardType[]>([]);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  async function fetchData() {
    try {
      const res = await API.get(`/threadUser?user_id=${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      dispatch(THREAD_GET(res.data));
      setThread(res.data);
    } catch (error) {
      console.error("error");
    }
  }
  const prop = thread.find((props) => props.id == user.id);
  console.log(prop);

  //   const like = useSelector((state: RootState) => state.thread);
  //   console.log(like);

  useEffect(() => {
    fetchData();
  }, []);

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
            <Text>My Profile</Text>
          </Box>
          <Box>
            <ProfileUser />
          </Box>
          {thread.map((item, index) => {
            return (
              <ThreadCard
                key={index}
                id={item.id}
                author_picture={item.user?.profile_picture}
                author_full_name={item.user?.full_name}
                author_username={item.user?.username}
                posted_at={item.posted_at}
                content={item.content}
                image={item.image}
                replies_count={item.replies_count}
                likes_count={item.likes_count}
                likes={item.likes}
                liked={item.likes?.likes_count}
                date={item.date}
              />
            );
          })}
        </GridItem>
        <GridItem colSpan={3}>
          {/* <RightBar /> */}
          <Box
            border="2px"
            borderColor="#2f2f2f"
            borderRadius="15px"
            margin={2}
            p={3}
          >
            <Text mb={4}>Profile</Text>
            <UserProfile />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
