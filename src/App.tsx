import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./componenets/search/Search";
import Movie from "./componenets/moviePage/Movie";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </Router>
  );
};

export default App;
