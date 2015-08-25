//todo : for see an available variable uncomment next line
//a.log(Object.keys(GLOBAL.a))

a.setAuth = function (req, res, next) {
	var body = req.body;
	if (body.username && body.password) {
		var username = body.username;
		var account = a.users.get(username);
		if (account) {
			var hash = a.crypt.en(body.password);
			if (hash === account.hash) {
				var encode = new Buffer(username, 'ascii').toString('base64');
				var secret = a.genid() + '-' + encode;
				account.session[secret] = {
					//id : secret,
					login : new Date().getTime(),
					destroy : false,
					remember : body.remember ? true : false,
					maxAge : a.expired
				};
				res.cookie(a.name, secret, {maxAge : a.expired, httpOnly : true});

				a.users.put(username, account);

				res.redirect('/index');
			} else res.redirect('/login');
		} else res.redirect('/login')
	} else res.redirect('/login')
};
a.getAuth = function (req, res, next) {
	var cookie = (req.cookies[a.name] || '').split('-');
	var username = new Buffer(cookie[cookie.length - 1], 'base64').toString('ascii');
	var isLogged =  function () {
		return req.route.path === '/login' ? res.redirect('/index') : next();
	};
	var isNotLogged =  function () {
		return req.route.path !== '/login' ? res.redirect('/login') : next();
	};

	if (username) {
		var account = a.users.get(username);
		if (account) {
			var now = new Date().getTime();
			var key = cookie.join('-');
			var session = account.session[key];

			if (session) {
				if (req.route.path !== '/logout') {
					var hiddenInfo = ['salt', 'hash', 'session'];
					var expired = session.login + session.maxAge;
					var isAny = expired >= now;
					var isActive = !session.destroy;
					var isRemember = session.remember;

					res.locals.account = {
						username : username
					};
					for (key in account) if (hiddenInfo.indexOf(key) === -1) res.locals.account[key] = account[key];
					res.locals.account['session'] = session;

					if (isAny && isActive) isLogged();
					else isNotLogged();
				} else {
					session.destroy = true;
					res.clearCookie(a.name);

					a.users.put(username, account);

					isLogged();
				}
			} else isNotLogged();
		} else isNotLogged();
	} else isNotLogged();
};