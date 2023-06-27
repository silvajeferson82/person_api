import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(
  cors({
    exposedHeaders: ['x-total-count', 'Content-Type', 'Content-Length']
  })
);

app.use(
  express.json({
    type: ['application/json', 'text/plain']
  })
);

app.use(routes);

export { app };
