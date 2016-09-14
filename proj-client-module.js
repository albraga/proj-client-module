var superagent = require('superagent');
var request = superagent.agent();

if (typeof localStorage === "undefined" || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localstorage');
}

function login(url, username, password) {
    request.post(url + '/login').send({username: username, password: password}).end(function(err, res) {
	if(err) {
	    localStorage.setItem('login-error', err); 
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
	    localStorage.setItem('logout-error', err); 
	    return;
	}
	localStorage.setItem('logout-status', res.status);
    });
}

function update(url, id, property, value) {
    request
	.put(url + '/' + id + '?access_token=' + localStorage.getItem('token'))
	.send({property: value})
	.end(function(err, res) {
            console.log(err);
	    console.log(res);
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
