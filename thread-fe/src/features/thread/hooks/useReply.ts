import { ChangeEvent, useState, useEffect } from "react";
import { API } from "../../../lib/api";
import { IReply } from "../../../types/interface/IReply";
import { useParams } from "react-router-dom";

export function useReply() {
  const { id } = useParams();
  const [form, setForm] = useState<IReply>({
    content: "",
    thread: id,
    // image: "",
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

  // console.log(form);

  async function postData() {
    try {
      //   const formData = new FormData();
      const res = await API.post("/replies/create", form);
      // console.log(res.config.data);
      setForm(res.data);
    } catch (error) {
      console.error({ error: "salah ya ni" });
    }
  }

  // const { id } = useParams();
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
  // return { reply };
  return { handleChange, postData, reply };
}
