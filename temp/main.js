var log = function () { return console.log.apply(console.log, arguments) };
var readline = require('readline'),
	path = require('path'),
	hbase = require('hbase'),
	fs = require('fs');

var setting = require('./setting.js'),
	host = '10.62.29.20',
	port = 20550,
	argv = process.argv.splice(2, process.argv.length - 1),
	scope = argv[0],
	scopes = Object.keys(setting),
	limit = parseInt(argv[1]) || 100,
	step = scope == 'facebook' ? parseInt(argv[2]) : (parseInt(argv[2]) >= limit ? limit : parseInt(argv[2])),
	setString = function (el) {
		if (el == null) return "null";
		if (el == undefined) return "undefined";
		return el.toString();
	};

log('>>', 'insert into', scope,  'is start', argv);

var Main = function (con) {
	var Leng = 0;
	var Table = con.table;
	var Row = Table.row();
	var Failed = './fail/' + con.name + '_' + new Date().getTime() + '.txt';
	var Files = fs.readdirSync(con.path);

	var doing = 0;
	var Route = function (leng, data, file, cb) {
		var Obj = {};
		var rows = [];
		switch (scope) {
			case 'facebook' :
				data.forEach(function (line) {
					var dataa = con.formatter(file, line);
					dataa.forEach(function (f, i) {
						var row = [];
						if (f.values) {
							f.values.forEach(function (el, j) {
								row.push({key : f.rowId, column : f.columns[j], $ : setString(el)});
							});
						}
						rows = rows.concat(row);
						//log(i, row.length, rows.length);
						if (i % step == (step - 1)) {
							//log('----------------');
							Obj[Object.keys(Obj).length] = rows;
							rows = [];
						} else {
							if ((i == data.length - 1) && rows.length) {
								//log('----------------');
								Obj[Object.keys(Obj).length] = rows;
							}
						}
					})
				});
				break;
			default :
				data.forEach(function (line, i) {
					var row = [], f = con.formatter(file, line);
					if (f.values) {
						f.values.forEach(function (el, j) {
							row.push({key : f.rowId, column : f.columns[j], $ : setString(el)});
						});
					}
					rows = rows.concat(row);
					//log(i, row.length, rows.length);
					if (i % step == (step-1)) {
						//log('----------------');
						Obj[Object.keys(Obj).length] = rows;
						rows = [];
					} else {
						if ((i == data.length-1) && rows.length) {
							//log('----------------');
							Obj[Object.keys(Obj).length] = rows;
						}
					}
				});
				break;
		}
		if (Object.keys(Obj).toString()) {
			log('>> PROCESS IDXS:', Object.keys(Obj).toString());
			log('...................................................................................................................................');
		}

		/********************************************************************************/

		var insert = function (i) {
			if (Object.keys(Obj)[i]) {
				var n = i+1;
				var rows = Obj[i];
				var status = {
					lineStepCounter : doing-1,
					lineStep : limit,
					insertStepCounter : i,
					insertStep : step,
					length : rows.length,
					success : true
				};
				Row.put(data.rows, function (err, res) {
					if (err) {
						var o = {};
						status.success = false;
						o[JSON.stringify(status)] = JSON.stringify(rows);
						fs.appendFile(Failed, JSON.stringify(obj) + '\n', function (err) {
							if (err) log(err);
						});
					} else{
						insert(n);
					}
					log('>>', 'insert into', con.name, JSON.stringify(status));
				});
			} else {
				cb();
			}
		};

		doing++;
		return insert(0);
	};

	Files.forEach(function (file, i) {
		if (file.indexOf('.') !== 0) {
			var count = 0, body = [];
			var fullpath = con.path + file;
			var rline = readline.createInterface({
				input : fs.createReadStream(fullpath),
				output : process.stdout,
				terminal : false
			});

			rline.on('line', function (line) {
				body.push(line);
				if (body.length == limit) {
					rline.pause();
					log('...................................................................................................................................');
				}
				count++;
			}).on('pause', function () {
				log();
				log('>> ON LIMIT');
				Route(count, body, file, function () {
					rline.resume();
				});
				body = [];
			}).on('close', function () {
				log('...................................................................................................................................');
				log('>>', 'insert into', con.name,  'is done', argv)
			});
		}
	})
};

var config;
if (scopes.indexOf(scope) !== -1) {
	var client = hbase({
		"host" : host,
		"port" : port
	});

	config = setting[scope];
	config.table = new hbase.Table(client, scope);
	config.table.exists(function (err, res) {
		if (err) log(arguments);
		if (!res) {
			config.table.create({
				IS_ROOT : false,
				IS_META : false,
				ColumnSchema : config.fields.map(function (fieldname) {
					return {
						//BLOOMFILTER : 'ROW',
						//VERSIONS : '1',
						//IN_MEMORY : 'false',
						//KEEP_DELETED_CELLS : 'FALSE',
						//DATA_BLOCK_ENCODING : 'NONE',
						//TTL : '2147483647',
						//COMPRESSION : 'NONE',
						//MIN_VERSIONS : '0',
						//BLOCKCACHE : 'true',
						//BLOCKSIZE : '65536',
						//REPLICATION_SCOPE : '0',
						name : fieldname
					}
				})
			}, function (err, res) {
				if (err) log(arguments);
				if (res) Main(config)
			})
		} else {
			Main(config)
		}
	});
}
