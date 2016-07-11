module.exports = function(grunt)
{

	var	port = 8888,
		httpdocs_dir = './httpdocs',
		module_dir = './modules',
		js_dir = httpdocs_dir + '/js',
		hostname = 'localhost',
		
		apps = ['CoursePlayer', 'Scheduler'];
		plugins = ['Dialogs', 'Facebook', 'Twitter'];
		
		
	grunt.initConfig({
		run: {
			server_debug: [1,2,3],
			server_default: "testing"
		}
	});
	
	grunt.loadTasks('tasks');
	
	grunt.registerTask('open-browser-debug', function() {
		var open = require('open');
		open('http://' + hostname + ':' + port + '/debug.html');
	});
	
	grunt.registerTask('connect', function() {
		
		var connect = require('connect');
		var url = require('url');
		var proxy = require('proxy-middleware');
		
		// Use connect to serve static files
		var app = connect()
			.use(connect.logger('dev'))
			.use(connect.static(httpdocs_dir))
			.use(connect.static(module_dir));
		
		//app.use('/chat/http-bind/', proxy(url.parse('http://localhost:5280/http-bind/')));
		
		
		app.listen(port);
		
	});
	
	grunt.registerTask('default', [
		'connect',
		'watch'
	]);
	
	grunt.registerTask('debug', [
		'connect',
		'open-browser-debug',
		'watch'
	]);
	
};