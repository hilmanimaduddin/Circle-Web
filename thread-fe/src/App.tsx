// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import "./App.css";
// import "../src/features/thread/component/ThreadCard";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ThreadCard from "../src/features/thread/component/ThreadCard";
import { Blog } from "./pages/Blog";
import { Home } from "./pages/home";
import { API, setAuthToken } from "./lib/api";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

function App() {
  const [isLoading, seIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      console.log("anda berhasil", response);
      seIsLoading(false);
    } catch (err) {
      localStorage.removeItem("token");
      seIsLoading(false);
      navigate("/login");
      console.log("auth error", err);
    }
  }
  useEffect(() => {
    authCheck();
  }, []);

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/blog/:id" element={<Blog />}></Route>
          <Route path="/coba" element={<ThreadCard />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      )}
    </>
  );
}

// function App() {
//   return (
//     <>
//       <ThreadCard />
//     </>
//   );
// }

export default App;
