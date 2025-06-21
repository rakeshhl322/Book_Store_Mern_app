const mongoose = require("mongoose");
const user = require("./user");

const order = new mongoose.Schema({
    user:{
        type: mongoose.type.ObjectId,
        ref:"user",
    },
    book: {
        type: mongoose.type.ObjectId,
        ref: "books",
    },
    status: {
        type: String,
        default: "Order Placed",
        enum: ["Order Placed","Out for delivery","Delivered","Canceled"]
    }
},
{timestamps: true})


module.exports = ("order",order)