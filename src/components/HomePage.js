import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../GlobleContext/AuthContext";
import backgroundImage from "../assets/background.jpg"; // Add your background image in the assets folder

const HomePage = () => {
  const { BookUser } = useAuthContext();
  return (
    <div
      className="flex min-h-screen bg-cover bg-center items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-75 p-8 text-center mx-4 sm:max-w-md md:max-w-lg lg:max-w-2xl w-full rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          <span className="text-indigo-600">
            Welcome to Book Management App
          </span>
        </h1>
        <p className="mb-6 text-base md:text-lg text-gray-700">
          Manage your book collection easily. Add, view, edit, and delete books.
        </p>
        {BookUser ? (
          <Link
            to="/books"
            className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out"
          >
            Go to Book List
          </Link>
        ) : (
          <Link
            to="/signup"
            className="bg-green-500 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomePage;
