import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set("strictQuery", true);
    const options = { serverSelectionTimeoutMS: 30000, socketTimeoutMS: 45000 };

    mongoose
        .connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch((error) => console.log(error));
};

export default connectDB;
