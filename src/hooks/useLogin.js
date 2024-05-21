import { useState } from "react";
import { useAuthContext } from "../GlobleContext/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const [errorL, setErrorL] = useState(null);
  const [isLoadingL, setIsLoadingL] = useState(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoadingL(true);
    setErrorL(null);

    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoadingL(false);
      setErrorL(json.error);
      toast.error(json.error);
    }
    console.log(response);

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("BookUser", JSON.stringify(json));
      toast.success("Successfully login");
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoadingL(false);
      navigate("/");
    }
  };

  return { login, isLoadingL, errorL };
};
