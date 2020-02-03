const moment = require('moment');
const triggerEmail = require('../config/nodemailer');

const taskCreated = (task) => {
  const message = {
    from: '"Coaching team" <coaching@easylifedc.be>',
    to: `<${task.assigneeEmail}>`,
    subject: 'New task created',
    html: `<p>Hi,</p>
      <p>A new task has been created!</p>
      <p><span><b>Title:</b></span> ${task.title}</p>
      <p><span><b>Reason:</b></span> ${task.type}</p>
      <p><span><b>Description:</b></span> ${task.description}</p>
      <p><span><b>Start:</b></span> ${moment(task.start).format('MMMM Do YYYY, h:mm a')}</p>
      <p><span><b>End:</b></span> ${moment(task.end).format('MMMM Do YYYY, h:mm a')}</p>
      <p>Thanks!</p>
      <p>Coaching team</p>
    `
  }
  triggerEmail(message)
}

const taskAssigned = (taskObj) => {

  const message = {
    from: '"Coaching team" <coaching@easylifedc.be>',
    to: `<${taskObj.task.requester}>, <${taskObj.dev}@redcarrots.be>`,
    subject: 'Task assigned',
    html: `<p>Hi,</p>
      <p>Your task has been assigned to: ${taskObj.dev}</p>
      <p><span><b>Title:</b></span> ${taskObj.task.title}</p>
      <p><span><b>Requester:</b></span> ${taskObj.task.requester}</p>
      <p><span><b>Type:</b></span> ${taskObj.task.type}</p>
      <p><span><b>Description:</b></span> ${taskObj.task.description}</p>
      <p>We'll get it done as soon as possible!</p>
      <p>Check our <a href="http://team.redcarrots.be/ongoing" target="_blank">ongoing projects</a>.</p>
      <p>Coaching team</p>
    `
  }
  triggerEmail(message)
}

const taskChanged = (task) => {

  const message = {
    from: '"Coaching team" <coaching@easylifedc.be>',
    to: '"Sara Troisfontaine" <Sara.troisfontaine@easylifedc.be>',
    subject: 'Task updated',
    html: `<p>Hi,</p>
      <p>${task.assignee} has changed the task status!</p>
      <p><span><b>Title:</b></span> ${task.title}</p>
      <p><span><b>Developer:</b></span> ${task.assignee}</p>
      <p><span><b>Type:</b></span> ${task.type}</p>
      <p><span><b>Description:</b></span> ${task.description}</p>
      <p><span><b>New status:</b></span> ${task.status}</p>
      <p>Thanks!</p>
      <p>Coaching team</p>
    `
  }
  triggerEmail(message)
}

const poke = (task) => {
  console.log(task);

  const message = {
    from: '"Coaching team" <coaching@easylifedc.be>',
    to: `<${task.assigneeEmail}>`,
    subject: "You've been poked!",
    html: `<p>Hi ${task.assignee},</p>
      <p>The requester is looking for an update on the task:</p>
      <h4>${task.title}</h4>
      <p>Could you please have a look and provide an update?</p>
      <p>Thanks!</p>
      <p>Coaching team</p>
    `
  }
  triggerEmail(message)
}

const sendMsg = (msg) => {

  let attach
  if (msg.files) {
    attach = [
      {
        filename: msg.files.file.name,
        content: msg.files.file.data
      }
    ]
  } else attach = null

  const message = {
    from: '"Coaching team" <coaching@easylifedc.be>',
    to: `<${msg.body.to}>`,
    attachments: attach,
    subject: `New msg from ${msg.body.from}` ,
    html: `<p>Hi,</p>
      <p>There's a new msg from ${msg.body.from} regarding the task: <h4>${msg.body.title}</h4></p>
      <p>Message:</p>
      <p><i>${msg.body.msg}</i></p>
      <p>Thanks!</p>
      <p>Coaching team</p>
    `
  }
  triggerEmail(message)
}

module.exports = {
  taskCreated,
  taskAssigned,
  taskChanged,
  poke,
  sendMsg
}
