const express = require('express')
const router = express.Router()
const delighted = require('delighted')(process.env.DELIGHTED_KEY);
const moment = require('moment');

router.get('/', async (req, res) => {
  const unixTime = moment().subtract(3,'months').unix()
  const npsCount = await delighted.metrics.retrieve();
  let pages = Math.floor(npsCount.response_count / 100)
  let list = []
  while (pages >= 0) {
    const data = await delighted.surveyResponse.all({ since: unixTime, expand: 'person', person_properties: !null, per_page: 100, page: 20});
    list = [...list, ...data]
    pages -= 1
  }
  console.log('done');
  res.status(200).send(list)
})

module.exports = router
