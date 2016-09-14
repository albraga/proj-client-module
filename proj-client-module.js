var superagent = require('superagent');
var request = superagent.agent();

if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localstorage');
}

function login(url, username, password) {
    request.post(url).send({username: username, password: password}).end(function(err, res) {
	localStorage.setItem('token', res.text.split("\"")[3]);	
    });
}

module.exports.login = login;
