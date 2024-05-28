import React, { useState } from "react";
import BookForm from "./BookFrom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../GlobleContext/AuthContext";
import toast from "react-hot-toast";

const AddBook = () => {
  const navigate = useNavigate();
  const { BookUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(null);
  const handleSave = (bookData) => {
    setIsLoading(true);
    axios
      .post("/api/books", bookData, {
        headers: {
          Authorization: `Bearer ${BookUser?.token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/books");
          toast.success(response.data.title + " Added");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div className="container mx-auto p-4">
      {/* <h2 className="text-xl font-bold mb-4">Add Book</h2> */}
      <BookForm onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default AddBook;
