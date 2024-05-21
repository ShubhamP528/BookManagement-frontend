// import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../GlobleContext/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    // remove user form local storage
    localStorage.removeItem("BookUser");
    toast.success("Successfully logout");
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return { logout };
};
