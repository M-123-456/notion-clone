import express from 'express';
import cors from 'cors';

import './src/v1/db/db.js';
import authRoute from './src/v1/routes/auth.js';
import memoRoute from './src/v1/routes/memo.js';


const PORT = 5000;

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/memo', memoRoute);


app.listen(PORT, () => {
    console.log('Local sever running...')
});