const express = require('express')
const router = express.Router()
const session = require('express-session');


router.post('/get_client', async (req, res) => {
  const org = session.org
  const {id} = req.body
  const q = `SELECT Id, Name, Email, Phone, MailingAddress, External_Id__c FROM Contact WHERE External_Id__c = '${id}'`;
  try {
    await org.query(q, function(err, result) {
      if(!err && result.records[0]) res.status(200).send(result.records[0])
      else res.status(200).send(`No user found with id ${id}`)
    })
  } catch (e) {
    console.log(e);
    res.status(400).send(e)
  }
})

module.exports = router
