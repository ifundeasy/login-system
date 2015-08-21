module.exports = function ($) {
	//console.log(req.cookies, res.cookie);
	$.isNotLogged = function (req, res, next) {
		var cookie = (req.cookies[$.name] || '').split('-');
		var username = new Buffer(cookie[cookie.length - 1], 'base64').toString('ascii');
		if (username) {
			var account = $.storage.getItemSync('account') || {};
			var logged = account[username];
			if (logged) {
				var now = new Date().getTime();
				var key = cookie.join('-');
				var session = logged.session[key];
				if (session) {
					var hiddenInfo = ['salt', 'hash', 'session'];
					var expired = session.login + session.maxAge;
					var isAny = expired >= now;
					var isActive = !session.destroy;
					var isRemember = session.remember;

					res.locals.account = {};
					for (key in logged) if (hiddenInfo.indexOf(key) === -1) res.locals.account[key] = logged[key];
					res.locals.account['session'] = session;

					if (!(isAny && isActive)) { //"false" berarti masih ada session
						res.redirect('/login');
					}
				} else {
					res.redirect('/login');
				}
			}
		} else {
			res.redirect('/login');
		}
		next()
	};
	$.isLogged = function (req, res, next) {
		var cookie = (req.cookies[$.name] || '').split('-');
		var username = new Buffer(cookie[cookie.length - 1], 'base64').toString('ascii');
		if (username) {
			var account = $.storage.getItemSync('account') || {};
			var logged = account[username];
			if (logged) {
				var now = new Date().getTime();
				var key = cookie.join('-');
				var session = logged.session[key];
				if (session) {
					var expired = session.login + session.maxAge;
					var isAny = expired >= now;
					var isActive = !session.destroy;
					var isRemember = session.remember;
					if (isAny && isActive) { //"true" berarti masih ada session
						res.redirect('/');
					}
				}
			}
		}
		next();
	};
	$.doLogout = function (req, res, next) {
		var cookie = (req.cookies[$.name] || '').split('-');
		var username = new Buffer(cookie[cookie.length - 1], 'base64').toString('ascii');
		if (username) {
			var account = $.storage.getItemSync('account') || {};
			var logged = account[username];
			if (logged) {
				var key = cookie.join('-');
				var session = logged.session[key];
				if (session) {
					session.destroy = true;
					res.clearCookie($.name);
					$.storage.insert('account', logged, username);
				}
			}
		}
		next();
	};

	$.app.get('/', function (req, res, next) {
		res.redirect('/index');
	});
	$.app.get('/index', $.isNotLogged, function (req, res, next) {
		res.render('index');
	});
	$.app.get('/logout', $.doLogout, function (req, res, next) {
		res.redirect('/login')
	});
	$.app.route('/login')
		.post($.isLogged, function (req, res, next) {
			var postdata = req.body;
			if (postdata.username && postdata.password) {
				var account = $.storage.getItemSync('account') || {};
				var logged = account[postdata.username];
				if (logged) {
					$.hash(postdata.password, logged.salt, function (err, hash) {
						if (err) {
							req.session.message.error.push(err);
							res.redirect('back');
						}
						if (hash.toString() == logged.hash) {
							var username = logged.username;
							var encode = new Buffer(username, 'ascii').toString('base64');
							var secret = $.genid() + '-' + encode;
							logged.session[secret] = {
								//id : secret,
								login : new Date().getTime(),
								destroy : false,
								remember : postdata.remember ? true : false,
								maxAge : $.expired
							};

							$.storage.insert('account', logged, username);
							res.cookie($.name, secret, {maxAge : $.expired, httpOnly : true});
							res.redirect('/');
						} else {
							req.session.message.error.push('invalid password');
							res.redirect('back');
						}
					})
				} else {
					req.session.message.error.push('invalid username');
					res.redirect('back');
				}
			} else {
				req.session.message.error.push('please fill the login form');
				res.redirect('back');
			}
		})
		.get($.isLogged, function (req, res, next) {
			res.render('login')
		});
	$.app.get('/error', function (req, res, next) {
		res.render('error');
	});
};