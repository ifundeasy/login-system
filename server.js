var os = require('os'),
	fs = require('fs'),
	path = require('path'),
	cluster = require('cluster'),
	log = require('./libs/log'),
	genid = require('./libs/genid'),
	stringy = require('./libs/stringy'),
	getip = require('./libs/getip'),
	crypt = require('./libs/crypt');

GLOBAL.a = GLOBAL.a || ({
	id : genid(),
	ip : getip(),
	pid : process.pid,
	name : "WebApp",
	path : path,
	log : log,
	cfg : undefined,
	genid : genid,
	stringy : stringy,
	getip : getip,
	crypt : crypt,
	expired : 24 * 60 * 60 * 1000,
	port : process.env.PORT || 1811,
	cluster : cluster
});

if (a.cluster.isMaster) {
	for (var i = 0; i < (os.cpus().length); i++) a.cluster.fork();
	a.cluster.on('exit', function (worker, code, signal) {
		log('worker ' + worker.process.pid + ' died');
	});
} else {
	var lmdb = require('node-lmdb');
	var env = new lmdb.Env();
	var create = function (env, name) {
		var db = env.openDbi({
			name : name,
			create : true
		});
		return {
			db : db,
			get : function (key) {
				var txn = env.beginTxn();
				var ret = txn.getString(db, key);

				txn.commit();
				return JSON.parse(ret);
			},
			put : function (key, value) {
				var txn = env.beginTxn();
				txn.putString(db, key, JSON.stringify(value));
				txn.commit();
			}
		};
	};
	env.open({
		maxDbs : 1,
		//mapSize : 2 * 1024 * 1024 * 1024,
		path : __dirname + "/data"
	});
	a.Env = env;
	a.createDB = create;

	require('./index');
}