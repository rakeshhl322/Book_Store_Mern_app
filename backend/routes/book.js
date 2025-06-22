const router = require("express").Router();
const User = require('../models/user');  // Ensure the correct path
const {authentacateToken} = require('./userAuth')
const Book =require('./../models/book')
router.post("/add-book",authentacateToken,async (req,res) => {
    console.log("inside add book")
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

router.put("/update-book",authentacateToken, async (req,res)=> {
    try {
        const {url,title,author,price,desc,language} = req.body;
        const {bookid} = req.headers;
         await Book.findByIdAndUpdate(bookid,{
            url: url,
            title: title,
            author:author,
             price:price,
            desc:desc,
            language:language,
        }
        );
       return res.status(200).json({message:"Book updated successfully"})
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });   
    }
})
router.get("/get-all-books",authentacateToken,async (req,res) => {
    try {
        const books = await Book.find.sort({createdAt:-1});
        return res.send(200).json({data:books,status:'success'})
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });   

    }
})
router.get("/get-recent-books",authentacateToken,async (req,res) => {
    try {
        const books = await Book.find.sort({createdAt:-1}).limit(4);
        return res.send(200).json({data:books,status:'success'})
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });   

    }
})
router.get("/get-book-by-id/:id",authentacateToken,async (req,res) => {
    try {
        const {bookid} = req.params
        const books = await Book.findById(bookid);
        return res.send(200).json({data:books,status:'success'})
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });   

    }
})


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