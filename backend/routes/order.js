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

            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id }
            }, { new: true });

            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            }, { new: true });
        }
        return res.json({
            status:"Success",
            message:"Order(s) placed successfully"
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
}) 

router.get("/get-order-history",authentacateToken, async(req,res)=>{
    try {
        const { id } = req.headers; // Add this line to retrieve the user's ID
        // Ensure the field name matches your User schema (e.g., "orders")
        const userData = await User.findById(id)
           
        if (!userData) {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }


        const orderData = userData.orders && userData.orders.length ? userData.orders.slice().reverse() : [];
        // Populate the orders array with book details
        const orders = await Order.find({ _id: { $in: orderData } });
        // Manually fetch book details for each order
        const ordersWithBookDetails = await Promise.all(
            orders.map(async (order) => {
                const book = await Book.findById(order.book);
                return {
                    ...order.toObject(),
                    book: book ? book.toObject() : null
                };
            })
        );

        return res.status(200).json({
            status: "Success",
            data: ordersWithBookDetails,
        });
    } catch (error) {
           res.status(500).json({ message: "Internal server error", error: error.message });

    }
}) 
router.get("/get-all-orders",authentacateToken, async(req,res)=>{
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        // Manually fetch user and book details for each order
        const userData = await Promise.all(
            orders.map(async (order) => {
            const user = await User.findById(order.user);
            const book = await Book.findById(order.book);
            return {
                ...order.toObject(),
                user: user ? user.toObject() : null,
                book: book ? book.toObject() : null
            };
            })
        );
        return res.status(200).json({
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