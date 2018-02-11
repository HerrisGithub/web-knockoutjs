var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var nedb = require('nedb');
var lunr = require('lunr');
var session = require('express-session');
var nedb_store = require('nedb-session-store')(session);


var db = new nedb();
db = {};
db.users = new nedb({ filename: 'data/users.db', autoload: true });
db.products = new nedb({ filename: 'data/products.db', autoload: true });
db.orders = new nedb({ filename: 'data/orders.db', autoload: true });


//#region  view engine
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
//#endregion
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "pAgGxo8Hzg7PFlv1HpO8Eg0Y6xtP7zYx",
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 10000,
    expires:new Date(253402300000000)
  },
  // store: new nedb_store({
  //   filename: 'data/sessions.db'
  // })
}));


app.use(function(req, res, next) {
  req.db = db;
  next();
});
app.use('/', index);




app.use('/users', users);
//region catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
//#endregion


//region error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
//#endregion

module.exports = app;
