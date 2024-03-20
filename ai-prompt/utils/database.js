import mongoose from 'mongoose';


export const connectToDB = async () => {
    let isConnected = false
    mongoose.set('strictQuery', true);
    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {dbName: "share_prompt"});
        isConnected = true;
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}