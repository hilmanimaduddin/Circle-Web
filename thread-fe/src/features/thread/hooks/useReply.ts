import { ChangeEvent, useState, useEffect } from "react";
import { API } from "../../../lib/api";
import { IReply } from "../../../types/interface/IReply";
import { useParams } from "react-router-dom";

export function useReply() {
  const { id } = useParams();
  const [form, setForm] = useState<IReply>({
    content: "",
    thread: id,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
    if (files) {
      setForm({
        ...form,
        [name]: name,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  async function postData() {
    try {
      const res = await API.post("/replies/create", form);
      setForm(res.data);
    } catch (error) {
      console.error({ error: "salah ya ni" });
    }
  }

  // get data reply from database

  const [reply, setReply] = useState<IReply[]>([]);

  async function fetchData() {
    try {
      const res = await API.get(`/replies?thread_id=${id}`);
      setReply(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { handleChange, postData, reply };
}
