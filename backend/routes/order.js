const router = require("express").Router();
const User = require('../models/user');  // Ensure the correct path
const {authentacateToken} = require('./userAuth')
const Book = require('../models/book')
const Order = require('../models/orders')

router.post("/place-order",authentacateToken,async (req,res) => {
    try {
        const {id} = req.headers;
        const {order} = req.body;
        for(const orderData of order){
            const newOrder = new Order({user:id,book:orderData._id});
            const orderDataFromDb = await newOrder.save();

            await User.findByIdAndUpdate(id,{
                $push: {orders:orderDataFromDb._id}
            })
            await User.findByIdAndUpdate(id,{
                $pull: {cart:orderData._id}
            })
            return res.json({
                status:"Success",
                message:"Order placed successfully"
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
}) 

router.get("/get-order-history",authentacateToken, async(req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path:"orders",
            populate: {path: "book"}
        })

        const orderData = userData.orders.reverse();
        return res.json({
            status:"Success",
            data:orderData,
        })
    } catch (error) {
           res.status(500).json({ message: "Internal server error", error: error.message });

    }
}) 
router.get("/get-all-orders",authentacateToken, async(req,res)=>{
    try {
        const userData = await Order.find.populate({
            populate: {path: "book"}
        })
        .populate({
            path:"user",
        }).sort({createdAt : -1})

        return res.json({
            status:"Success",
            data:userData,
        })
    } catch (error) {
           res.status(500).json({ message: "Internal server error", error: error.message });

    }
})
router.put("/update-status/:id",authentacateToken,async (req,res) => {
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"Success",
            message:"Status updated successfully"
        })
    } catch (error) {
                   res.status(500).json({ message: "Internal server error", error: error.message });
    }
})
module.exports = router;