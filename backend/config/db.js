import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Database connect successfully'))
    } catch (error) {
        console.log('Database connect lost', error);
    };
};

export default connectDB;