import mongoose from 'mongoose';

const connectMongoDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error in connection MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDb;