var os = require('os'),
	fs = require('fs'),
	cluster = require('cluster'),
	http = require('http'),
	path = require('path');

var name = "webApp",
	expired = 24 * 60 * 60 * 1000,
	port = process.env.PORT || 1812,
	log = function () {
		console.log.apply(console.log, arguments);
	},
	genid = function () {
		return new Date().getTime().toString(32) + '-' + process.hrtime()[1].toString(32);
	},
	id = genid();

if (cluster.isMaster) {
	for (var i = 0; i < os.cpus().length; i++) cluster.fork();
	cluster.on('exit', function (worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
	});
} else {
	var first = true;
	var express = require('express'),
		cookieParser = require('cookie-parser'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		hash = require('./libs/hash').hash,
		storage = require('./libs/persist')(__dirname + '/data');

	var app = express();
	var params = {
		id : id,
		pid : process.pid,
		log : log,
		genid : genid,
		name : name,
		expired : expired,
		app : app,
		hash : hash,
		storage : storage,
		esClient : 'esClient'
	};
	app.set('title', name);
	app.set('x-powered-by', false);
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/views');
	app.use(bodyParser());
	app.use(cookieParser(id));
	app.use(session());
	app.use(function(req, res, next){
		if (first) {
			first = false;
			res.clearCookie(name);
			res.redirect('/login');
		}

		res.pid = process.pid;
		res.locals.message = res.locals.message || {};
		req.session.message = req.session.message || {};

		req.session.message.error = req.session.message.error || [];
		res.locals.message.error = res.locals.message.error || [];
		if (req.session.message.error.length) {
			res.locals.message.error = res.locals.message.error.concat(req.session.message.error);
			req.session.message.error = [];
		}

		req.session.message.success = req.session.message.success || [];
		res.locals.message.success = res.locals.message.success || [];
		if (req.session.message.success.length) {
			res.locals.message.success = res.locals.message.success.concat(req.session.message.success);
			req.session.message.success = [];
		}

		console.log('>>', req.method, req.cookies[name], req.url);

		next();
	});

	require('./routes')(params);

	app.listen(port);
	console.log(process.pid + ' : ' + name + ' started on port ' + port);
}