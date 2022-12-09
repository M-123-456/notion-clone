import mongoose from 'mongoose';

import '../config/config.js';

// connect to db
try {
    mongoose.connect(process.env.DB_URL);
    console.log('Connected to db');
} catch (err) {
    console.log(err);
}
