import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";
import { useEffect, useCallback } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
// import { useContext } from "react";
// import AuthContext from "../../context/AuthProvider";

const RequireAuth = () => {
  //   const { authUser } = useContext(AuthContext);
  const { authUser, setAuthUser } = UseAuth();
  const [storedVal, setNewVal] = useLocalStorage("user", authUser);
  const location = useLocation();

  const logOutFunction = useCallback(
    (event: any) => {
      if (event.key === "Escape") {
        //Do whatever when esc is pressed
        console.log("ESCAPED DETECTED");
        console.log("delete from storage", storedVal);
        setAuthUser({ ...authUser, email: "" });
        setNewVal({});
      }
    },
    [authUser, setAuthUser, setNewVal, storedVal]
  );

  useEffect(() => {
    document.addEventListener("keydown", logOutFunction, false);

    return () => {
      document.removeEventListener("keydown", logOutFunction, false);
    };
  }, [logOutFunction]);

  return authUser?.email ? <Outlet /> : <Navigate to={"/register/login"} state={{ from: location }} replace />;
};

export default RequireAuth;
