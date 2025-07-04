const mongoose = require("mongoose");
const user = require("./user");

const book = new mongoose.Schema({

    url:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    author:{
        type:String,
        required: true,
    },
    desc:{
        type:String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
    }
},
{timestamps: true})


const Book = mongoose.model("books",book)
module.exports = Book;