import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../../../lib/api";
import { AUTH_LOGIN } from "../../../stores/rootReducer";
import { UserType } from "../../../types/interface/IType";

export function useLogin() {
  const [form, setForm] = useState<UserType>({
    email: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin() {
    try {
      const response = await API.post("/auth/login", form);
      dispatch(AUTH_LOGIN(response.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return { handleChange, handleLogin };
}
