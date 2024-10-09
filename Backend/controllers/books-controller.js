const Book = require("../model/Book");

    //getAllBooks

const getAllBooks = async (req, res, next) => {
    let books;
    try {
      books = await Book.find();
    } catch (err) {
      console.log(err);
    }
  
    if (!books) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({ books });
  };
  
  //getById
  
  const getById = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
      book = await Book.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (!book) {
      return res.status(404).json({ message: "No Book found" });
    }
    return res.status(200).json({ book });
  };
  
  //addBook

  const addBook = async (req, res, next) => {
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
      book = new Book({
        name,
        author,
        description,
        price,
        available,
        image
      });
      await book.save();
    } catch (err) {
      console.log(err);
    }
  
    if (!book) {
      return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ book });
  };

  //Update

  const updateBook = async (req, res, next) => {
    const id = req.params.id;
    const { name, author, description, price, available, image } = req.body;
    let book;
    try{
        book = await Book.findByIdAndUpdate(id, {
            name,
            author, 
            description, 
            price, 
            available,
            image
        });

        book = await book.save();
    } catch (err) {
        console.log(err);
    }

    if (!book) {
        return res.status(404).json({ message: "Unable To update by this ID" });
      }
      return res.status(200).json({ book });
  };

  //Delete

  const deleteBook = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try{
        book = await Book.findByIdAndDelete(id)
    } catch (err) {
        console.log(err);
    }

    if(!book) {
        return res.status(404).json({ message: "Unable to Delete By this ID"});
    }
    return res.status(200).json({ message: "Product Deleted Successfully" });
  }
  
exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getById = getById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;