const config = require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('./libraries/authenticate');

const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require('./routes');

const port = config.server.port;
const app = express();

require('./libraries/promisify-all')(['mongoose']);

mongoose.connect(config.mongo.url);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// passport config
app.use(passport.initialize());

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

app.listen(port, () => { console.log(`Magic happens on port ${port}`); });

module.exports = app;
