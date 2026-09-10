import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/schemesaathi');
    console.log(`[Admin Backend] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Admin Backend] MongoDB connection warning: ${error.message}. Running in standalone mode.`);
  }
};
