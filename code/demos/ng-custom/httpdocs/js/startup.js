
require(
	[
		'angular',
		'core/App',
		'core/RouteManager',
		'core/Routes'
	], 
	function(angular, App, RouteManager, Routes)
	{
		'use strict';
		
		var core = $('Core');
		var coreInstance = angular.bootstrap(core, [App['name']]);
		var routeManager = RouteManager.GetInstance(RouteManager.KEY);
		routeManager.setCore(coreInstance);
		
		// Because of RequireJS we need to bootstrap the app app manually
		// and Angular Scenario runner won't be able to communicate with our app
		// unless we explicitely mark the container as app holder
		// More info: https://groups.google.com/forum/#!msg/angular/yslVnZh9Yjk/MLi3VGXZLeMJ
		core.addClassName('ng-app');
		
		// Show the core
		core.show();
		
		// Remove the loader
		$('Loader').hide();
		
	}
);
