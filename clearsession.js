var mode = process.argv[2] || 'onlyExpired';
var storage = require('./libs/persist')(__dirname + '/data');
var data = storage.getItemSync('account');

if (mode == 'all') {
	for (var user in data) data[user].session = {};
} else {
	for (var user in data) {
		var sessions = data[user].session;
		for (var s in sessions) {
			var isActive = !(new Date() >= sessions[s].login + sessions[s].maxAge);
			var isDestoyed = sessions[s].destroy;
			if (isDestoyed) delete sessions[s];
			if (!isActive) delete sessions[s];
		}
	}
}
storage.setItemSync('account', data);
console.log(JSON.stringify(data, null, 2));