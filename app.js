const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db=require('./config/connection');

db.connect((err)=>{
  if(err) console.log("connection Error"+err);
  else console.log("db connection succussful!")
})


const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
const indexRouter = require('./routes/index')
const hbs = require('express-handlebars');
const app = express();
const session=require('express-session')



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

   
// session

app.use(session({
  secret: "secret_key",
  resave: true, 
  saveUninitialized: true,
  cookie:{maxAge:360000}
}));

// back no cach 

app.use(function(req, res, next) {
  if (!req.user) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-2');
      res.header('Pragma', 'no-cache');
  }
  next();
});

// ROUTER

app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use('/index',indexRouter)
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