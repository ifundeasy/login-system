//todo : for available variable uncomment next line
//a.log(Object.keys(GLOBAL.a))

var express = require('express'),
	favicon = require('serve-favicon'),
	errorhandler = require('errorhandler'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session');

var app = express();
/**
 * //todo : something like auto binding between session and storage, sorry we don't need that :D
 * var filestore = require('session-file-store')(session);
 * var option = {
 * 	   secret: a.id,
 * 	   name: a.name,
 * 	   saveUninitialized: true,
 * 	   resave: true,
 * 	   store: new filestore,
 * 	   cookie : {
 * 	       secure : false,
 * 		   httpOnly : true,
 * 		   maxAge : a.expired
 * 	   }
 * };
 * app.use(session(option));
 */

app.set('port', a.port);
app.set('title', a.name);
app.set('x-powered-by', false);
app.set('views', __dirname + '/public/app/views');
app.set('view engine', 'ejs');

app.use(express.static(a.path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser(a.id));
app.use(function (req, res, next) {
	//res.clearCookie(a.name)
	//a.log(a.pid.toString(), (req.method + req.url), req.sessionID, a.stringy(req.session));
	a.log(a.pid.toString(), (req.method + req.url), req.cookies[a.name]);
	next();
});

a.app = app; //todo : link to GlOBAL.a
a.users = a.createDB(a.Env, 'users'); //todo : create db if does not exist;

require('./auth'); //todo : i'm put authorize here then..
require('./routes'); //todo : i'm put all in url routing here

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

if (app.get('env') === 'development') {
	//app.use(require('morgan')('dev'));
	app.use(errorhandler());
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message : err.message,
			error : err
		});
	});
}

app.listen(a.port, function () {
	a.log(a.pid.toString(), a.name, 'listening at', a.ip + ':' + a.port);
});