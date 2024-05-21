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
        .get(`/books/${id}`, {
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
      .put(`/books/${id}`, bookData, {
        headers: {
          Authorization: `Bearer ${BookUser?.token}`,
        },
      })
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
      {book ? (
        <BookForm book={book} onSave={handleSave} />
      ) : (
        <>
          <div className="animate-pulse ">
            <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded mb-4"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded mb-4"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded mb-4"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-10 bg-gray-300 rounded mb-6"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditBook;
