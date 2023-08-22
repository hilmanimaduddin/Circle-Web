import { Link, useNavigate } from "react-router-dom";
import React, { useState, ChangeEvent, useEffect } from "react";
import { UserType } from "../../../types/interface/IType";
import { API } from "../../../lib/api";

export function useRegister() {
  const [form, setForm] = useState<UserType>({
    full_name: "",
    email: "",
    username: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  console.log(form);

  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await API.post("/auth/register", form);
      console.log("registrasi berhasil", response.config.data);
      navigate("/login");
      // alert("selamat anda sudah terdaftar");
    } catch (error) {
      console.log("salah registrasi", error);
      alert("registrasi gagal");
    }
  }
  return { handleChange, handleRegister };
}
