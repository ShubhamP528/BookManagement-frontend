import React, { useState, useEffect } from "react";

const BookForm = ({ book = {}, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    yearPublished: "",
    price: "",
  });

  useEffect(() => {
    if (book && Object.keys(book).length > 0) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        yearPublished: book.yearPublished || "",
        price: book.price || "",
      });
    }
  }, [book]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        {Object.keys(book).length > 0 ? "Edit Book" : "Add New Book"}
      </h2>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Author
        </label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Genre
        </label>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-600">
          Year Published
        </label>
        <input
          type="number"
          name="yearPublished"
          value={formData.yearPublished}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className={`w-full ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-500 hover:bg-indigo-600 text-white"
        } px-4 py-2 rounded-lg transition duration-200`}
      >
        {Object.keys(book).length > 0 ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
