const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load env vars
dotenv.config({ path: `${__dirname}/config/config.env` });

// Connect to database
connectDB();

const app = express();

// Middlewares
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50
});
app.use(
    express.json(),         // Body Parser
    cookieParser(),         // Cookie Parser
    fileupload(),           // FileUpload
    mongoSanitize(),        // Prevent user injections
    xss(),                  // Prevent XSS
    helmet(),               // Security headers
    hpp(),                  // Prevent query polution
    limiter,                // Limit user requests
    express.static(path.join(__dirname, 'public'))
);

// Morgan log
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Routes
app.use('/api/v1/posts', require('./routes/posts'));
app.use('/api/v1/auth', require('./routes/auth'));

// Custom error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server runinning at port ${PORT}`));

// Handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(err.stack);
    server.close(() => process.exit(1));
});