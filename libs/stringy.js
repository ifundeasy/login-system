module.exports = function () {
	return JSON.stringify.apply(JSON.stringify, arguments)
};