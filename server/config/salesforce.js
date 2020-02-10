const jsforce = require('jsforce');
const org = new jsforce.Connection()
const session = require('express-session');

const login = async () => {
  await org.login(process.env.SF_USERNAME, process.env.SF_PASSWORD, function (err, userInfo) {
    if (err) console.log('error: ', err);
    else session.org = org;
  });
}

module.exports = {
  login
}
