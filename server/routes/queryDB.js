const express = require('express')
const router = express.Router()
const firebase = require ('../config/firebaseInit')
const sendEmail = require('../sendEmail')

// Get all coaches
router.get('/coaches', async (req, res) => {
  const snapshot = await firebase.coaches.get()
  const records = snapshot.docs.map(doc => {
    let coach = doc.data()
    coach.id = doc.id
    return coach
  })
  res.status(201).send(records)
})

// Get single coach
router.post('/coach', async (req, res) => {
  const { name } = req.body
  const snapshot = await firebase.coaches.where('name', '==', name).get()
  const record = snapshot.docs.map(doc => doc.data())
  res.status(201).send(record)
})

// Get all tasks
router.get('/tasks', async (req, res) => {
  const snapshot = await firebase.tasks.get()
  const records = snapshot.docs.map(doc => {
    let task = doc.data()
    task.id = doc.id
    return task
  })
  res.status(201).send(records)
})

// Get active tasks
router.get('/active_tasks', async (req, res) => {
  const snapshot = await firebase.tasks.where('complete', '==', false).get()
  const records = snapshot.docs.map(doc => {
    let task = doc.data()
    task.id = doc.id
    return task
  })
  res.status(201).send(records)
})

// Create a task
router.post('/tasks', async (req, res) => {
  const { task } = req.body
  const [assignee]  = await getSingleCoach(task.assignee)
  task.assigneeEmail = assignee.email
  task.calendarColor = assignee.calendarColor
  firebase.tasks.add({...task})
  sendEmail.taskCreated(task)
  res.status(201).send(`Task ${task.title} saved`)
})

// Get all ongoing tasks per coach
router.post('/findTasksPerCoach', async (req, res) => {
  const { name } = req.body
  const snapshot = await firebase.tasks.where('assignee', '==', name).get()
  const records = snapshot.docs.map(doc => {
    let task = doc.data()
    task.id = doc.id
    return task
  })
  res.status(201).send(records)
})

// Mark a task as completed
router.post('/changeTaskStatus', async (req, res) => {
  const { task } = req.body
  const snapshot = await firebase.tasks.where('title', '==', task.title).where('reqDate', '==', task.reqDate).get()
  const [ recordId ] = snapshot.docs.map(doc => doc.id)
  let taskRef = firebase.tasks.doc(recordId)
  taskRef.update({ status: task.status })
  sendEmail.taskChanged(task)
  res.status(201).send('success')
})

// Assign task
router.post('/assignTask', async (req, res) => {
  const { taskObj } = req.body
  const snapshot = await firebase.tasks.where('title', '==', taskObj.task.title).where('reqDate', '==', taskObj.task.reqDate).get()
  const [ recordId ] = snapshot.docs.map(doc => doc.id)
  let taskRef = firebase.tasks.doc(recordId)
  taskRef.update({ assignee: taskObj.assignee })
  sendEmail.taskAssigned(taskObj)
  res.status(201).send('success')
})

// Get logs per task
router.post('/fetchLogs', async (req, res) => {
  const {id } = req.body
  const snapshot = await firebase.logs.where('taskId', '==', id).get()
  const records = snapshot.docs.map(doc => doc.data())
  res.status(201).send(records)
})

// Update tasks
router.post('/updateTask', async (req, res) => {
  const { task } = req.body
  const snapshot = await firebase.tasks.where('title', '==', task.title).where('reqDate', '==', task.reqDate).get()
  const [ recordId ] = snapshot.docs.map(doc => doc.id)
   let taskRef = firebase.tasks.doc(recordId)
  taskRef.update({ start: task.start, end: task.end })
  res.status(201).send('success')
})

// Create Coach
router.post('/createNewCoach', async (req, res) => {
  const coach = req.body
  firebase.coaches.add({...coach})
  res.status(201).send(`Coach ${coach.name} saved`)
})

// Edit Coach
router.post('/editCoach', async (req, res) => {
  const coach = req.body
  const coachRef = firebase.coaches.doc(coach.id)
  coachRef.update({
    name: coach.name,
    email: coach.email,
    intro: coach.intro,
    password: coach.password,
    role: coach.role,
    started: coach.started,
    calendarColor: coach.calendarColor,
    photo: coach.photo,
  })
  res.status(201).send(`Coach ${coach.name} updated`)
})

getSingleCoach = async name => {
  const snapshot = await firebase.coaches.where('name', '==', name).get()
  const record = snapshot.docs.map(doc => doc.data())
  return record
}

module.exports = router
