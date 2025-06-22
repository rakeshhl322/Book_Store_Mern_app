const router = require("express").Router();
const User = require('../models/user');  // Ensure the correct path
const {authentacateToken} = require('./userAuth')

router.put("/add-to-cart", authentacateToken, async(req,res) => {
    try {
        const{bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookInCart =  userData.cart.includes(bookid);
         if(isBookInCart){
            return res.status(200).json({message:"Book is already in cart."})
        }
        await User.findByIdAndUpdate(id, {$push:{cart: bookid}})
        return res.status(200).json({message:"Book added to cart."})
 
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
})

router.put("/remove-book-from-cart/:bookid", authentacateToken, async (req,res) => {
    try {
        const bookid =req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id, {$pull: {orders:bookid}})
        return res.status(200).json({message:"Book removed from favourites."})

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
})

router.get("/get-user-cart",authentacateToken,async (req,res) => {
    try {
        const {id} =req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status:"Success",
            data: cart,
        })
    } catch (error) {
         res.status(500).json({ message: "Internal server error", error: error.message });
    }
})
module.exports = router