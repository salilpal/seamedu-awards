import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaUserCircle } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-all duration-300 group">
      <span className="absolute top-3 right-3 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
        {book.publishYear || "N/A"}
      </span>
      <div className="flex items-center gap-x-2 mb-2">
        <FaBookOpen className="text-indigo-500 text-xl" />
        <h2 className="text-lg font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors duration-300" title={book.title}>
          {book.title || "Untitled"}
        </h2>
      </div>
      <div className="flex items-center gap-x-2 mb-4">
        <FaUserCircle className="text-indigo-500 text-xl" />
        <p className="text-gray-600 truncate" title={book.author}>
          {book.author || "Unknown Author"}
        </p>
      </div>
      <div className="flex justify-between items-center gap-x-2 border-t pt-4">
        <button
          onClick={() => setShowModal(true)}
          className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
          title="Quick View"
          aria-label="Quick view of book"
        >
          <BsInfoCircle className="text-xl" />
        </button>
        <Link
          to={`/books/details/${book._id}`}
          className="text-green-600 hover:text-green-800 transition-colors duration-300"
          title="View Details"
          aria-label="View book details"
        >
          <BsInfoCircle className="text-xl" />
        </Link>
        <Link
          to={`/books/edit/${book._id}`}
          className="text-yellow-600 hover:text-yellow-800 transition-colors duration-300"
          title="Edit Book"
          aria-label="Edit book"
        >
          <AiOutlineEdit className="text-xl" />
        </Link>
        <Link
          to={`/books/delete/${book._id}`}
          className="text-red-600 hover:text-red-800 transition-colors duration-300"
          title="Delete Book"
          aria-label="Delete book"
        >
          <MdOutlineDelete className="text-xl" />
        </Link>
        {book.readLink ? (
          <a
            href={book.readLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
            title="Read Book"
            aria-label="Read book online"
          >
            <FaBookOpen className="text-xl" />
          </a>
        ) : (
          <span className="text-gray-400 cursor-not-allowed" title="No read link available">
            <FaBookOpen className="text-xl" />
          </span>
        )}
      </div>
      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BookSingleCard;