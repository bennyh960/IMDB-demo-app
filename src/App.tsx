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
          element={<Authentiaction authType={"login"} question={"Not a member?"} buttonText={"Sign in"} />}
        />
        <Route
          path="/register/sign"
          element={<Authentiaction authType={"sign"} question={"Have account?"} buttonText={"Create new account"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
