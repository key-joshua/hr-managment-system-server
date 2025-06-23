import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import StatusCodes from 'http-status-codes';
import statusMonitor from 'express-status-monitor';

import "./configs/database";
import router from './routes';
import { corsOptions } from './utils/corsOptionsUtils';

dotenv.config();
const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(statusMonitor());
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`HR MANAGEMENT SYSTEM SERVER IS RUNNING ON PORT ${PORT}`);
});

app.get('**', (req, res) => {
  res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: 'WELCOME TO THE HR MANAGEMENT SERVER.' });
});

export default app;
