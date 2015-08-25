var username = process.argv[2],
	password = process.argv[3],
	type = process.argv[4];

if (!(username && password)) process.exit(1);

var db, dbname = 'users', data = {};
var crypt = require('./libs/crypt');
var lmdb = require('node-lmdb');
var env = new lmdb.Env();

env.open({
	path: __dirname + "/data",
	mapSize : 2*1024*1024*1024
});
db = env.openDbi({
	name: dbname,
	create: true
});
var get = function (key) {
	var txn = env.beginTxn();
	var ret = txn.getString(db, key);

	txn.commit();
	return JSON.parse(ret);
};
var put = function (key, value) {
	var txn = env.beginTxn();
	txn.putString(db, key, JSON.stringify(value));
	txn.commit();
};

data[username] = {
	type : type || 'general',
	hash : crypt.en(password),
	session : {}
};
put(username, data[username]);

console.log(get(username));

db.close();
env.close();