import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "FinGuard_test", // if this DB does not exist, mongodb atlas will create a new db of this name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('------------------ MongoDB connected -------------------')
  } catch (error) {
    console.log('----------- MongoDB connection error:', error);
  }
}