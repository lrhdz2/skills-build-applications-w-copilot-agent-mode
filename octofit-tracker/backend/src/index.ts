import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import apiRouter from './api/index.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected at ${MONGO_URI}`);

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start backend', error);
    process.exit(1);
  }
};

void startServer();
