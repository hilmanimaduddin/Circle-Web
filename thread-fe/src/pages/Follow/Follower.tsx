import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FollowPage from "../../features/Follow/FollowPage";
import { RightBarFollow } from "../../features/thread/component/RightBarFollow";
import { SideBar } from "../../features/thread/component/SideBar";
import { API } from "../../lib/api";

export function Follower() {
  interface IFollowerUser {
    id: number;
    email: string;
    full_name: string;
    username: string;
    profile_picture: string;
    profile_description: string;
  }
  interface IGetFollow {
    id: number;
    follower: IFollowerUser;
    followed: IFollowerUser;
  }
  const [data, setData] = useState<IGetFollow[]>([]);

  async function GetFollow() {
    try {
      const follower = await API.get(`/follower`);
      setData(follower.data);
    } catch (err) {
      console.log("error", err);
    }
  }

  let sizeHeight = "";

  if (data.length < 5) {
    sizeHeight = "100vh";
  } else {
    sizeHeight = "fit-content";
  }

  useEffect(() => {
    GetFollow();
  }, []);

  return (
    <>
      <Grid h="fit-content" templateColumns="repeat(10, 1fr)" gap={4}>
        <GridItem colSpan={2}>
          <SideBar />
        </GridItem>
        <GridItem
          colSpan={5}
          h={sizeHeight}
          borderEnd="2px"
          borderLeft="2px"
          borderColor="#2f2f2f"
          p={5}
        >
          <FollowPage data={data} />
        </GridItem>
        <GridItem colSpan={3}>
          <RightBarFollow />
        </GridItem>
      </Grid>
    </>
  );
}
