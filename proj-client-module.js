var superagent = require('superagent');
var request = superagent.agent();

if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localstorage');
}

function login(url, models, username, password) {
    request.post(url + '/' + models + '/login').send({username: username, password: password}).end(function(err, res) {
	if(err) {
//	    localStorage.setItem('login-error', new Date().toGMTString() + ' ERRO: ' + err); 
	    return;
	}
	localStorage.setItem('token', res.text.split("\"")[3]);	
    });
}

function logout(url) {
    request
    .post(url + '/logout?access_token=' + localStorage.getItem('token'))
    .end(function(err, res){
	if(err) {
//	    localStorage.setItem('logout-error', new Date().toGMTString() + ' ERRO: ' + err); 
	    return;
	}
//	localStorage.setItem('logout-status',  new Date().toGMTString() + ' STATUS: ' + res.status);
    });
}

function update(url, models, id, obj) {
    request
	.put(url + '/' + models + '/' + id + '?access_token=' + localStorage.getItem('token'))
	.send(obj)
	.end(function(err, res) {
	    if(err) {
//		localStorage.setItem('update-error', new Date().toGMTString() + ' ERRO: ' + err); 
		return;
	    }
//	    localStorage.setItem('update-status',  new Date().toGMTString() + ' STATUS: ' + res.status);
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
