import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThreadCardType } from "../../../types/interface/IType";
import { API } from "../../../lib/api";

export function useBlogDetail() {
  const { id } = useParams();

  const [thread, setThread] = useState<ThreadCardType[]>([]);

  async function fetchData() {
    try {
      const res = await API.get("/thread/", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setThread(res.data);
    } catch (error) {
      console.error({ error: "salah ya ni" });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const prop = thread.find((props) => props.id == id);

  const [likesCount, setLikedCount] = useState(prop?.likes?.likes_count || 0);
  const [isLikes, setIsLiked] = useState(prop?.is_liked || false);

  const handleLike = () => {
    if (isLikes) {
      setLikedCount(likesCount - 1);
    } else {
      setLikedCount(likesCount + 1);
    }
    setIsLiked(!isLikes);
  };

  return { handleLike, prop, isLikes, likesCount };
}
