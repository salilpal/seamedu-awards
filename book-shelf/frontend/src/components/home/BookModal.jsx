import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  // Log the book object to debug
  console.log("Book object:", book);
  console.log("Book title:", book?.title);
  console.log("Book description:", book?.description);

  // Function to get custom description based on book title
  const getCustomDescription = (title) => {
    // Normalize the title: trim spaces and convert to lowercase for comparison
    const normalizedTitle = title?.trim().toLowerCase();
    console.log("Normalized title:", normalizedTitle);

    switch (normalizedTitle) {
      case "atomic habits":
        return "Discover how tiny changes in behavior can lead to remarkable results in personal growth and productivity.";
      case "the lean startup":
        return "Learn a method for building successful businesses through continuous innovation and customer feedback.";
      case "deep work":
        return "Master the art of focused work to achieve extraordinary results in a distracted world.";
      case "the psychology of money":
        return "Explore timeless lessons on wealth, behavior, and making better financial decisions.";
      default:
        return "A practical guide on how small habits lead to significant personal and professional growth.";
    }
  };

  // Use the book's description if available, otherwise use the custom one
  const description = book?.description || getCustomDescription(book?.title);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-xl p-6 relative shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <AiOutlineClose
          className="absolute right-4 top-4 text-2xl text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-200"
          onClick={onClose}
        />
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
          {book?.publishYear || "N/A"}
        </span>
        <h4 className="text-sm text-gray-500 truncate" title={book?._id}>
          ID: {book?._id || "N/A"}
        </h4>
        <div className="flex items-center gap-x-3 mt-4">
          <PiBookOpenTextLight className="text-indigo-500 text-2xl" />
          <h2 className="text-xl font-semibold text-gray-800 truncate" title={book?.title}>
            {book?.title || "Untitled"}
          </h2>
        </div>
        <div className="flex items-center gap-x-3 mt-2">
          <BiUserCircle className="text-indigo-500 text-2xl" />
          <h3 className="text-lg text-gray-700">{book?.author || "Unknown Author"}</h3>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 leading-relaxed">
            {description.length > 200 ? `${description.substring(0, 200)}...` : description}
          </p>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>Created: {book?.createdAt ? new Date(book.createdAt).toLocaleDateString() : "N/A"}</p>
          <p>Updated: {book?.updatedAt ? new Date(book.updatedAt).toLocaleDateString() : "N/A"}</p>
        </div>
        {book?.readLink && (
          <div className="mt-4">
            <a
              href={book.readLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 text-indigo-600 hover:underline"
            >
              <PiBookOpenTextLight className="text-xl" />
              <span>Read Book Online</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookModal;