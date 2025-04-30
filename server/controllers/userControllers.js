import userModel from "../models/userModel.js";
import validator from "validator";

//              ✅ Exporting and updating user profile functions

const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');

        if (!user) {
            return res.json({ success: false,message: 'User not found' });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: 'Server error' });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const userId = req.userId;
        const user = await userModel.findById(userId).select('-password');
        if (!user) {
            return res.json({ success: false,message: 'User not found' });
        }
        if (!validator.isMobilePhone(phone,'ar-EG')) {
                return res.json({ success: false, message: "Please enter a valid phone number" });
            }
        user.name = name;
        user.phone = phone;
        await user.save();
        res.json({ success: true, message: 'User profile updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: 'Server error' });
    }
} 

export {
    getUserProfile,
    updateUserProfile
};