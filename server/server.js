'use strict'

//import
const express = require('express');
const morgan = require('morgan')
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');


// init express
const app = new express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));

// set up and enable cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Passport: set-up the local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {

  if (!validateEmail(username)) {
    return cb("Invalid Email")
  }

  if (String(password).length <= 6) {
    return cb("Invalid password")
  }

  const user = null
  /* await getUser(username, password)
    .catch(() => { return res.status(422).send("Unprocessable entity") });
 */
  if (!user)
    return cb(null, false);
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
})

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
})

app.use(session({
  secret: 'secret string',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authorized' });
}


//GET /api/hello
app.get('/api/hello', (req,res)=>{
    let message = {
      message: 'Hello World!'
    }
    return res.status(200).json(message);
});

//GET /api/ticket
app.get('/api/ticket', (req,res)=>{

  return res.status(200).json({message:"Ticket"});
});


//PUT /api/next
app.put('/api/next', (req, res)=>{

  return res.status(200).json({message:"Next"});

});

//GET /api/stats
app.get('/api/stats', (req, res)=>{

  return res.status(200).json({message:"Stats"});

});


  


// activate the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });