import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../GlobleContext/AuthContext";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { BookUser } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    if (BookUser?.token) {
      axios
        .get(`/books?page=${currentPage}&limit=10`, {
          headers: {
            Authorization: `Bearer ${BookUser?.token}`,
          },
        })
        .then((response) => {
          setBooks(response.data.books);
          setTotalPages(response.data.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          // toast.error(error.message);
          // console.log(error);
          // console.log("Error: " + error.message);
          setLoading(false);
        });
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
      {loading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, index) => (
            <Shimmer key={index} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Author</th>
                <th className="py-2 px-4 text-left">Genre</th>
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
                  <td className="py-2 px-4 border-b">{book.yearPublished}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-3/4 animate-shimmer"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded animate-shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 rounded w-5/6 animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default BookList;
