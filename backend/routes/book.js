const router = require("express").Router();
const User = require('../models/user');  // Ensure the correct path
const {authentacateToken} = require('./userAuth')
const Book =require('./../models/book')
router.post("/add-book",authentacateToken,async (req,res) => {
    const {url,title,author,price,desc,language} = req.body;
    const {id} = req.headers;
    const user = await User.findById(id);
    if(user.role !== "admin"){
        return  res.status(400).json({ message: "You don't have access to perform the action" });
    }
    try {
            const book = new Book({
                url:url,
                title:title,
                author:author,
                price:price,
                desc:desc,
                language:language,
            })
            await book.save();
            res.status(200).json({message:"Book created successfully"})
    } catch (error) {
       res.status(500).json({ message: "Internal server error", error: error.message });
    }
})

router.put("/update-book/:id",authentacateToken, async (req,res)=> {
    try {
        const {url,title,author,price,desc,language} = req.body;
        const {id} = req.params; // Get book ID from URL parameter
        const userId = req.headers.id; // Get user ID from headers
        
        // Check if user is admin
        const user = await User.findById(userId);
        if(user.role !== "admin"){
            return res.status(400).json({ message: "You don't have access to perform the action" });
        }
        
        const updatedBook = await Book.findByIdAndUpdate(id,{
            url: url,
            title: title,
            author:author,
            price:price,
            desc:desc,
            language:language,
        }, { new: true } // Return the updated document
        );
        
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        
       return res.status(200).json({message:"Book updated successfully", data: updatedBook})
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });   
    }
})
router.get("/get-all-books",authentacateToken,async (req,res) => {
    try {
        const books = await Book.find().sort({createdAt:-1});
        return res.status(200).json({data:books,status:'success'})
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });   

    }
})
router.get("/get-recent-books",authentacateToken,async (req,res) => {
    try {
        const books = await Book.find().sort({createdAt:-1}).limit(4);
        return res.status(200).json({data:books,status:'success'})
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });   

    }
})
router.get("/get-book-by-id/:id", authentacateToken, async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the request parameters

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found", status: 'fail' });
        }

        return res.status(200).json({ data: book, status: 'success' });
    } catch (error) {
        console.error("Error fetching book by ID:", error); // Log any errors
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});



router.delete("/delete-book",authentacateToken, async(req,res) => {
    const {bookid} = req.headers;
    try {
        await Book.findByIdAndDelete(bookid);
               return res.status(200).json({message:"Book deleted successfully"})
        
    } catch (error) {
              res.status(500).json({ message: "Internal server error", error: error.message });
    }
})
module.exports = router;