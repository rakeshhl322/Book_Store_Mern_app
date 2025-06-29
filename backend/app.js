const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
require("./conn/conn")
const user = require("./routes/user")
const books = require("./routes/book")
const favourites = require("./routes/favourites")
const  cart = require("./routes/cart")
app.use(express.json())
app.use(cors())
app.use("/api/v1",user)
app.use("/api/v1",books)
app.use("/api/v1",favourites)
app.use("/api/v1",cart)
app.listen(process.env.PORT, () => {
    console.log("server started",process.env.PORT)
})