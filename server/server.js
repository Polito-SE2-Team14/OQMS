'use strict'

//import
const express = require('express');
const morgan = require('morgan')
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const dayjs = require('dayjs')
const { body, validationResult } = require('express-validator');


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


//Controllers
const ticketDAO = require('./DAO/ticketDAO');
const serviceDAO = require('./DAO/ServiceDAO');

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

//GET /api/stats
app.get('/api/stats', async (req, res) => {

  await logic.getStats()
    .then(stats => res.status(200).json(stats))
    .catch(() => res.status(500).send("Internal Server Error"));

});

//GET /api/queue
app.get('/api/queue', async (req, res) => {

  await logic.getQueue()
    .then(queue => res.status(200).json(queue))
    .catch(() => res.status(500).send("Internal Server Error"));

})

//GET /api/serviceinfo
app.get('/api/serviceinfo', async (req, res) => {
  await serviceDAO.getServiceInfo()
    .then(info => res.status(200).json(info))
    .catch(error => res.status(500).send(error));

})


//POST /api/ticket
app.post('/api/ticket',
  body("serviceID").notEmpty(),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(422).json("ERROR: Unprocessable Entity");
    }

    const serviceID = req.body.serviceID;

    try {
      const ticketID = await ticketDAO.addNewTicket(serviceID);
      const waitingTime = await ticketDAO.calculateWaitingTime(serviceID);
      return res.status(200).json({ ticketID: ticketID, ETA: waitingTime });
    } catch (error) {
      return res.status(500).end("Internal Server Error");
    }

    //return res.status(200).json({message:"Ticket"});
  });


//PUT /api/next
app.put('/api/next', async (req, res) => {

  const counter = req.body.counter;

  await logic.getNextClient(counter)
    .then(customer => res.status(200).json(customer))
    .catch(() => res.status(500).send("Internal Server Error"));

  //return res.status(200).json({message:"Next"});
});




/*** User APIs */
app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.status(201).json(req.user);
})

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});