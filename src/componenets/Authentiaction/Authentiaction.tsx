import axios from "axios";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./authentication.css";
import Spiner from "../sppiner/Spiner";
import AuthContext from "../../context/AuthProvider";
import { Users } from "../../context/AuthProvider";
import PasswordStrengthBar from "react-password-strength-bar";
// @ts-ignore
import bcrypt from "bcryptjs";

const Authentiaction = ({ authType }: { authType: string }) => {
  const userRef = useRef<HTMLInputElement>(null);
  const [userName, setUserNAme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isValidPassword, setIsValidPassword] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // userRef.current?.focus();
    console.log("validate password", isValidPassword);
  }, [password2]);

  // * Messages for create account events

  useEffect(() => {
    if (authType === "sign") {
      let validationLocalTest = true;
      // check confirm password:
      if (document.activeElement?.id === "password2" && password !== password2) {
        setMessage(() => "Not match");
      } else {
        validationLocalTest = true;
        setMessage(() => "");
      }

      // validation for password
      if (document.activeElement?.id === "password") {
        if (password.length < 6) {
          setMessage(() => "Minimum length of 6 characters");
          validationLocalTest = false;
          // setIsValidPassword(() => false);
        } else if (!password.match(/(?=.*[a-z])/gm)) {
          setMessage(() => "Must contain lower case letter");
          validationLocalTest = false;
          // setIsValidPassword(() => false);
        } else if (!password.match(/(?=.*[A-Z])/gm)) {
          setMessage(() => "Must contain upper case letter");
          validationLocalTest = false;
          // setIsValidPassword(() => false);
        } else if (!password.match(/(?=.*\d)/gm)) {
          setMessage(() => "Must contain number");
          validationLocalTest = false;
          // setIsValidPassword(() => false);
        } else if (password === password2) {
          validationLocalTest = true;
          // setIsValidPassword(() => true);
        }
      } else if (document.activeElement?.id !== "password2") {
        setMessage(() => "");
      }

      setIsValidPassword(() => validationLocalTest);

      console.log(isValidPassword);
    }
  }, [password2, password, userName, email]);

  const validateLogIn = async () => {
    try {
      setIsLoading(() => true);
      const { data }: { data: Users[] } = await axios.get("https://628e3408368687f3e712634b.mockapi.io/imdb-users");

      const userValidation: Users | undefined = data.find(async (u) => {
        if (!(await bcrypt.compare(password, u.password))) {
          return;
        }

        return u.email === email;
      });
      // const userValidation: Users | undefined = data.find(async (u) => {
      //   const isMatchPassword = await bcrypt.compare(password, u.password);
      //   return u.email === email && u.password === password
      //   return isMatchPassword && u.email === email;
      // });

      console.log(userValidation, bcrypt.compare(password, "123"));

      if (!userValidation) {
        setMessage(() => "User Not Found");
        setTimeout(() => {
          setMessage(() => "");
        }, 1500);
      } else {
        setAuthUser({ ...userValidation, password: "*****" });
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
      if (!isValidPassword) throw new Error("Password not valid ");
      setIsLoading(() => true);
      let { data }: { data: Users[] } = await axios.get("https://628e3408368687f3e712634b.mockapi.io/imdb-users");
      const isEmailExist: Users | undefined = data.find((u) => u.email === email);
      if (isEmailExist) throw new Error("Email is already exists"); //todo add email validation
      else {
        const hasedPassword = await bcrypt.hash(password, 8);
        const { data }: { data: Users } = await axios.post("https://628e3408368687f3e712634b.mockapi.io/imdb-users", {
          email,
          password: hasedPassword,
          userName,
        });
        // console.log(data);

        setAuthUser({ ...data, password: hasedPassword });
        navigate("/");
      }
      setIsLoading(() => false);
    } catch (error: any) {
      console.log(error.message);

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
    console.log(authType);
    setPassword("");
    setPassword2("");

    authType === "login" ? navigate("/register/sign") : navigate("/register/login");
  };

  return (
    <div className="register">
      {isLoading && <Spiner />}
      <h1 style={{ textAlign: "center" }}>{authType === "login" ? "Sign in" : "Create account"}</h1>
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
          //   autoComplete="off"
          ref={userRef}
          value={email}
          onChange={(e) => setEmail(() => e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          required
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
              type="password"
              id="password2"
              onChange={(e) => setPassword2(() => e.target.value)}
              value={password2}
            />
          </>
        )}
        <div className="message">{message}</div>
        <button>{authType === "login" ? "Sign in" : "Create new account"}</button>
      </form>

      <div className="seperator-by-line">
        <span className="line"></span>
        {authType === "login" && <span>Not a mebmber?</span>}
        {authType === "sign" && (
          <span>
            <Link to={"/register/login"}>Have account?</Link>{" "}
          </span>
        )}
        <span className="line"></span>
      </div>
      {authType === "login" && <button onClick={handleChangeType}> Create new account</button>}
    </div>
  );
};

export default Authentiaction;
