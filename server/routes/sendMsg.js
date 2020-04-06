const express = require('express')
const router = express.Router()
const sendEmail = require('../sendEmail');

router.post('/', async (req,res) => {
  // Send message with attachment
  sendEmail.sendMsg(req)
  res.status(201).send('Email sent')
})

module.exports = router
