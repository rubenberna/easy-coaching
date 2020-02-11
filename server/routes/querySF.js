const express = require('express')
const router = express.Router()
const session = require('express-session');


router.post('/get_user', async (req, res) => {
  const org = session.org
  const {id} = req.body
  const q = `SELECT Id, AccountId, Name, Email, Phone, MailingAddress, External_Id__c FROM Contact WHERE External_Id__c = '${id}'`;
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

module.exports = router
