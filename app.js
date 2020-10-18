const express = require('express');
const app = express();
const morgan = require('morgan');
const transactionRoutes = require('./routes/api/transactions');
const path = require('path');

// Log request before processing them
app.use(morgan('dev'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable Cross Origin Sharing for everyone
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','*');

    // Handle initial OPTIONS request
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Serve API routes
app.use('/api/transactions',transactionRoutes);

// Serve static content in production
if(process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
    })
}

module.exports = app;