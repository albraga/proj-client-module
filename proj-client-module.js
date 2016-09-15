var superagent = require('superagent');
var request = superagent.agent();
var winston = require('winston');

winston.level = 'debug';

if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localstorage');
}

function login(url, models, username, password) {
    localStorage.setItem('token','');
    request.post(url + '/' + models + '/login').send({username: username, password: password}).end(function(err, res) {
	if(err) {
	    winston.log('debug', 'login error: ' + err);
	    return;
	} else {
	    localStorage.setItem('token', res.text.split("\"")[3]);
	    winston.log('debug', 'login ok');
	}	
    });
}

function logout(url, models) {
    request
    .post(url + '/' + models + '/logout?access_token=' + localStorage.getItem('token'))
    .end(function(err, res){
	if(err) {
	    winston.log('debug', 'logout error: ' + err);
	    return;
	}
	winston.log('debug', 'logout ok');
    });
}

function update(url, models, id, obj) {
    request
	.put(url + '/' + models + '/' + id + '?access_token=' + localStorage.getItem('token'))
	.send(obj)
	.end(function(err, res) {
	    if(err) {
		winston.log('debug', 'update error: ' + err);
		return;
	    } else {
		winston.log('debug', 'update ok');
	    }
	});
}

function create(token) {
    request
    .post('http://31.220.53.162/api/Gifts')
    .send({name: 'sapato', donorId: 2})
    .end(function(err, res){
	
    });
}


module.exports.login = login;
module.exports.logout = logout;
module.exports.update = update;
