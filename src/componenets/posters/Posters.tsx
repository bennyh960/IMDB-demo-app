import React from "react";
import { MovieType } from "../../types/index";
import { useNavigate } from "react-router-dom";
import "./posters.css";

interface Props {
  movies: MovieType[];
}

const Posters: React.FC<Props> = ({ movies }) => {
  const navigate = useNavigate();
  const handleChosenMovie = (id: string): void => {
    navigate(`/movie/${id}`);
  };

  const drawMovies = () => {
    return movies.map((movie) => (
      <div className="movie-card" key={movie.imdbID} onClick={() => handleChosenMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={movie.Title} />
        <h4>{movie.Title}</h4>
      </div>
    ));
  };
  return <div className="posters-container">{drawMovies()}</div>;
};

export default Posters;
