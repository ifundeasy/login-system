module.exports = function (dir) {
	var storage = require('node-persist');

	storage.initSync({
		dir : dir,
		stringify : JSON.stringify,
		parse : JSON.parse,
		encoding : 'utf8',
		logging : false,
		continuous : true,
		interval : false,
		ttl : false
	});
	storage.insert = function (name, data, id) {
		if (name) {
			var rows = new Object(), uid;
			if (storage.getItem(name)) rows = storage.getItem(name);
			uid = id || Object.keys(rows).length;
			rows[uid] = data;
			return storage.setItemSync(name, rows);
		}
		return;
	};
	storage.delete = function (name, keys) {
		if (name && storage.getItem(name) && keys) {
			var rows = storage.getItem(name);
			keys.constructor == Array ? keys.forEach(function (key) {
				delete rows[key]
			}) : delete rows[keys.toString()];
			return storage.setItemSync(name, rows);
		}
		return;
	};

	return storage
};