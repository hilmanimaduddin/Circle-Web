import { Box, Button, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { ThreadCardType } from "../../../types/interface/IType";

const ThreadCard = (props: ThreadCardType) => {
  const [likesCount, setLikedCount] = useState(props.likes_count as number);
  const [isLikes, setIsLiked] = useState(props.is_liked || false);

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
      <Box
        key={props.id}
        display="flex"
        gap="10px"
        mb="10px"
        p={3}
        borderBottom="2px"
        borderColor="#2f2f2f"
      >
        <Image
          borderRadius="full"
          boxSize="60px"
          objectFit="cover"
          src={props.author_picture}
          alt={""}
        />

        <Box>
          <Box display="flex" gap="10px">
            <Link to={`/blog/${props.id}`}>{props.author_full_name}</Link>
            <Text>@{props.author_username}</Text>
            <Text>{moment(props.posted_at).startOf("minute").fromNow()}</Text>
          </Box>
          {/* <Text>{props.id}</Text> */}
          <Link to={`/blog/${props.id}`}>{props.content}</Link>
          <Text>{moment(props.posted_at).format("LLLL")}</Text>
          <Image src={props.image as string} alt="" />
          <Button
            bg="none"
            variant="none"
            onClick={handleLike}
            leftIcon={isLikes ? <VscHeartFilled /> : <VscHeart />}
          >
            {likesCount} likes
          </Button>
          <Button bg="none" variant="none">
            {props.replies_count} replies
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ThreadCard;
