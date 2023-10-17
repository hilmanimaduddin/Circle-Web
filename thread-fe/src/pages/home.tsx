import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RightBar } from "../features/thread/component/RightBar";
import { SideBar } from "../features/thread/component/SideBar";
import ThreadCard from "../features/thread/component/ThreadCard";
import { CreatePost } from "../features/thread/component/createPost";
import { API } from "../lib/api";
import { ThreadCardType } from "../types/interface/IType";
import { useDispatch } from "react-redux";
import { THREAD_GET } from "../stores/rootReducer";
import { RootState } from "../stores/types/rootState";
import { useSelector } from "react-redux";
import { useThreadCard } from "../features/thread/hooks/useThreadCard";

export function Home() {
  const dispatch = useDispatch();

  const [getData, setGetData] = useState<ThreadCardType[]>([]);

  const { fetchData, coba } = useThreadCard();

  // async function fetchData() {
  //   try {
  //     const res = await API.get("/thread/", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.token}`,
  //       },
  //     });
  //     dispatch(THREAD_GET(res.data));
  //   } catch (error) {
  //     console.error("error");
  //   }
  // }
  const thread = useSelector((state: RootState) => state.thread.threads);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setGetData(thread);
    console.log("getDataaaa", getData);
  }, [coba]);
  console.log("getData", getData);

  // const daa = thread.filter((ddd) => ddd.user?.id == 3);
  console.log("coba", thread);

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
          {thread.map((item, index) => {
            return (
              <ThreadCard
                key={index}
                id={item.id}
                author_picture={item.user?.profile_picture}
                author_full_name={item.user?.full_name}
                author_username={item.user?.username}
                posted_at={item.posted_at}
                author_id={item.user?.id}
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
          <RightBar />
        </GridItem>
      </Grid>
    </>
  );
}
