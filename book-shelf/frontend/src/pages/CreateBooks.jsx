import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Real-time validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    if (name === "title" && !value.trim()) newErrors.title = "Title is required";
    else delete newErrors.title;

    if (name === "author" && !value.trim()) newErrors.author = "Author is required";
    else delete newErrors.author;

    if (name === "publishYear") {
      if (!value) newErrors.publishYear = "Publish year is required";
      else if (!Number.isInteger(Number(value)) || Number(value) < 0)
        newErrors.publishYear = "Publish year must be a valid positive number";
      else delete newErrors.publishYear;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === "publishYear" ? (Number(value) || value) : value,
    }));
    validateField(name, value); // Real-time validation
  };

  const handleSaveBook = async () => {
    const isValid = Object.keys(errors).length === 0 && Object.values(book).every((val) => val !== "");
    if (!isValid) {
      enqueueSnackbar("Please fix the errors in the form", { variant: "error" });
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5555/books", {
        ...book,
        publishYear: Number(book.publishYear),
      });
      enqueueSnackbar("Book Created Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Failed to create book. Please try again.", { variant: "error" });
      console.error("Error creating book:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setBook({ title: "", author: "", publishYear: "" });
    setErrors({});
    enqueueSnackbar("Form reset", { variant: "info" });
  };

  const handleCancel = () => {
    navigate("/");
  };

  // Auto-focus on title field on mount
  useEffect(() => {
    document.querySelector("input[name='title']").focus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">Add New Book</h1>
          <BackButton />
        </div>

        {loading && (
          <div className="flex justify-center mb-6">
            <Spinner />
          </div>
        )}

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 text-gray-900 bg-gray-50 border ${errors.title ? "border-red-400" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed`}
              placeholder="Enter book title"
              disabled={loading}
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 text-gray-900 bg-gray-50 border ${errors.author ? "border-red-400" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed`}
              placeholder="Enter author name"
              disabled={loading}
            />
            {errors.author && <p className="mt-1 text-xs text-red-600">{errors.author}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Publish Year</label>
            <input
              type="number"
              name="publishYear"
              value={book.publishYear}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 text-gray-900 bg-gray-50 border ${errors.publishYear ? "border-red-400" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed`}
              placeholder="Enter publish year"
              disabled={loading}
            />
            {errors.publishYear && <p className="mt-1 text-xs text-red-600">{errors.publishYear}</p>}
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleSaveBook}
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? "Saving..." : "Save Book"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 py-2.5 px-4 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBooks;