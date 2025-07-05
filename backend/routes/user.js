const router = require("express").Router();
const User = require('../models/user');  // Ensure the correct path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {authentacateToken} = require('./userAuth')
router.post("/sign-up", async (req, res) => {
    const { userName, email, password, address, role } = req.body;  // Use `username` to match the request body
    try {
        if (userName.length < 2) {
            return res.status(400).json({ message: "Username should be greater than 2 characters" });
        }

        const existingUser = await User.findOne({ userName: userName });  // Use `findOne` for single document check
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 5) {
            return res.status(400).json({ message: "Password length should be greater than 5" });
        }
        const hashpass = await bcrypt.hash(password,10)
        const newUser = new User({
            userName: userName,  
            email: email,
            password: hashpass,
            address: address,
            role: role,
        });

        await newUser.save();
        return res.status(200).json({ message: "Sign up successful." });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

router.post("/sign-in", async (req,res) => {
    try {
        const {userName,password} = req.body;
        const existingUser = await User.findOne({ userName: userName });
        if(!existingUser){
            res.status(400).json({ message: "Invalid credentials", error: error.message });
        }
        await bcrypt.compare(password,existingUser.password,(err,data) => {
            if(data){
                const authClaims = [
                    {name: existingUser.userName },
                    {role: existingUser.role}
                ]
                const token = jwt.sign({authClaims},'bookstore',{
                    expiresIn:"10d",
                })
                res.status(200).json({
                    id:existingUser._id,
                    role: existingUser.role,
                    token
                })
            }else{
                res.status(400).json({ message: "Invalid credentials", error: error.message });
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
})

router.get("/get-user-information",authentacateToken, async (req,res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select('-password')
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }
})

router.put("/update-address",authentacateToken,async (req,res)=> {
    try {
            const {id} = req.headers;
            const {address} = req.body;
            await User.findByIdAndUpdate(id,{address:address})
            res.status(200).json({message: "Address updated successfully"})
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });

    }

})

module.exports = router;
