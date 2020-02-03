const express = require('express')
const router = express.Router()
const sendEmail = require('../sendEmail');

router.post('/', async (req,res) => {
  const { task } = req.body
  sendEmail.poke(task)
  res.status(201).send('Email sent')
})

module.exports = router
