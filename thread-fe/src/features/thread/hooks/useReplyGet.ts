import { useState, useEffect } from "react";
import { IReply } from "../../../types/interface/IReply";
import { API } from "../../../lib/api";
import { useParams } from "react-router-dom";

export function useReplyGet() {
  const { id } = useParams();
  const [reply, setReply] = useState<IReply[]>([]);

  async function fetchData() {
    try {
      const res = await API.get(`/replies?threadId=${id}`);
      setReply(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return { reply };
}
