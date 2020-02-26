const express = require('express')
const router = express.Router()
const delighted = require('delighted')(process.env.DELIGHTED_KEY);
const moment = require('moment');
const axios = require('axios');

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

  const shortList = list.map(({ score, person_properties}) => ({score, person_properties}))
  res.status(200).send(shortList)
})

router.get('/trend', async (req, res) => {
  const unixTime = moment().subtract(1,'months').unix()
  const data = await delighted.surveyResponse.all({ since: unixTime, trend: 109603, per_page: 100})
  // const { data } = await axios.get('https://api.delighted.com/v1/survey_responses.json', {
  //   auth: {
  //     username: process.env.DELIGHTED_KEY,
  //     password: ''
  //   },
  //   params: {
  //     since: unixTime,
  //     per_page: 100,
  //     trend: 109603
  //   }
  // })
  console.log(data.length);
  res.status(200).send(data)
})

module.exports = router
