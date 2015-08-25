module.exports = function () {
	return new Date().getTime().toString(32) + '-' + process.hrtime()[1].toString(32);
};