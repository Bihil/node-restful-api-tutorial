const express = require('express');
const app = express();
const morgan = require('morgan');
const boadyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@eosterms-shard-00-00-by5b6.mongodb.net:27017,eosterms-shard-00-01-by5b6.mongodb.net:27017,eosterms-shard-00-02-by5b6.mongodb.net:27017/test?ssl=true&replicaSet=EOSTerms-shard-0&authSource=admin&retryWrites=true',
{
 
 promiseLibrary: global.Promise 
});



app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(boadyParser.urlencoded({
 extended: false
}));
app.use(boadyParser.json());

app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*');
 res.header(
  'Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization'
 );
 if (req.method === 'OPTIONS') {
  res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
  return res.status(200).json({});
 }
 next();
});

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
 const error = new Error('Not found');
 error.status = 404;
 next(error);
});

app.use((error, req, res, next) => {
 res.status(error.status || 500);
 res.json({
  error: {
   message: error.message
  }
 });
});

module.exports = app;