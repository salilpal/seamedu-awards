import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";
import { FaBookOpen } from "react-icons/fa";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
        enqueueSnackbar("Failed to load book details", { variant: "error" });
        setLoading(false);
      });
  }, [id, enqueueSnackbar]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEditClick = () => {
    navigate(`/books/edit/${id}`);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(book._id || "");
    enqueueSnackbar("Book ID copied to clipboard", { variant: "success" });
  };

  const handleReadMeClick = () => {
    setShowDescription(!showDescription);
  };

  const description =
    book.description ||
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi vero harum officia illum! Recusandae totam est porro quas fugiat, animi pariatur beatae labore eaque non accusamus iste at sint mollitia.";

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Book Details</h1>
          <BackButton />
        </div>

        {loading ? (
          <div className="flex justify-center mb-6">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">ID</span>
              <div className="flex items-center gap-x-2">
                <span className="text-gray-900">{book._id || "N/A"}</span>
                <button
                  onClick={handleCopyId}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                  title="Copy ID"
                  aria-label="Copy book ID"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">Title</span>
              <span className="text-xl font-semibold text-gray-900">{book.title || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">Author</span>
              <span className="text-gray-900">{book.author || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">Publish Year</span>
              <span className="text-gray-900">{book.publishYear || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">Created At</span>
              <span className="text-gray-900">
                {book.createdAt ? formatDate(book.createdAt) : "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-600">Last Updated At</span>
              <span className="text-gray-900">
                {book.updatedAt ? formatDate(book.updatedAt) : "N/A"}
              </span>
            </div>
            {book.readLink && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">Read Online</span>
                <a
                  href={book.readLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline flex items-center gap-x-2"
                  aria-label="Read book online"
                >
                  <FaBookOpen className="text-xl" />
                  Open Book
                </a>
              </div>
            )}
            <div className="flex flex-col">
              <button
                onClick={handleReadMeClick}
                className="flex items-center gap-x-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                aria-label={showDescription ? "Hide description" : "Show description"}
              >
                <FaBookOpen className="text-xl" />
                <span>{showDescription ? "Hide Description" : "Read Me"}</span>
              </button>
              {showDescription && (
                <p className="mt-2 text-sm text-gray-600 leading-relaxed bg-gray-100 p-4 rounded-lg animate-fade-in">
                  {description}
                </p>
              )}
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleEditClick}
                className="flex-1 py-2.5 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
              >
                Edit Book
              </button>
              {book.readLink && (
                <a
                  href={book.readLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 text-center"
                >
                  Read Book
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;