import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import SignupForm from "./components/SignupForm";
import { AuthContextProvider } from "./GlobleContext/AuthContext";
import { Toaster } from "react-hot-toast";
import Error from "./components/Error";
import ShowBook from "./components/ShowBook";

const Applayout = () => {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Outlet />
        <Toaster />
        <Footer />
      </AuthContextProvider>
    </>
  );
};

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Applayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/books",
        element: <BookList />,
      },
      {
        path: "/books/add",
        element: <AddBook />,
      },
      {
        path: "/books/edit/:id",
        element: <EditBook />,
      },
      {
        path: "/books/:id",
        element: <ShowBook />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoute} />);
