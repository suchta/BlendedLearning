'use strict';

module.exports = function(grunt) {
	
	// make sure all server are taken down when grunt exits.
	
	var servers = {};
	
	
	process.on('exit', function() {
		grunt.log.writeln("Exiting ... ");
	});
	
	grunt.registerMultiTask('run', 'Run the specified server.', function() {
		grunt.log.writeln(this.target + ': ' + this.data);
		var child = servers[this.target];
		
		if(child && child.running) {
			child.stop();
		}
		
		
		
	});
	
	grunt.registerTask('watch', 'And async task to keep the server alive', function() {
		this.async();
	});
	
};