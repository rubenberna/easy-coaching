const express = require('express')
const router = express.Router()
const sendEmail = require('../sendEmail');
const firebase = require ('../config/firebaseInit')

router.post('/', async (req,res) => {
  // Send message with attachment
  sendEmail.sendMsg(req)

  // Add logs
  const data = req.body

  let log = {
    sentDate: Date.now(),
    from: data.from,
    taskId: data.id
  }

  firebase.logs.add({ ...log })
  res.status(201).send('Email sent')
})

module.exports = router
