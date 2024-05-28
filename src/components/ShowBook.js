import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../GlobleContext/AuthContext";
import toast from "react-hot-toast";
import { addItems } from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const ShowBook = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { BookUser } = useAuthContext();
  const [book, setBook] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dIsLoading, setDisLoading] = useState(null);
  const [cIsLoading, setCisLoading] = useState(null);

  useEffect(() => {
    if (BookUser) {
      axios
        .get(`/api/books/${id}`, {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        })
        .then((response) => {
          setBook(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [id, BookUser]);

  const handleDelete = () => {
    setDisLoading(true);
    axios
      .delete(`/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${BookUser?.token}`,
        },
      })
      .then((response) => {
        setDisLoading(false);
        if (response.status === 200) {
          toast.success("Book deleted successfully");
          navigate("/books");
        } else {
          throw new Error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete the book");
        setDisLoading(false);
      });
  };
  console.log(dIsLoading);

  const handleAddToCart = async () => {
    setCisLoading(true);
    axios
      .post(
        `/api/cart/${book?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        }
      )
      .then((response) => {
        setCisLoading(false);
        console.log(response);
        dispatch(addItems(book));
        console.log("Add to cart:", book._id);
        toast.success("Book added to cart");
      })
      .catch((err) => {
        setCisLoading(false);
        console.log(err);
        toast.error("Failed to add to cart");
      });
  };

  if (loading) {
    return <Shimmer />;
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
                <strong>Price:</strong> {book.price}
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
                disabled={dIsLoading}
                onClick={handleDelete}
                className={`${
                  dIsLoading
                    ? "bg-gray-400 cursor-not-allowed "
                    : "bg-red-500 hover:bg-red-700 text-white"
                } font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out`}
              >
                Delete
              </button>
              <button
                disabled={cIsLoading}
                onClick={handleAddToCart}
                className={`${
                  cIsLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-700 text-white "
                } font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out`}
              >
                Add to Cart
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

const Shimmer = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 w-2/3 mb-4 rounded-full"></div>
          <div className="h-8 bg-gray-200 w-full mb-2 rounded-full"></div>
          <div className="h-8 bg-gray-200 w-full mb-2 rounded-full"></div>
          <div className="h-8 bg-gray-200 w-full mb-2 rounded-full"></div>
          <div className="h-8 bg-gray-200 w-full mb-2 rounded-full"></div>
          <div className="flex justify-center space-x-4">
            <div className="h-8 bg-gray-200 w-2/3 mb-2 rounded-full"></div>
            <div className="h-8 bg-gray-200 w-2/3 mb-2 rounded-full"></div>
            <div className="h-8 bg-gray-200 w-2/3 mb-2 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
