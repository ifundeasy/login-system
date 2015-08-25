//todo : for see an available variable uncomment next line
//a.log(Object.keys(GLOBAL.a))

var id = a.id, ip = a.ip, app = a.app, pid = a.pid.toString(), name = a.name,
	expired = a.expired, genid = a.genid, port = a.port, log = a.log,
	crypt = a.crypt, cluster = a.cluster, stringy = a.stringy,
	getAuth = a.getAuth, setAuth = a.setAuth, users = a.users;

app.post('/auth', setAuth);
app.get('/logout', getAuth, function (req, res, next) {
	res.redirect('/login');
});
app.get('/', getAuth, function (req, res) {
	res.redirect('/index')
});
app.get('/index', getAuth, function (req, res) {
	res.render('index');
});
app.get('/login', getAuth, function (req, res) {
	res.render('login');
});
app.get('/error', function (req, res) {
	res.render('error');
});