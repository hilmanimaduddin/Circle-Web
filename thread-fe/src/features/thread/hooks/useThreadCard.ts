import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../lib/api";
import { THREAD_GET } from "../../../stores/rootReducer";
import { RootState } from "../../../stores/types/rootState";
import { IGetThreads } from "../../../types/interface/IType";

export function useThreadCard() {
  const dispatch = useDispatch();

  async function handlePostLike(id: number, isLiked: boolean) {
    try {
      if (!isLiked) {
        const response = await API.post("/like", { thread_id: id });
        console.log(response);
      } else {
        const response = await API.delete(`/like/${id}`);
        console.log(response);
      }
    } catch (err) {
      console.log("Failed updating like", err);
    }
  }

  // const dispatch = useDispatch();
  const [form, setForm] = useState<IGetThreads>({
    content: "",
    image: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
    if (files) {
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  async function fetchData() {
    try {
      const res = await API.get("/thread/", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      dispatch(THREAD_GET(res.data));
    } catch (error) {
      console.error("error");
    }
  }

  const thread = useSelector((state: RootState) => state.thread.threads);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    postData();
  }
  const [time, setTime] = useState("");

  async function postData() {
    try {
      const formData = new FormData();
      formData.append("content", form.content as string);
      formData.append("image", form.image as File);
      const res = await API.post("/thread/create", formData);
      const fetch = await API.get("/thread/", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      dispatch(THREAD_GET(fetch.data));
      setTime("now");
      console.log(res.config.data);
      console.log("data", formData);
      setForm(res.data);
    } catch (error) {
      console.error({ error: "salah ya ni" });
    }
  }

  return {
    time,
    handlePostLike,
    handleButtonClick,
    handleSubmit,
    handleChange,
    fileInputRef,
    fetchData,
    thread,
  };
}
