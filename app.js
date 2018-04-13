const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const filesRouter = require('./routes/files');

const app = express();

const https = require('https');
const fs = require('fs-extra');
const http = require('http');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem');


const helmet = require('helmet');
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/files', filesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const picSchema = new Schema({
  time: Date,
  category: String,
  title: String,
  details: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  thumbnail: String,
  image: String,
  original: String,
});

const Pic = mongoose.model('Pic', picSchema);

mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`).
    then(() => {
      console.log('Connected successfully.');
      http.createServer((req, res) => {
        res.writeHead(301, {
          'Location': `https://${process.env.APP_HOST}:${process.env.APP_PORT}` +
          req.url,
        });
        res.end();
      }).listen(8080);
      const options = {
        key: sslkey,
        cert: sslcert,
      };
      https.createServer(options, app).listen(process.env.APP_PORT);
    }, err => {
      console.log('Connection to db failed: ' + err);
    });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
app.set('Pic',Pic);