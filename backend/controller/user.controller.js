import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        const loggedUserId=  req.user._id;
        const users = await User.find({_id: {$ne: loggedUserId}}).select("-password");
        res.status(200).json(users);
    } catch(error) {
        console.error("Error in get users", error.message);
        res.status(500).json({error: "Inernal server error"});
    }
}