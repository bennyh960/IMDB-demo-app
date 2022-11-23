import React, { useEffect, useState, useRef } from "react";
import "./search.css";
import axios from "axios";
import Loader from "../loader/Loader";
import Posters from "../posters/Posters";
import { MovieType } from "../../types";
import Pagination from "../pagination/Pagination";
import { ReactComponent as Glass } from "../../assets/glass.svg";
import UseResize from "../../hooks/UseResize";
import { useNavigate } from "react-router";
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
  // scroll and custom hook
  const [windowWidth, windowHeight] = UseResize();
  const [isScroll, setIsScroll] = useState(windowWidth < 600 ? true : false);
  const scrollRef: any = useRef<React.ClassAttributes<HTMLDivElement>>(null);
  const newSubmitRef = useRef<boolean>(false);

  // !devtool for me
  const navigate = useNavigate();
  //   input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(() => e.target.value);
    if (searchValue === "login123") navigate("/register/login");
    if (searchValue === "sign123") navigate("/register/sign");
  };
  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>): void => {
    e?.preventDefault();
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    newSubmitRef.current = true;
    setPage(() => 1);

    if (isError === "") {
      localStorage.setItem("lastSearch", searchValue);
    }
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

        if (isScroll && !newSubmitRef.current) {
          setMovies((p) => {
            return [...p, ...data.Search];
          });
        } else if (newSubmitRef.current) {
          newSubmitRef.current = false;
          setMovies((p) => data.Search);
        } else {
          setMovies((p) => {
            if (p.length < 10) return data.Search;
            else return data.Search.slice(p.length - 10);
          });
        }

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

    if (searchValue) {
      getMovies();
    }
    // eslint-disable-next-line
  }, [submit, page]);

  const handleScroll = (e: any) => {
    const scrollTop = e.target.documentElement.scrollTop;
    const scrollHeight = e.target.documentElement.scrollHeight;
    // console.log(scrollHeight, scrollTop, windowHeight);

    if (scrollHeight === Math.ceil(scrollTop) + windowHeight) {
      console.log("new page");
      // scrollRef.current.scrollTo(0, windowHeight); //scrollIntoView({ behavior: "smooth" })
      // scrollRef.current.scrollIntoView({ behavior: "smooth" });
      setPage((p) => p + 1);
    }
  };

  useEffect(() => {
    // console.log("change view detected");

    if (windowWidth < 650) {
      setIsScroll(() => true);
    } else {
      setIsScroll(() => false);
    }
    // console.log("change logic is activated");
    // eslint-disable-next-line
  }, [windowWidth, window.innerWidth]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <section id="search-container" ref={scrollRef}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." value={searchValue} onChange={handleChange} />
        {!isError && !isLoading && (
          <div className="icon glass" onClick={() => handleSubmit()}>
            <Glass />
          </div>
        )}
      </form>
      {isLoading ? <Loader /> : <div className="linear-activity transparent"></div>}
      {isError !== "" && <div className="pops-container"> {isError}</div>}
      <Posters movies={movies} />
      {isLoading && windowWidth < 650 ? <Loader /> : <div className="linear-activity transparent"></div>}
      {maxContent > 0 && <Pagination page={page} setPage={setPage} maxContent={maxContent} />}
    </section>
  );
};

export default Search;
