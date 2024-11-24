import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';

import router from './routers/contacts.js';
import authRouter from './routers/auth.js';

import cookieParser from 'cookie-parser';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(cookieParser());
  app.use(express.json());

  // app.use(logger);
  app.use('/auth', authRouter);
  app.use('/contacts', router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3000));
  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};
