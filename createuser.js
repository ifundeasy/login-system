var storage = require('node-persist');
var hash = require('./libs/hash').hash;
var username = process.argv[2];
var password = process.argv[3];
var account;

if (!username && !password) process.exit(1);

storage.initSync({
	dir : __dirname + '/data',
	stringify : JSON.stringify,
	parse : JSON.parse,
	encoding : 'utf8',
	logging : false,  //can also be custom logging function
	continuous : true,
	interval : false,
	ttl : false //can be true for 24h default or a number in MILLISECONDS
});

account = storage.getItemSync('account') || {};

hash(password, function (err, salt, hash) {
	if (err) throw err;
	account[username] = {
		username : username
	};
	account[username].salt = salt;
	account[username].hash = hash.toString();
	account[username].session = {};
	storage.setItemSync('account', account)
});