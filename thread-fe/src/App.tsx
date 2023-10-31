import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./lib/api";
import { FollowSuggest } from "./pages/Follow/FollowSuggest";
import { Followed } from "./pages/Follow/Followed";
import { Follower } from "./pages/Follow/Follower";
import Login from "./pages/Login";
import { Profile } from "./pages/Profile";
import { ProfileUserData } from "./pages/ProfileUser";
import Register from "./pages/Register";
import { DetailBlog } from "./pages/DetailBlogNew";
import { HomeNew } from "./pages/homeNew";
import { AUTH_CHECK, AUTH_ERROR } from "./stores/rootReducer";
// import { RootState } from "./stores/types/rootState";

function App() {
  const [isLoading, seIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  // const user = useSelector((state: RootState) => state.user);

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);

      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data.user));
      console.log("auth check berhasil", response.data.user);
      const origin = location?.pathname;
      console.log("origin", origin);

      navigate(origin, { replace: true });
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

  // function IsLogin() {
  //   if (!user.username) {
  //     return <Navigate to={"/login"} />;
  //   } else {
  //     return <Outlet />;
  //   }
  // }
  // function IsNotLogin() {
  //   if (user.username) {
  //     return <Navigate to={"/"} />;
  //   } else {
  //     return <Outlet />;
  //   }
  // }

  return (
    <>
      {isLoading ? null : (
        <Routes>
          {/* <Route path="/" element={<IsLogin />}></Route> */}
          <Route path="/" element={<HomeNew />}></Route>
          {/* <Route path="/blog/:id" element={<Blog />}></Route> */}
          {/* <Route path="/" element={<IsNotLogin />}></Route> */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profil" element={<Profile />}></Route>
          <Route path="/profil/user/:id" element={<ProfileUserData />}></Route>
          {/* New Edit */}
          {/* <Route path="/home" element={<HomeNew />}></Route> */}
          <Route path="/follower" element={<Follower />}></Route>
          <Route path="/followed" element={<Followed />}></Route>
          <Route path="/followSuggest" element={<FollowSuggest />}></Route>
          <Route path="/detail-blog/:id" element={<DetailBlog />}></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
