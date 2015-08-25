module.exports = function () {
	return console.log.apply(console.log, arguments);
};