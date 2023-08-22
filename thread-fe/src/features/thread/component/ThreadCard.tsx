import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { ThreadCardType } from "../../../types/interface/IType";
import { useDate } from "../hooks/useDate";

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

  // const makeDate = useDate;

  function getDistanceTime() {
    let t = new Date();
    let timeNow = t.getTime() as number;
    // console.log(timeNow);

    let timePost = new Date(props.posted_at as Date);
    // let timePost = props.posted_at as number;
    let waktu = timePost.getTime() as number;
    // console.log(timePost);

    let distance = timeNow - waktu;
    // console.log(distance);

    let distanceDay = Math.floor(distance / (1000 * 60 * 60 * 24));
    let distanceHour = Math.floor(distance / (1000 * 60 * 60));
    let distanceMinute = Math.floor(distance / (1000 * 60));
    //   let distanceSecond = Math.floor(distance / 1000);

    if (distanceDay > 0) {
      return `${distanceDay} Day ago`;
    } else if (distanceHour > 0) {
      return `${distanceHour} Hour ago`;
    } else if (distanceMinute > 0) {
      return `${distanceMinute} Minute ago`;
    } else {
      // return `${distanceSecond} Second ago`;
      return `less than a minute`;
    }
  }

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
          alt={""}
        />

        <Box>
          <Box display="flex" gap="10px">
            <Link to={`/blog/${props.id}`}>{props.author_full_name}</Link>
            <Text>@{props.author_username}</Text>
            <Text>{getDistanceTime()}</Text>
          </Box>
          <Text>{props.id}</Text>
          <Link to={`/blog/${props.id}`}>{props.content}</Link>
          <Text>{props.Date}</Text>
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
