import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./componenets/search/Search";
import Movie from "./componenets/moviePage/Movie";
import Authentiaction from "./componenets/Authentiaction/Authentiaction";
import RequireAuth from "./componenets/RouteProtection/RequireAuth";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Search />} />
        </Route>
        <Route path="/movie/:id" element={<Movie />} />
        <Route
          path="/register/login"
          element={
            <Authentiaction title={"Log in"} authType={"login"} question={"Not a member?"} buttonText={"Sign in"} />
          }
        />
        <Route
          path="/register/sign"
          element={
            <Authentiaction
              title={"Create new account"}
              authType={"sign"}
              question={"Have account?"}
              buttonText={"Create new account"}
            />
          }
        />
        <Route
          path="/register/reset"
          element={
            <Authentiaction
              title={"Reset password"}
              authType={"reset"}
              question={"Have account?"}
              buttonText={"Reset Password"}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
