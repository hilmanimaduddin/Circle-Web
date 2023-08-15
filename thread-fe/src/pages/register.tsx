import { Box, Button, Container, Input, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, ChangeEvent, useEffect } from "react";
import { UserType } from "../types/IType";
import { API } from "../lib/api";

export function Register() {
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

  return (
    <>
      <Container alignContent="center" mt="20">
        <Stack spacing={3}>
          <Text fontSize="40px" fontWeight="bold" color="#04a51e">
            Circle
          </Text>
          <Text fontSize="20px">Create account Circle</Text>
          <Input
            onChange={handleChange}
            name="full_name"
            variant="outline"
            placeholder="Full name*"
          />
          <Input
            onChange={handleChange}
            name="username"
            variant="outline"
            placeholder="Username*"
          />
          <Input
            onChange={handleChange}
            name="email"
            variant="outline"
            placeholder="Email*"
          />
          <Input
            onChange={handleChange}
            name="password"
            variant="outline"
            placeholder="Password*"
          />
          <Button onClick={handleRegister} borderRadius={50} bgColor="#04a51e">
            Create
          </Button>
          <Box display="flex" gap="5px" justifyContent="left">
            <Text>Already have account?</Text>
            <Text color="#04a51e">
              <Link to="/login">login</Link>
            </Text>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
