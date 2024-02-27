import mongoose from "mongoose";

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Db connect successfully")
    } catch(error) {
        console.log("Error connection to db", error.message)
    }
}

export default connectDb;