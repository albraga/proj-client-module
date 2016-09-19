var superagent = require('superagent');
var request = superagent.agent();
var winston = require('winston');

winston.level = 'debug';

if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localstorage');
}

function login(url, model, username, password) {
    localStorage.setItem('token','');
    request.post(url + '/' + model + '/login').send({username: username, password: password}).end(function(err, res) {
	if(err) {
	    winston.log('debug', 'login error: ' + err);
	    return;
	} else {
	    localStorage.setItem('token', res.text.split("\"")[3]);
	    winston.log('debug', 'login ok');
	}	
    });
}

function logout(url, model) {
    request
    .post(url + '/' + model + '/logout?access_token=' + localStorage.getItem('token'))
    .end(function(err, res){
	if(err) {
	    winston.log('debug', 'logout error: ' + err);
	    return;
	}
	winston.log('debug', 'logout ok');
    });
}

function update(url, model, id, obj) {
    request
	.put(url + '/' + model + '/' + id + '?access_token=' + localStorage.getItem('token'))
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

function create(url, model, obj) {
    request
    .post(url + '/' + model + '?access_token=' + localStorage.getItem('token'))
    .send(obj)
    .end(function(err, res){
	if(err) {
		winston.log('debug', 'create error: ' + err);
		return;
	    } else {
		winston.log('debug', 'create ok');
	    }
    });
}

function del(url, model, id) {
    request
	.del(url + '/' + model + '/' + id + '?access_token=' + localStorage.getItem('token'))
	.end(function(err, res) {
	    if(err) {
		winston.log('debug', 'delete error: ' + err);
		return;
	    } else {
		winston.log('debug', 'delete ok');
	    }
	});
}

function getAll(url, model) {
    localStorage.setItem('getall', 'vazio');
    request
	.get(url + '/' + model + '?access_token=' + localStorage.getItem('token'))
	.end(function(err, res) {
	    if(err) {
		winston.log('debug', 'getAll error: ' + err);
		return;
	    } else {
		winston.log('debug', 'getAll ok');
		localStorage.setItem('getall', JSON.stringify(res.text));
	    }
	});
}

function get(url, model, id) {
    localStorage.setItem('get', 'vazio');
    request
	.get(url + '/' + model + '/' + id + '?access_token=' + localStorage.getItem('token'))
	.end(function(err, res) {
	    if(err) {
		winston.log('debug', 'get error: ' + err);
		return;
	    } else {
		winston.log('debug', 'get ok');
		localStorage.setItem('get', JSON.stringify(res.text));
	    }
	});
}

module.exports.login = login;
module.exports.logout = logout;
module.exports.update = update;
module.exports.create = create;
module.exports.delete = del;
module.exports.getAll = getAll;
module.exports.get = get;
