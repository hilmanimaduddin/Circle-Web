import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../../../types/interface/IType";
import { API } from "../../../lib/api";
import { AUTH_LOGIN } from "../../../stores/rootReducer";
import { useDispatch } from "react-redux";

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
