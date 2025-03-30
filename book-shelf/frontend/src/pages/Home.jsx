import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");
  const [search, setSearch] = useState("");
  const [filterYear, setFilterYear] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase());
    const matchesYear = filterYear ? book.publishYear.toString() === filterYear : true;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-8 mb-8 shadow-lg">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">Discover Your Next Favorite Book</h1>
          <p className="text-lg mb-6">Explore, manage, and read your book collection with ease.</p>
          <Link
            to="/books/create"
            className="inline-flex items-center gap-x-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-100 transition-all duration-300"
          >
            <MdOutlineAddBox className="text-xl" />
            Add a Book
          </Link>
        </div>
        <div className="absolute -bottom-10 right-10 opacity-20">
          <svg className="w-40 h-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-x-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
          <input
            type="number"
            placeholder="Filter by year..."
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          />
        </div>
        <div className="flex gap-x-2">
          <button
            onClick={() => setShowType("card")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${showType === "card" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Card View
          </button>
          <button
            onClick={() => setShowType("table")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${showType === "table" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            Table View
          </button>
        </div>
      </div>

      {/* Books Display */}
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center text-gray-500">
          No books found.{" "}
          <Link to="/books/create" className="text-indigo-600 hover:underline">
            Add a new book
          </Link>
        </div>
      ) : showType === "table" ? (
        <BooksTable books={filteredBooks} />
      ) : (
        <BooksCard books={filteredBooks} />
      )}
    </div>
  );
};

export default Home;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Spinner from "../components/Spinner";
// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
// import BooksCard from "../components/home/bookscard";
// import BooksTable from "../components/home/BooksTable";

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showType, setShowType] = useState("table");
//   const [search, setSearch] = useState(""); // Added search state

//   // Fetch books from the backend
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("http://localhost:5555/books")
//       .then((response) => {
//         console.log("API Response:", response.data);
//         setBooks(response.data.data || []); // Fallback to empty array if data is undefined
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//         setLoading(false);
//       });
//   }, []);

//   // Handle search input
//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//   };

//   // Filter books based on search input
//   const filteredBooks = books.filter(
//     (book) =>
//       book.title.toLowerCase().includes(search.toLowerCase()) ||
//       book.author.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-indigo-600 text-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
//           <h1 className="text-3xl font-bold">BookShelf</h1>
//           <div className="flex items-center space-x-4">
//             <Link to="/books/create">
//               <button className="py-2 px-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 flex items-center">
//                 <MdOutlineAddBox className="mr-2 text-xl" />
//                 Add Book
//               </button>
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {/* Search and View Toggle */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//           <input
//             type="text"
//             value={search}
//             onChange={handleSearch}
//             placeholder="Search books by title or author..."
//             className="w-full sm:max-w-md px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
//           />
//           <div className="flex gap-x-4">
//             <button
//               onClick={() => setShowType("table")}
//               className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
//                 showType === "table"
//                   ? "bg-indigo-600 text-white"
//                   : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
//               }`}
//             >
//               Table View
//             </button>
//             <button
//               onClick={() => setShowType("card")}
//               className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
//                 showType === "card"
//                   ? "bg-indigo-600 text-white"
//                   : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
//               }`}
//             >
//               Card View
//             </button>
//           </div>
//         </div>

//         {/* Books Display */}
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <Spinner />
//           </div>
//         ) : filteredBooks.length > 0 ? (
//           showType === "table" ? (
//             <BooksTable books={filteredBooks} />
//           ) : (
//             <BooksCard books={filteredBooks} />
//           )
//         ) : (
//           <p className="text-gray-600 text-center py-12">No books found matching your search.</p>
//         )}
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-4">
//         <div className="max-w-7xl mx-auto px-4 text-center">
//           <p>© 2025 BookShelf. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;