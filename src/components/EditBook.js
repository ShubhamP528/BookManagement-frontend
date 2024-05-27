import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookForm from "./BookFrom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../GlobleContext/AuthContext";
import toast from "react-hot-toast";

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { BookUser } = useAuthContext();

  useEffect(() => {
    if (BookUser) {
      axios
        .get(`https://book-management-backend-psi.vercel.app/books/${id}`, {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        })
        .then((response) => setBook(response.data))
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    }
  }, [id, BookUser]);

  const handleSave = (bookData) => {
    axios
      .put(
        `https://book-management-backend-psi.vercel.app/books/${id}`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/books");
          toast.success(response.data.title + " Updated");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h2 className="text-xl font-bold mb-4">Edit Book</h2> */}
      {book ? <BookForm book={book} onSave={handleSave} /> : <Shimmer />}
    </div>
  );
};

export default EditBook;

const Shimmer = () => {
  return (
    <form className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <div className="animate-pulse">
        <div className="flex justify-center mb-6">
          <div className="w-40 h-10 bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-sm font-medium text-gray-600">
            Author
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-sm font-medium text-gray-600">
            Genre
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            type="number"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200"
            disabled
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="mb-2 text-sm font-medium text-gray-600">
            Year Published
          </label>
          <input
            type="number"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-200"
            disabled
          />
        </div>
        <button
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
          disabled
        >
          Add Book
        </button>
      </div>
    </form>
  );
};
