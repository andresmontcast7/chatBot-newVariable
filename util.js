var password = null;

function signUrl(url) {
  return "https://" + process.env.ms_username + ":" + password + "@" + url;
}


// "https://" + 6fe587530292419da628d1eaa17bdde1+ ":" + 6f8957af008F422A9941e858a56FdCcD + "@" +esb-qa.asu.edu/api/v1/student-fin-aid/students/ + 1212054699


function setPassword(pass) {
  password = pass;
}

module.exports = {
  signUrl: signUrl,
  setPassword: setPassword,
};
