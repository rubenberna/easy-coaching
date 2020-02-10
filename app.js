const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const session = require('express-session');
const port = process.env.PORT || 5000
const salesforce = require('./server/config/salesforce');

// Middleware
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload());

// Set up session
 app.use(session({
   secret: 's3cret', // it can be anything we want
   resave: true, // changed to true
   saveUninitialized: true,
   org: {}, // salesforce
 }));


// Routes
const firebase = require('./server/routes/queryDB');
const poke = require('./server/routes/poke');
const sendMsg = require('./server/routes/sendMsg');
const querySF = require('./server/routes/querySF');

app.use('/api/firebase', firebase)
app.use('/api/poke', poke)
app.use('/api/sendMsg', sendMsg)
app.use('/api/querySF', querySF)

if(process.env.NODE_ENV ===  'production') {
  app.use(express.static('client/build'))

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  salesforce.login()
  }
)
