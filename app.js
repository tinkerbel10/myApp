var createError = require('http-errors');
const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://bel_bonrostro:bonrostro123@crmmongocluster-shard-00-00-ofnjl.azure.mongodb.net:27017,crmmongocluster-shard-00-01-ofnjl.azure.mongodb.net:27017,crmmongocluster-shard-00-02-ofnjl.azure.mongodb.net:27017/mongodb-crm-001?ssl=true&replicaSet=crmMongoCluster-shard-0&authSource=admin&retryWrites=true', { useNewUrlParser: true })
  .then(() => {
    console.log('Server Running!');
  })
  .catch(err => { // mongoose connection error will be handled here
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

var indexRouter = require('./routes/index');
var role = require('./routes/role');
var service = require('./routes/service');
var transaction = require('./routes/transaction');
var serviceTransaction = require('./routes/serviceTransaction');
var userDetails = require('./routes/userDetails');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({secret: 'mySecretKey' ,
saveUninitialized: true,
resave: true} ));
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);


var auth = require('./routes/users')(passport);
app.use('/', indexRouter);
app.use('/users', auth);
app.use('/service', service);
app.use('/role', role);
app.use('/auth', auth);
app.use('/transaction', transaction);
app.use('/service-transaction', serviceTransaction);
app.use('/user-details', userDetails);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
