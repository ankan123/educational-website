const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sendMail = require('./mail.js');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//body parser middleware
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({extended: true});
app.use(express.static('views/public'));

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
 app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


//contact us
app.post('/contact_us',urlencodedParser,function(req,res){
	const {subject,email,text} = req.body;
console.log('data: ',req.body);

sendMail(email,subject,text,function(err,data){
	if(err) throw err;
	console.log("server received the data");
	

});
// res.json({message:'data received'});
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
