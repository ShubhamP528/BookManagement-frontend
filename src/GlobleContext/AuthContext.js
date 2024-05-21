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

  useEffect(() => {
    const BookUser = JSON.parse(localStorage.getItem("BookUser"));
    console.log(BookUser);

    if (BookUser) {
      dispatch({ type: "LOGIN", payload: BookUser });
    }
  }, []);

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
