import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./componenets/search/Search";
import Movie from "./componenets/moviePage/Movie";
import Authentiaction from "./componenets/Authentiaction/Authentiaction";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
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
