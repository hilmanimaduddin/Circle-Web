import { Box, Button, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { API } from "../../../lib/api";
import { ThreadCardType } from "../../../types/interface/IType";

const ThreadCard = (props: ThreadCardType) => {
  const [likesCount, setLikedCount] = useState(props.likes_count as number);

  const [isLikes, setIsLiked] = useState(props.is_liked);
  // const user = useSelector((state: RootState) => state.user);
  const id = props.id;
  // const thread = useSelector((state: RootState) => state.thread.threads);

  const handleLike = () => {
    try {
      if (!isLikes) {
        setLikedCount(likesCount + 1);
        const response = API.post("/like", { thread_id: id });
        console.log(response);
      } else {
        setLikedCount(likesCount - 1);
        const response = API.delete(`/like/${id}`);
        console.log(response);
      }
      setIsLiked(!isLikes);
    } catch (err) {
      console.log("error ni", err);
    }
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
          src={
            props.author_picture ??
            "https://www.copaster.com/wp-content/uploads/2023/03/pp-kosong-wa-default-300x279.jpeg"
          }
          alt={""}
        />

        <Box>
          <Box display="flex" gap="10px">
            <Link to={`/profil/user/${props.author_id}`}>
              {props.author_full_name}
            </Link>
            <Text color={"#6f6f6f"} fontStyle={"italic"}>
              @{props.author_username}
            </Text>
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
