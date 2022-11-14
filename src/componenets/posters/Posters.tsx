import React from "react";
import { MovieType } from "../../types/index";
import "./posters.css";

interface Props {
  movies: MovieType[];
}

const Posters: React.FC<Props> = ({ movies }) => {
  const drawMovies = () => {
    return movies.map((movie) => (
      <div className="movie-card" key={movie.imdbID}>
        <img src={movie.Poster} alt={movie.Title} />
        <h4>{movie.Title}</h4>
      </div>
    ));
  };
  return <div className="posters-container">{drawMovies()}</div>;
};

export default Posters;
