const mongoose = require("mongoose");
const user = require("./user");

const order = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed","Out for delivery","Delivered","Canceled"]
    }
},
{timestamps: true})


const Order = mongoose.model("order",order)
module.exports = Order;