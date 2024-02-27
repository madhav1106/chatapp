import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/jwtToken.js";

export const signup = async (req, res) => {
    try{
        const {fullname, username, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Password does't match"});
        }

        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({error: "Username already exists"});
        }

        const profilePic = `https://avatar.iran.liara.run/public/${gender === "male"? 'boy': 'girl'}?username=${username}`;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullname, username, gender, profilePic,
            password: hashPassword
        });

        if(newUser) {
            // Generate token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
    
            return res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
                gender: newUser.gender
            });
        } else {
            res.status(400).json({error: "Invalid user data"});
        }
        
    } catch(error) {
        console.error("Error in signup", error.message);
        res.status(500).json({error: "Inernal server error"})
    }
}
export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id, res);
        return res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic,
            gender: user.gender
        });
    } catch(error) {
        console.error("Error in signup", error.message);
        res.status(500).json({error: "Inernal server error"})
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "Logged out successfully."})
    } catch(error) {
        console.error("Error in signup", error.message);
        res.status(500).json({error: "Inernal server error"})
    }
}