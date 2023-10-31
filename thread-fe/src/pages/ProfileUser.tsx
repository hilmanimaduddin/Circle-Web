import { Box, GridItem, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { VscArrowLeft } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RightBarFollow } from "../features/global/RightBarFollow";
import { SideBar } from "../features/global/SideBar";
import { UserBar } from "../features/global/UserBar";
import SimpleSidebar from "../features/global/sidebar/NewSideBar";
import ThreadCardNew from "../features/thread/component/ThreadCardNew";
import { API } from "../lib/api";
import { THREAD_GET } from "../stores/rootReducer";
import { RootState } from "../stores/types/rootState";
import { UserType } from "../types/interface/IType";

export function ProfileUserData() {
  const [user, setUser] = useState<UserType[]>([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const threadd = useSelector((state: RootState) => state.thread.threads);
  const data = threadd.filter((item) => item.user?.id == id);
  const prop = user.find((props) => props.id == id);

  async function fetchDataUser() {
    try {
      const res = await API.get(`/auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error("error");
    }
  }

  async function fetchData() {
    try {
      // const res = await API.get(`/threadUser?user_id=${id}`, {
      const res = await API.get(`/thread`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      dispatch(THREAD_GET(res.data));
      // setThread(res.data);
    } catch (error) {
      console.error("error");
    }
  }

  useEffect(() => {
    fetchData();
    fetchDataUser();
  }, []);

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
            <Text>Other Profile</Text>
          </Box>
          <Box w={"100%"}>
            <Box w={"100%"} display={"flex"} justifyContent={"center"}>
              <Box
                w={"100%"}
                p={4}
                border={"2px"}
                borderRadius={9}
                borderColor="#2f2f2f"
                display={"flex"}
                flexDirection={"column"}
              >
                <Image
                  objectFit={"cover"}
                  h={"350px"}
                  src={
                    prop?.profile_background ??
                    "https://i.vimeocdn.com/video/1118803646-cf91319cca62e75b948f598e639f3a7e1e295d7bf007d09df37b778ed32683a4-d_640x360.jpg"
                  }
                  alt=""
                />
                <Image
                  borderRadius="full"
                  boxSize="140px"
                  mt={"-80px"}
                  ml={"7%"}
                  objectFit={"cover"}
                  src={
                    prop?.profile_picture ??
                    "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg"
                  }
                  alt="profil"
                />
                <Text>{prop?.full_name}</Text>
                <Text>@{prop?.username}</Text>
                <Text>{prop?.email}</Text>
                <Text>{prop?.profile_description}</Text>
              </Box>
            </Box>
          </Box>
          {data.map((item, index) => {
            return (
              <ThreadCardNew
                key={index}
                id={item.id}
                author_picture={item.user?.profile_picture}
                profile_background={item.user?.profile_background}
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
        <GridItem
          colSpan={3}
          display={["none", "none", "none", "block", "block"]}
          minW={"400px"}
        >
          <RightBarFollow />

          <UserBar />
        </GridItem>
      </Box>
    </>
  );
}
