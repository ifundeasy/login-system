var db, dbname = 'users', mode = process.argv[2] || 'anything';
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

var txn = env.beginTxn();
var cursor = new lmdb.Cursor(txn, db);
var get = function (key) {
	var ret = txn.getString(db, key);
	return JSON.parse(ret);
};
var put = function (key, value) {
	return txn.putString(db, key, JSON.stringify(value));
};
for (var found = cursor.goToFirst(); found; found = cursor.goToNext()) {
	var data = get(found);
	if (mode == 'all') {
		data.session = {};
	} else {
		for (var s in data.session) {
			var isActive = !(new Date() >= data.session[s].login + data.session[s].maxAge);
			var isDestoyed = data.session[s].destroy;
			if (isDestoyed) delete data.session[s];
			if (!isActive) delete data.session[s];
		}
	}
	put(found, data);
	console.log(found, get(found))
}

txn.commit();
db.close();
env.close();