const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config({ path: `${__dirname}/config/config.env` });

// Connect to database
connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Morgan log
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/v1/posts', require('./routes/posts'));

// Custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server runinning at port ${PORT}`));

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(err.stack);
    server.close(() => process.exit(1));
});