const moment = require('moment');
const triggerEmail = require('../config/nodemailer');

const taskCreated = (task) => {

  const clientDetails = () => {
    if (task.client) return (
      `<p>Client details:</p>
      <hr />
      <p><span><b>Name:</b></span> ${task.client.Name}</p>
      <p><span><b>Email:</b></span> <a href="mailto:${task.client.Email}" target="_blank">${task.client.Email}</a></p>
      <p><span><b>Phone:</b></span> <a href="tel: ${task.client.Phone}">${task.client.Phone}</a></p>
      <p><span><b>Address:</b></span> <a href="https://maps.google.com/?q=${task.client.MailingAddress.street}, ${task.client.MailingAddress.city}" target="_blank">${task.client.MailingAddress.street}, ${task.client.MailingAddress.city}</a></p>
      <p><span><b>Office:</b></span> <a href="https://maps.google.com/?q=${task.client.Account.BillingAddress.street}, ${task.client.Account.BillingAddress.city}" target="_blank">${task.client.Account.Name}</a></p>
      <br />`
    )
    else return `<p>*Coaching is only for the HouseKeeper.</p>`
  }

  const houseKeeperDetails = () => {
    if (task.houseKeeper) return (
      `<p>HouseKeeper details:</p>
      <hr />
      <p><span><b>Name:</b></span> ${task.houseKeeper.Name}</p>
      <p><span><b>Email:</b></span> <a href="mailto:${task.houseKeeper.Email}" target="_blank">${task.houseKeeper.Email}</a></p>
      <p><span><b>Phone:</b></span> <a href="tel: ${task.houseKeeper.Phone}">${task.houseKeeper.Phone}</a></p>`
    )
    else return `<p>*Coaching is only for the client.</p>`
  }

  // to: `<${task.assigneeEmail}>`,
  const message = {
    from: '"Coaching team" <coaching@easylifedc.be>',
    to: `<${task.assigneeEmail}>`,
    cc: `<${task.requester}>`,
    subject: 'New task created',
    html: `<p>Hi,</p>
      <p>A new task has been created!</p>
      <p><span><b>Title:</b></span> ${task.title}</p>
      <p><span><b>Reason:</b></span> ${task.type}</p>
      <p><span><b>Description:</b></span> ${task.description}</p>
      <p><span><b>Start:</b></span> ${moment(task.start).format('MMMM Do YYYY, h:mm a')}</p>
      <p><span><b>End:</b></span> ${moment(task.end).format('MMMM Do YYYY, h:mm a')}</p>
      <br />
      ${clientDetails()}
      ${houseKeeperDetails()}
      <p>Thanks!</p>
      <p>Coaching team</p>
    `
  }
  triggerEmail(message)
}

const taskAssigned = (task) => {
  const message = {
    from: '"Coaching team" <coaching@easylifedc.be>',
    to: `<${task.assigneeEmail}>`,
    subject: 'Task assigned',
    html: `<p>Hi,</p>
      <p>This task has been assigned to: ${task.assignee}</p>
      <p><span><b>Title:</b></span> ${task.title}</p>
      <p><span><b>Description:</b></span> ${task.description}</p>
      <p><span><b>Type:</b></span> ${task.type}</p>
      <p><span><b>Start:</b></span> ${moment(task.start).format('MMMM Do YYYY, h:mm a')}</p>
      <p><span><b>End:</b></span> ${moment(task.end).format('MMMM Do YYYY, h:mm a')}</p>
      <p>Thanks!</p>
      <p>Coaching team</p>
    `
  }
  triggerEmail(message)
}

const taskChanged = (task) => {
  const renderCancellationReason = () => {
    if(task.cxlReason) return (
      `<p><span><b>Cancellation reason:</b></span> ${task.cxlReason}</p>`
    )
    else return ''
  }

  const checkIfSaraIsRequester = () => {
    if(task.requester.toLocaleLowerCase() === 'Sara.troisfontaine@easylifedc.be'.toLocaleLowerCase()) return ''
    else return `<${task.requester}>`
  }

  const message = {
    from: '"Coaching team" <coaching@easylifedc.be>',
    to: '"Sara Troisfontaine" <Sara.troisfontaine@easylifedc.be>',
    cc: `${checkIfSaraIsRequester()}`,
    subject: 'Task updated',
    html: `<p>Hi,</p>
      <p>${task.assignee} has changed the task status!</p>
      <p><span><b>Title:</b></span> ${task.title}</p>
      <p><span><b>Developer:</b></span> ${task.assignee}</p>
      <p><span><b>Type:</b></span> ${task.type}</p>
      <p><span><b>Description:</b></span> ${task.description}</p>
      <p><span><b>New status:</b></span> ${task.status}</p>
      ${renderCancellationReason()}
      <p>Thanks!</p>
      <p>Coaching team</p>
    `
  }
  triggerEmail(message)
}

const poke = (task) => {

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
    cc: `<${msg.body.from}>`,
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
