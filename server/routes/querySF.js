const express = require('express')
const router = express.Router()
const session = require('express-session');

router.post('/get_user', async (req, res) => {
  const org = session.org
  const {id} = req.body
  const q = `SELECT Id, AccountId, Name, Email, Account.Name, Phone, MailingAddress, External_Id__c, Coaching_interventions__c FROM Contact WHERE External_Id__c = '${id}'`;
  try {
    await org.query(q, async function(err, result) {
      if(!err && result.records[0]) {
        let record = result.records[0]

        record.Account = await getAccountName(record.AccountId)
        res.status(200).send(record)
      }
      else res.status(200).send(`No user found with id ${id}`)
    })
  } catch (e) {
    console.log(e);
    res.status(400).send(e)
  }
})

const getAccountName = async recordID => {
  const org = session.org
  let account;
  if(!recordID) account = 'unknown'
  else {
    await org.query(`SELECT Name, BillingAddress FROM Account WHERE Id = '${recordID}'`, (err, result) => {
      if (err) console.log(err);
      else account = result.records[0]
    })
  }
  return account
}

router.post('/created_task', async (req, res) => {
  const org = session.org
  const { task } = req.body
  await org.sobject('Contact').update({
    Id: task.client.Id,
    Coaching_scheduled__c: true,
    Coaching_date__c: task.start,
    Coaching_state__c: task.status,
    Coaching_reason__c: task.type,
    Coach__c: task.assignee,
    Coaching_interventions__c: !task.client.Coaching_interventions__c ? 1 : task.client.Coaching_interventions__c + 1
  }, (err, ret) => {
    if (err || !ret.success) console.log("error: ", err);
    else console.log("success: ", ret.id);
  })
  res.status(200).send('Updated')
})

router.post('/reassign', async (req, res) => {
  const org = session.org
  const { task } = req.body
  await org.sobject('Contact').update({
    Id: task.client.Id,
    Coach__c: task.assignee
  }, (err, ret) => {
    if (err || !ret.success) console.log("error: ", err);
    else console.log("success: ", ret.id);
  })
  res.status(200).send('Updated')
})

router.post('/change_status', async (req, res) => {
  const org = session.org
  const { task } = req.body
  await org.sobject('Contact').update({
    Id: task.client.Id,
    Coaching_state__c: task.status
  }, (err, ret) => {
    if (err || !ret.success) console.log("error: ", err);
    else console.log("success: ", ret.id);
  })
  res.status(200).send('Updated')
})

router.get('/all_accounts', async (req, res) => {
  const org = session.org
  const q = `SELECT Id, Name FROM Account`;
  try {
    await org.query(q, function (err, result) {
      if(!err && result.records) res.status(200).send(result.records)
    })
  } catch (e) {
    res.status(400).send(e)
  }
})
module.exports = router
