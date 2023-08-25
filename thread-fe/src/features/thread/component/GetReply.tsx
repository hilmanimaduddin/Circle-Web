import {
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Text,
  border,
} from "@chakra-ui/react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { IReply } from "../../../types/interface/IReply";
import { ThreadCardType } from "../../../types/interface/IType";
import moment from "moment";

const GetReply = (item: IReply) => {
  return (
    <>
      <Box borderBottom="1px" borderColor={"gray"} display={"flex"} gap={3}>
        <Image
          mt={2}
          src={item.profile_picture}
          alt=""
          borderRadius="full"
          boxSize={"35px"}
          objectFit="cover"
        />
        <Box>
          <Box display={"flex"} gap={3}>
            <Text>{item.full_name}</Text>
            <Text>@{item.username}</Text>
            <Text>{moment(item.posted_at).startOf("minute").fromNow()}</Text>
          </Box>
          <Text>{item.content}</Text>
          <Text display={"flex"} alignItems={"center"} gap={1}>
            <VscHeartFilled />
            17 likes
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default GetReply;
