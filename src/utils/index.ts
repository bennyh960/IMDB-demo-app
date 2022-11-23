import React from "react";
import { Users } from "../context/AuthProvider";
import axios from "axios";

type validateLogInArgs = {
  setIsLoading: (u: boolean) => void;
  setMessage: (u: string) => void;
};

// TODO : figure out how to use async function in this situation and refactor authentication

// setAuthUser, email, password, navigate
// const validateLogIn = async (setIsLoading, setMessage):Promise<{setIsLoading:(u:boolean)}>  => {
//   try {
//     setIsLoading(() => true);
//     const { data }: { data: Users[] } = await axios.get("https://628e3408368687f3e712634b.mockapi.io/imdb-users");
//     const userValidation: Users | undefined = data.find((u) => u.email === email && u.password === password);
//     if (!userValidation) {
//       setMessage(() => "User Not Found");
//       setTimeout(() => {
//         setMessage(() => "");
//       }, 1500);
//     } else {
//       setAuthUser({ ...userValidation, password: "*****" });
//       navigate("/");
//     }
//     setIsLoading(() => false);
//   } catch (error) {
//     console.log(error);
//     setIsLoading(() => false);
//   }
// };

// export default validateLogIn;
