// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import "./App.css";
// import "../src/features/thread/component/ThreadCard";
import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import ThreadCard from "../src/features/thread/component/ThreadCard";
import { Blog } from "./pages/BlogDetail";
import { Home } from "./pages/home";
import { API, setAuthToken } from "./lib/api";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useDispatch } from "react-redux";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
import { RootState } from "./stores/types/rootState";
import { useSelector } from "react-redux";

function App() {
  const [isLoading, seIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data.user));
      console.log("auth check berhasil", response.data.user);
      seIsLoading(false);
    } catch (err) {
      dispatch(AUTH_ERROR());
      navigate("/login");
      seIsLoading(false);
      console.log("auth error", err);
    }
  }
  useEffect(() => {
    authCheck();
  }, []);

  function IsLogin() {
    if (!user.username) {
      return <Navigate to={"/login"} />;
    } else {
      return <Outlet />;
    }
  }
  function IsNotLogin() {
    if (user.username) {
      return <Navigate to={"/"} />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {isLoading ? null : (
        <Routes>
          {/* <Route path="/" element={<IsLogin />}></Route> */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/blog/:id" element={<Blog />}></Route>
          {/* <Route path="/" element={<IsNotLogin />}></Route> */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
