import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./authentication.css";
import Spiner from "../sppiner/Spiner";
import AuthContext from "../../context/AuthProvider";
import { Users } from "../../context/AuthProvider";
import PasswordStrengthBar from "react-password-strength-bar";
import { passwordStrength } from "../../utils";

// ! ===================== Bug with bcrypt ==================================
// TODO : Solve this bug and use this logic or find another encryption libary
// ?The logic using bcrypt work fine but there is a bug with bcrypt and react
// import { findAsync, passwordStrength } from "../../utils";
// import bcrypt from "bcryptjs";
// ! ===================== Bug with bcrypt ==================================

const Authentiaction = ({
  authType,
  question,
  buttonText,
}: {
  authType: string;
  question: string;
  buttonText: string;
}) => {
  const [userName, setUserNAme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidRegistration, setIsValidRegistration] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // * rgistration validation
  useEffect(() => {
    if (authType === "sign") {
      const registretionValidation: boolean | undefined = passwordStrength(password, password2, 2, setMessage);
      if (registretionValidation) setIsValidRegistration(() => registretionValidation);
    }
  }, [password2, password, userName, email, authType]);

  // * login validation
  const validateLogIn = async () => {
    try {
      setIsLoading(() => true);
      const { data }: { data: Users[] } = await axios.get("https://628e3408368687f3e712634b.mockapi.io/imdb-users");

      const userValidation = data.find((u) => u.password === password);
      // ! Do not delete -  bcrypt bug
      // * This logic work find but there is a bug with bcrypt and react
      // const userValidation = await findAsync(data, async (u: any) => {
      // const isMatch = await bcrypt.compare(password, u.password);
      // if (isMatch) return u;
      // return undefined;
      // });

      if (!userValidation) {
        setMessage(() => "User Not Found");
        setTimeout(() => {
          setMessage(() => "");
        }, 1500);
      } else {
        setAuthUser({ ...userValidation });
        navigate("/");
      }
      setIsLoading(() => false);
    } catch (error: any) {
      console.log(error);
      setMessage(() => error.message);
      setTimeout(() => {
        setMessage(() => "");
      }, 1500);
      setIsLoading(() => false);
    }
  };

  const validateNewUser = async () => {
    try {
      if (!isValidRegistration) throw new Error("Password not valid ");
      setIsLoading(() => true);
      let { data }: { data: Users[] } = await axios.get("https://628e3408368687f3e712634b.mockapi.io/imdb-users");
      const isEmailExist: Users | undefined = data.find((u) => u.email === email);
      if (isEmailExist) throw new Error("Email is already exists");
      else {
        // !Dont delete is related to bcrypt issue
        // const hashedPassword = await bcrypt.hash(password, 8);
        // password: hashedPassword,
        const { data }: { data: Users } = await axios.post("https://628e3408368687f3e712634b.mockapi.io/imdb-users", {
          email,
          password: password,
          userName,
        });

        setAuthUser({ ...data });
        navigate("/");
      }
      setIsLoading(() => false);
    } catch (error: any) {
      setMessage(() => error.message);
      setTimeout(() => {
        setMessage(() => "");
      }, 1500);
      setIsLoading(() => false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authType === "login" && validateLogIn();
    authType === "sign" && validateNewUser();
  };

  const handleChangeType = () => {
    setMessage(() => "");
    setPassword(() => "");
    setPassword2(() => "");
    setIsLoading(() => true);
    // just for fun
    setTimeout(() => {
      setIsLoading(() => false);
      authType === "login" ? navigate("/register/sign") : navigate("/register/login");
    }, 100);
  };

  return (
    <section className="register">
      {isLoading && <Spiner />}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ textAlign: "center" }}>{authType === "login" ? "Sign in" : "Create account"}</h1>

        <img
          src="https://m.media-amazon.com/images/G/01/imdb/authportal/images/www_imdb_logo._CB667618033_.png"
          width="70px"
          alt="logo"
        />
      </div>
      <form onSubmit={handleSubmit} className="register_form">
        {authType === "sign" && (
          <>
            <label htmlFor="userName">Username</label>
            <input
              required
              type="text"
              id="userName"
              onChange={(e) => setUserNAme(() => e.target.value)}
              value={userName}
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          // autoComplete="off"
          value={email}
          onChange={(e) => setEmail(() => e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          required
          // type="text"
          type="password"
          id="password"
          className={authType}
          onChange={(e) => setPassword(() => e.target.value)}
          value={password}
        />
        {authType === "sign" && (
          <>
            <PasswordStrengthBar password={password} />
            <label htmlFor="password2">Confirm Password</label>
            <input
              required
              // type="text"
              type="password"
              id="password2"
              onChange={(e) => setPassword2(() => e.target.value)}
              value={password2}
            />
          </>
        )}
        <div className="message">{message}</div>
        <button>{buttonText}</button>
      </form>
      <div className="seperator-by-line">
        <span className="line"></span>
        <span>{question}</span>
        <span className="line"></span>
      </div>
      <span className="registration-change-type-btn" onClick={handleChangeType}>
        {authType === "login" ? "Create new account" : "Sign in"}
      </span>
    </section>
  );
};

export default Authentiaction;
