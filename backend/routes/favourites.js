const router = require("express").Router();
const User = require('../models/user');  // Ensure the correct path
const {authentacateToken} = require('./userAuth')

router.put("/add-book-to-favourites", authentacateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);

    if (isBookFavourite) {
      return res.status(200).json({ message: "Book is already in favourites." });
    }

    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
    return res.status(200).json({ message: "Book added to favourites." });

  } catch (error) {
    console.error('Error:', error);
    if (!res.headersSent) {  // Check if the headers have already been sent
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
});

router.put("/remove-book-from-favourites", authentacateToken, async (req,res) => {
    try {
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, {$pull: {favourites:bookid}})
        }
        return res.status(200).json({message:"Book removed from favourites."})

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
})

router.get("/get-favourite-books", authentacateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");

    if (!userData) {
      // If no user is found, respond appropriately
      return res.status(404).json({ status: "Fail", message: "User not found" });
    }

    const favouriteBooks = userData.favourites;

    return res.status(200).json({
      status: "Success",
      data: favouriteBooks,
    });
  } catch (error) {
    // Log the error and send a response
    console.error("Error fetching favourite books:", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
});


module.exports = router;