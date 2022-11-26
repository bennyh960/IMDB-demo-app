import axios from "axios";
import { useState } from "react";
import UseAuth from "../../hooks/UseAuth";
import { AiFillEdit } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import "./User.css";

import Loader from "../loader/Loader";

const User = () => {
  const [inputClass, setInputClass] = useState("hide_input");
  const { authUser, setAuthUser } = UseAuth();
  const [isClosed, setIsClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(authUser);

  const handleEdit = (e: any) => {
    e.preventDefault();
    setInputClass(() => "show_input");
  };
  const handleCancle = (e: any) => {
    e.preventDefault();
    setUser((p) => {
      return { ...authUser };
    });
    setInputClass(() => "hide_input");
  };

  const handleChange = (e: any) => {
    const propertyById = e.target.id.split("-")[0];
    setUser((p) => {
      return { ...p, [propertyById]: e.target.value };
    });
  };

  const handleSave = async () => {
    setIsLoading(() => true);
    try {
      await axios.put(`https://628e3408368687f3e712634b.mockapi.io/imdb-users/${user.id}`, {
        ...user,
      });
      setAuthUser({ ...user });
      // console.log(data);
      setIsClosed(true);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(() => false);
  };

  if (isClosed) return null;

  return (
    <div className="user_container">
      <h1>User Profile</h1>
      <div>
        <span>User Name</span>
        <input
          type="text"
          value={user.userName || ""}
          className={inputClass}
          onChange={handleChange}
          disabled={inputClass === "show_input" ? false : true}
          id="userName-p"
        />
      </div>
      <div>
        <span>password</span>
        <input
          type="text"
          value={user.password || ""}
          className={inputClass}
          onChange={handleChange}
          disabled={inputClass === "show_input" ? false : true}
          id="password-p"
        />
      </div>
      <div>
        <span>email</span>
        <input
          type="email"
          value={user.email || ""}
          className={inputClass}
          onChange={handleChange}
          disabled={inputClass === "show_input" ? false : true}
          id="email-p"
        />
      </div>
      {inputClass === "hide_input" && (
        <div className="buttons-edit">
          <div onClick={handleEdit}>
            <AiFillEdit size={"2rem"} />
          </div>
        </div>
      )}
      {inputClass === "show_input" && (
        <div className="buttons-confirm">
          {Object.entries(user).toString() !== Object.entries(authUser).toString() && (
            <div onClick={handleSave}>
              <FaSave size={"2rem"} />
            </div>
          )}
          <div onClick={handleCancle}>
            <MdCancel size={"2rem"} />
          </div>
        </div>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default User;
