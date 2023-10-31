import { Box, Button, Image, Text } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API } from "../../../lib/api";
import { RootState } from "../../../stores/types/rootState";

const ThreadCardNew = (props: any) => {
  const user = useSelector((state: RootState) => state.user);

  // console.log("alllData", props.allData);

  const [likee, setLikee] = useState<any[]>([]);

  const getReply = async () => {
    try {
      const res = await API.get(`/like/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setLikee(res.data);
      // console.log("res", res.data);
    } catch (error) {
      console.error("error");
    }
  };

  const filter = likee.find((prop) => prop.thread.id == props.id);

  const likeIs = filter?.id !== undefined;
  const [isLikes, setIsLiked] = useState(Boolean);
  const [likesCount, setLikedCount] = useState(props.likes_count as number);

  useEffect(() => {
    getReply();
  }, []);

  useEffect(() => {
    if (likeIs === false) {
      setIsLiked(false);
    } else if (likeIs === true) {
      setIsLiked(true);
    }
  }, [likeIs]);

  // console.log("likeIs filter", likeIs);
  // console.log("isLikes state", isLikes);

  const id = props.id;

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
            {/* <Box>{props.id}</Box> */}
            <Text color={"#6f6f6f"} fontStyle={"italic"}>
              @{props.author_username}
            </Text>
            <Text>{moment(props.posted_at).startOf("minute").fromNow()}</Text>
          </Box>
          {/* <Text>{props.id}</Text> */}
          <Link to={`/detail-blog/${props.id}`}>{props.content}</Link>
          <Text>{moment(props.posted_at).format("LLLL")}</Text>
          <Image src={props.image as string} alt="" />
          <Button
            bg="none"
            variant="none"
            onClick={handleLike}
            leftIcon={isLikes ? <VscHeartFilled /> : <VscHeart />}
            // leftIcon={<VscHeartFilled />}
          >
            {likesCount} likes
          </Button>
          <Link to={`/detail-blog/${props.id}`}>
            <Button bg="none" variant="none">
              {props.replies_count} replies
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default ThreadCardNew;
