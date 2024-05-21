import { createContext, useReducer, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { BookUser: action.payload };
    case "LOGOUT":
      return { BookUser: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { BookUser: null });

  // Initialize BookUser from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("BookUser"));
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: storedUser });
    }
  }, []);

  // Update localStorage whenever BookUser changes
  useEffect(() => {
    if (state.BookUser) {
      localStorage.setItem("BookUser", JSON.stringify(state.BookUser));
    } else {
      localStorage.removeItem("BookUser");
    }
  }, [state.BookUser]);

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
