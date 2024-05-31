import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import { getAllStudents, getStudentById } from './services/students.js';
import mongoose from 'mongoose';

const PORT = env(ENV_VARS.PORT, 3000);

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json({ data: students });
  });

  app.get('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        data: 'ID is not valid',
      });
    }
    const student = await getStudentById(studentId);
    res.status(200).json({ data: student });
  });

  // Not Found middleware
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not Found!',
    });
  });

  // Error Handler
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
