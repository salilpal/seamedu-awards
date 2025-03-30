import express from "express";
import { Book } from "../models/book.Model.js";

const router = express.Router();

// Route for Saving a New Book
router.post("/", async (request, response) => {
  try {
    const { title, author, publishYear, readLink, description } = request.body;

    // Validation for required fields
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = { title, author, publishYear, readLink, description };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Get All Books
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Get a Book by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Update a Book
router.put("/:id", async (request, response) => {
  try {
    const { title, author, publishYear, readLink, description } = request.body;

    // Validation for required fields
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear, readLink, description },
      { new: true } // Return the updated document
    );

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Delete a Book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;