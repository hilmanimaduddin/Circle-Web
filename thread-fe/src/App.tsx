// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import "./App.css";
// import "../src/features/thread/component/ThreadCard";
import ThreadCard from "../src/features/thread/component/ThreadCard";
import { Routes, Route } from "react-router-dom";
import { Home } from "../src/pages/home/home";
import { Blog } from "../src/pages/blog/Blog";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/blog/:id" element={<Blog />}></Route>
      <Route path="/coba" element={<ThreadCard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
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
