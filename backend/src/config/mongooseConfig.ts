import mongoose from 'mongoose';
import { config } from './config.js';

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.dbUri);
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Database disconnected');
  } catch (err) {
    console.error('Database disconnection error:', err);
  }
};