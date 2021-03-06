/**
 * @author Quirijn Groot Bluemink
 * Module dependencies.
 */

var routes = require('./routes');
exports.createRoutes = function make(app) {
	showAPI(app);
}
function showAPI(app) {
	var Resource = require('express-resource');

	var objectRoutes = require('./routes/objects');
	var devRoutes = require('./routes/dev');
	var uploadRoutes = require('./routes/upload');
	var fedoraRoutes = require('./routes/fedora');
	var statsRoutes = require('./routes/stats');
	var queryRoutes = require('./routes/query');
	// Creates mapping for the documentation page of the various versions
	var devResource = app.resource('dev', devRoutes);

	// Creates default mapping
	var objectsResource = app.resource('dev/objects', objectRoutes);

	// Adds custom route mappings
	objectsResource.map('get', '/:object/list', objectRoutes.list)
	objectsResource.map('get', '/:object/delete', objectRoutes.remove)
	objectsResource.map('get', '/:object/approve', objectRoutes.approve)
	objectsResource.map('get', '/:object/unapprove', objectRoutes.unapprove)
	objectsResource.map('get', '/:object/compare', objectRoutes.compare)
	objectsResource.map('post', '/:object/update', objectRoutes.update)

	var uploadResource = app.resource('dev/upload', uploadRoutes);
	uploadResource.map('options', '/', uploadRoutes.create);
	
	var fedoraResource = app.resource('dev/fedora', fedoraRoutes);
	var queryResource = app.resource('dev/query', queryRoutes);
	
	var statsResource = app.resource('dev/stats', statsRoutes);
	statsResource.map('get', '/open', statsRoutes.open)
	statsResource.map('get', '/approved', statsRoutes.approved)
	statsResource.map('get', '/lastcreated', statsRoutes.lastCreated)
	statsResource.map('get', '/lastedited', statsRoutes.lastEdited)
	statsResource.map('get', '/lastcreated/:type', statsRoutes.lastCreatedByType)
	statsResource.map('get', '/lastedited/:type', statsRoutes.lastEditedByType)
	// Sets index page route
	app.get('/', routes.index);

	// Add Error pages
	// app.use(function(req, res, next) {
		// res.render('404.jade', {
			// status : 404,
			// title : "404 - Error",
			// url : req.url,
			// id : "/404"
		// });
	// });
	// app.use(function(err, req, res, next) {
		// res.render('500.jade', {
			// status : err.status || 500,
			// error : err,
			// id : "/500"
		// });
	// });

}
