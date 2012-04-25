/*
 * @author Quirijn Groot Bluemink
 * GET home page.
 */


// Renders the main page
exports.index = function(req, res) {
	res.render('index', {
		title : 'DRI API',
		id : 'index'
	})
};
exports.config = function(req, res) {
	res.render('error', {
		title : 'DRI API',
		id : 'error'
	})
};
