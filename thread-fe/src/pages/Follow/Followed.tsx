import { Box, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FollowPage from "../../features/Follow/FollowPage";
import { RightBarFollow } from "../../features/global/RightBarFollow";
import { SideBar } from "../../features/global/SideBar";
import SimpleSidebar from "../../features/global/sidebar/NewSideBar";
import { API } from "../../lib/api";

export function Followed() {
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
      const followed = await API.get(`/followed`);
      setData(followed.data);
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
          h={sizeHeight}
          colSpan={5}
          borderEnd="2px"
          borderLeft="2px"
          borderColor="#2f2f2f"
          p={5}
          // display={["none", "none", "none", "none", "block"]}
          w={["100%", "100%", "100%", "100%", "100%"]}
        >
          <FollowPage data={data} />
        </GridItem>
        <GridItem
          colSpan={3}
          display={["none", "none", "none", "block", "block"]}
          minW={"400px"}
        >
          <RightBarFollow />
        </GridItem>
      </Box>
    </>
  );
}
