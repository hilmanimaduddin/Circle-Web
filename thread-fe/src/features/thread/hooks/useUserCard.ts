import { useState, useEffect } from "react";
import { IReply } from "../../../types/interface/IReply";
import { API } from "../../../lib/api";
import { useParams } from "react-router-dom";
import { UserType } from "../../../types/interface/IType";

export function useUserCard() {
  const { id } = useParams();
  const [data, setUser] = useState<UserType[]>([]);

  async function fetchData() {
    try {
      const res = await API.get(`/auth`);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return { data };
}
