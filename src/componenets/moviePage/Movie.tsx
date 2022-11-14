import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MovieDataProps } from "../../types";
import Loader from "../loader/Loader";
import "./movie.css";

const Movie: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movieData, setMovieData] = useState<MovieDataProps>({
    imdbID: "",
    Plot: "",
    Poster: "",
    Title: "",
    Writer: "",
  });
  const location = useLocation();
  useEffect(() => {
    const getMovieContent = async () => {
      try {
        const { data } = await axios.get("http://www.omdbapi.com/", {
          params: {
            apikey: process.env.REACT_APP_API_KEY,
            i: location.pathname.split("/movie/")[1],
          },
        });
        // console.log(data);
        setMovieData((p) => {
          return { imdbID: data.imdbID, Writer: data.Writer, Plot: data.Plot, Poster: data.Poster, Title: data.Title };
        });
        setIsLoading(() => false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieContent();
  }, [location.pathname]);

  return (
    <div>
      {isLoading ? (
        <div className="movie-container load-movie">
          <Loader />
        </div>
      ) : (
        <div className="movie-container">
          <div className="poster-big">
            <img src={movieData.Poster} alt={movieData.Title} />
          </div>
          <div className="movie-description">
            <div>
              <h1>{movieData.Title}</h1>
              <h2>by {movieData.Writer}</h2>
              <p>{movieData.Plot}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
