import { Box, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import FollowCard from "./component/FollowCard";

interface IFollowerUser {
  id: number;
  email: string;
  full_name: string;
  username: string;
  profile_picture: string;
  profile_background: string;
  profile_description: string;
}
interface IGetFollow {
  id: number;
  follower: IFollowerUser;
  followed: IFollowerUser;
}

export default function FollowPage(data: any) {
  const item = data.data as IGetFollow[];

  const location = useLocation();
  const isFollower = location.pathname === "/follower";
  const isFollowed = location.pathname === "/followed";
  const isFollowSuggest = location.pathname === "/followSuggest";

  return (
    <>
      <Tabs size="md">
        <Box display={"flex"}>
          <Box
            textAlign={"center"}
            fontWeight={isFollower ? "bold" : "normal"}
            borderBottom={isFollower ? "2px" : "none"}
            borderColor={"#2f2f2f"}
            paddingBottom={isFollower ? "10px" : "0px"}
            w={"50%"}
          >
            <Link to={`/follower`}>Follower</Link>
          </Box>
          <Box
            textAlign={"center"}
            fontWeight={isFollowed ? "bold" : "normal"}
            borderBottom={isFollowed ? "2px" : "none"}
            borderColor={"#2f2f2f"}
            paddingBottom={isFollowed ? "10px" : "0px"}
            w={"50%"}
          >
            <Link to={`/followed`}>Followed</Link>
          </Box>
          <Box
            textAlign={"center"}
            fontWeight={isFollowSuggest ? "bold" : "normal"}
            borderBottom={isFollowSuggest ? "2px" : "none"}
            borderColor={"#2f2f2f"}
            paddingBottom={isFollowSuggest ? "10px" : "0px"}
            w={"50%"}
          >
            <Link to={`/followSuggest`}>Suggested</Link>
          </Box>
        </Box>
        <TabPanels>
          <TabPanel>
            {item.map((item) => (
              <FollowCard prop={item} key={item.id} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
