import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-indigo-100 text-indigo-900">
            <th className="p-4 text-left text-sm font-semibold border-b border-indigo-200">No</th>
            <th className="p-4 text-left text-sm font-semibold border-b border-indigo-200">Title</th>
            <th className="p-4 text-left text-sm font-semibold border-b border-indigo-200 max-md:hidden">Author</th>
            <th className="p-4 text-left text-sm font-semibold border-b border-indigo-200">Publish Year</th>
            <th className="p-4 text-left text-sm font-semibold border-b border-indigo-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books && books.length > 0 ? (
            books.map((book, index) => (
              <tr
                key={book._id}
                className="hover:bg-gray-50 transition-all duration-200 border-b border-gray-200 last:border-b-0"
              >
                <td className="p-4 text-gray-700 text-center">{index + 1}</td>
                <td className="p-4 text-gray-900 truncate font-medium" title={book.title}>
                  {book.title || "Untitled"}
                </td>
                <td className="p-4 text-gray-700 truncate max-md:hidden" title={book.author}>
                  {book.author || "Unknown Author"}
                </td>
                <td className="p-4 text-gray-700 text-center">
                  {book.publishYear || "N/A"}
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link
                      to={`/books/details/${book._id}`}
                      title="View Details"
                      className="text-green-600 hover:text-green-800 transition-colors duration-300"
                      aria-label="View book details"
                    >
                      <BsInfoCircle className="text-xl" />
                    </Link>
                    <Link
                      to={`/books/edit/${book._id}`}
                      title="Edit Book"
                      className="text-yellow-600 hover:text-yellow-800 transition-colors duration-300"
                      aria-label="Edit book"
                    >
                      <AiOutlineEdit className="text-xl" />
                    </Link>
                    <Link
                      to={`/books/delete/${book._id}`}
                      title="Delete Book"
                      className="text-red-600 hover:text-red-800 transition-colors duration-300"
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
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-6 text-center text-gray-500">
                No books found.{" "}
                <Link to="/books/create" className="text-indigo-600 hover:underline">
                  Add a new book
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;