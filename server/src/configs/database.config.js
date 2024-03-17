import mongoose from "mongoose";

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING, {
            dbName: 'Netflix',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected...");
    } catch (error) {
        console.error("Error connecting MongoDS:", error.message);
        process.exit(1);
    }
}

export {
    connectDB
}
