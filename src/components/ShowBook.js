import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../GlobleContext/AuthContext";
import toast from "react-hot-toast";

const ShowBook = () => {
  const { id } = useParams();
  const { BookUser } = useAuthContext();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (BookUser) {
      axios
        .get(`/books/${id}`, {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        })
        .then((response) => {
          setBook(response.data);
          setLoading(false);
        })
        .catch((error) => {
          // toast.error(error.message);
          console.log(error);
          setLoading(false);
        });
    }
  }, [id, BookUser]);

  const handleDelete = () => {
    axios
      .delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${BookUser?.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Book deleted successfully");
          navigate("/books");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        // toast.error(error.message);
        console.log(error);
        toast.error("Failed to delete the book");
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-10 w-40 mb-4"></div>
          <div className="bg-gray-300 h-6 w-80 mb-2"></div>
          <div className="bg-gray-300 h-6 w-80 mb-2"></div>
          <div className="bg-gray-300 h-6 w-80 mb-2"></div>
          <div className="bg-gray-300 h-6 w-80 mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        {book ? (
          <>
            <h1 className="text-4xl font-bold mb-4 text-center text-indigo-600">
              {book.title}
            </h1>
            <div className="mb-6 text-lg text-gray-700">
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Year Published:</strong> {book.yearPublished}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Link
                to={`/books/edit/${book._id}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out"
              >
                Delete
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">Book not found</div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
