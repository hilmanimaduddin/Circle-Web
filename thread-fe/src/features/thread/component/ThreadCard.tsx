import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { ThreadCardType } from "../../../types/Threads/Threads";

const ThreadCard = (props: ThreadCardType) => {
  const [likesCount, setLikedCount] = useState(props.likes?.likes_count || 0);
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
          boxSize="90px"
          objectFit="cover"
          src={props.author_picture}
          alt="image"
        />

        <Box>
          <Box display="flex" gap="10px">
            <Link to={`/blog/${props.id}`}>{props.author_full_name}</Link>
            <Text>@{props.author_username}</Text>
            <Text>{props.posted_at}</Text>
          </Box>
          <Text>{props.content}</Text>
          <Text>{props.likes?.likes_count}</Text>

          <Image src={props.image} alt="" />
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
