import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../GlobleContext/AuthContext";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { BookUser } = useAuthContext();

  useEffect(() => {
    const fetchBooks = async () => {
      if (BookUser?.token) {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `/api/books?page=${currentPage}&limit=10`,
            {
              headers: {
                Authorization: `Bearer ${BookUser?.token}`,
              },
            }
          );
          setBooks(response.data.books);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error("Error fetching books:", error);
          setError(
            error.response
              ? error.response.data.error
              : "An unexpected error occurred"
          );
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No token found, skipping book fetch");
      }
    };
    if (BookUser) {
      fetchBooks();
    }
  }, [currentPage, BookUser]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center text-indigo-600">
        Book List
      </h1>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {loading ? (
        <div className="space-y-4">
          <Shimmer />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="py-2 px-4 text-left">Title</th>
                  <th className="py-2 px-4 text-left">Author</th>
                  <th className="py-2 px-4 text-left">Genre</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Year Published</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-indigo-100 transition duration-200 ease-in-out cursor-pointer"
                    onClick={() => navigate(`/books/${book._id}`)}
                  >
                    <td className="py-2 px-4 border-b">{book.title}</td>
                    <td className="py-2 px-4 border-b">{book.author}</td>
                    <td className="py-2 px-4 border-b">{book.genre}</td>
                    <td className="py-2 px-4 border-b">{book.price}</td>
                    <td className="py-2 px-4 border-b">{book.yearPublished}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 flex-wrap gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 transition duration-200 ease-in-out"
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-4 py-2 rounded transition duration-200 ease-in-out ${
                  page + 1 === currentPage
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 transition duration-200 ease-in-out"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Shimmer = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Author</th>
              <th className="py-2 px-4 text-left">Genre</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Year Published</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-4 px-6">
                  <div className="h-2 bg-gray-200 w-64 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-2 bg-gray-200 w-40 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-2 bg-gray-200 w-32 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-2 bg-gray-200 w-20 rounded animate-pulse"></div>
                </td>
                <td className="py-4 px-6">
                  <div className="h-2 bg-gray-200 w-24 rounded animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 flex-wrap gap-2">
        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 transition duration-200 ease-in-out animate-pulse">
          Previous
        </button>
        {[...Array(3)].map((_, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 transition duration-200 ease-in-out animate-pulse"
          >
            {index + 1}
          </button>
        ))}
        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 transition duration-200 ease-in-out animate-pulse">
          Next
        </button>
      </div>
    </>
  );
};

export default BookList;
