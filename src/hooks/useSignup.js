import { useState } from "react";
import { useAuthContext } from "../GlobleContext/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const navigate = useNavigate();

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      toast.error(json.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("BookUser", JSON.stringify(json));
      toast.success("Successfully login with signup");
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setIsLoading(false);
      navigate("/");
    }
  };

  return { signup, isLoading, error };
};
