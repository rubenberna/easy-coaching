const express = require('express')
const router = express.Router()
const sendEmail = require('../sendEmail');

router.post('/new', async (req, res) => {
  const { task } = req.body
  sendEmail.taskCreated(task)
  res.status(201).send('Email sent')
})

router.post('/assigned', async (req, res) => {
  const { task } = req.body
  sendEmail.taskAssigned(task)
  res.status(201).send('Email sent')
})

router.post('/changed', async (req, res) => {
  const { task } = req.body
  sendEmail.taskChanged(task)
  res.status(201).send('Email sent')
})

router.post('/sendMsg', async (req, res) => {
  sendEmail.sendMsg(req)
  res.status(201).send('Email sent')
})

module.exports = router