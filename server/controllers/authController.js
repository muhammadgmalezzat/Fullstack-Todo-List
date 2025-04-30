import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import userModel from "../models/userModel.js";
import validator from "validator";
import Todo from "../models/todoModel.js";

//              ✅ Authentication Controller functions            
const registerUser = async (req, res) => { 
    try {
        const { name, email, password, phone } = req.body;
    
    //checking for validation errors

    //1- chack if thers is missing data
    if (!name || !email || !password || !phone) {
        return res.json({ success: false, message: "Please fill all the fields" });
    }
    //2- check email format is valid
    if (!validator.isEmail(email)) {
        return res.json({ success: false, message: "Please enter a valid email" });
    }
    //3- check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.json({ success: false, message: "Email already exists" });
    }
    //4- check if password is valid
    if (password.length < 8) {
        return res.json({ success: false, message: "Password must be at least 6 characters" });
    }
    //5- check if phone is valid
    if (!validator.isMobilePhone(phone,'ar-EG')) {
        return res.json({ success: false, message: "Please enter a valid phone number" });
    }

    //encrypting the password
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the user
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone
        }).save();
        // Generate JWT token with expiration
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ success: true, token, message: "User registered successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => { 
    try {
        const { email, password } = req.body;
        //checking for validation errors

        //1- chack if thers is missing data
        if (!email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }
        //2- check email format is valid
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        //3- check if email already exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Email not found" });
        }
        //4- check if password is valid
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token, message: "User logged in successfully" });
        } else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        res.json({ success: false, message: error.message })
        
    }
}

const logoutUser = async (req, res) => { 
    try {
        res.clearCookie("token");
        res.json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export {
    registerUser,
    loginUser,
    logoutUser
};