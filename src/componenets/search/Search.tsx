import React, { useEffect, useState } from "react";
import "./search.css";
import axios from "axios";
import Loader from "../loader/Loader";
import Posters from "../posters/Posters";
import { MovieType } from "../../types";
import Pagination from "../pagination/Pagination";
import { ReactComponent as Glass } from "../../assets/glass.svg";

// TODO :

const Search: React.FC = () => {
  // states
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setError] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>(localStorage.getItem("lastSearch") || "");
  const [submit, setSubmit] = useState<boolean>(false);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxContent, setMaxContent] = useState<number>(0);

  //   input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(() => e.target.value);
  };
  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>): void => {
    e?.preventDefault();
    localStorage.setItem("lastSearch", searchValue);
    setSubmit((prev) => !prev);
  };

  //   componenet logic
  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(() => true);
        const { data } = await axios.get("https://www.omdbapi.com/", {
          params: { apikey: process.env.REACT_APP_API_KEY, s: searchValue, page },
        });
        setLoading(() => false);
        if (data.Response === "False") throw new Error("Movie Not Found.");

        setMovies(() => data.Search);
        setMaxContent(() => Math.ceil(data.totalResults / 10));
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setError(() => error.response.data.Error || "Somthing went wrong...");
        } else {
          setError(() => "Movie Not Found.");
        }

        setLoading(() => false);
        setTimeout(() => {
          setError(() => "");
        }, 1300);
      }
    };

    searchValue && getMovies();
    // eslint-disable-next-line
  }, [submit, page]);

  return (
    <section id="search-container">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." value={searchValue} onChange={handleChange} />
        {!isError && !isLoading && (
          <div className="icon glass" onClick={() => handleSubmit()}>
            <Glass />
          </div>
        )}
      </form>
      {isLoading ? <Loader /> : <div className="linear-activity transparent"></div>}
      <div className="pops-container"> {isError || ""}</div>
      <Posters movies={movies} />
      {maxContent > 0 && <Pagination page={page} setPage={setPage} maxContent={maxContent} />}
    </section>
  );
};

export default Search;
