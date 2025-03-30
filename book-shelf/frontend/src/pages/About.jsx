import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl mb-6">About Us</h1>
        <div className="space-y-4 text-gray-600">
          <p>
            Welcome to <span className="font-semibold text-indigo-600">BookShelf</span>, your go-to platform for managing and exploring books!
          </p>
          <p>
            At BookShelf, we aim to make book management simple and enjoyable. Whether you're a book lover, a librarian, or just someone who wants to keep track of their reading list, our app provides an intuitive interface to create, edit, and explore books with ease.
          </p>
          <p>
            Our mission is to foster a love for reading by providing tools to organize your book collection and access your favorite reads online. We’re passionate about books and technology, and we’re excited to bring this experience to you.
          </p>
          <p>
            Have questions or feedback? Feel free to <a href="/contact" className="text-indigo-600 hover:underline">contact us</a>!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; // Ensure default export