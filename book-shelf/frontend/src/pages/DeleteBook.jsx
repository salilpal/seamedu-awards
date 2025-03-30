import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [bookTitle, setBookTitle] = useState(""); // To display the book title
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  // Fetch book title on mount for confirmation
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBookTitle(response.data.title || "this book"); // Fallback if title is missing
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to load book details", { variant: "error" });
        console.error("Error fetching book:", error);
      });
  }, [id, enqueueSnackbar]);

  // Handle book deletion
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Failed to delete book", { variant: "error" });
        console.error("Error deleting book:", error);
      });
  };

  // Cancel deletion and navigate back
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Delete Book</h1>
          <BackButton />
        </div>

        {loading && (
          <div className="flex justify-center mb-6">
            <Spinner />
          </div>
        )}

        <div className="flex flex-col items-center space-y-6">
          <h3 className="text-lg font-medium text-gray-700 text-center">
            Are you sure you want to delete <span className="font-semibold text-red-600">"{bookTitle}"</span>?
          </h3>
          <p className="text-sm text-gray-500 text-center">
            This action cannot be undone.
          </p>

          <div className="flex w-full space-x-4">
            <button
              onClick={handleDeleteBook}
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-300 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? "Deleting..." : "Yes, Delete It"}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;