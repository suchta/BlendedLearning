
define(
	[
		'angular',
		'./Filters',
		'./Services',
		'./Directives',
		'./Controllers',
		'./RouteManager'
	], 
	function
	(
		angular,
		Filters,
		Services,
		Directives,
		Controllers,
		RouteManager
	)
	{
		'use strict';

		var App = angular.module(
			'Core',
			[
				'Core.Controllers',
				'Core.Filters',
				'Core.Services',
				'Core.Directives',
				'ui.bootstrap'
			],
			function ($controllerProvider, $rootScopeProvider) {
				var routeManager = RouteManager.GetInstance(RouteManager.KEY);
				routeManager.setControllerProvider($controllerProvider);
			}
		);
		
		App.run(
			function($rootScope, $location)
			{
				$rootScope.$watch(
					function()
					{
						return $location.path();
					},  
					function(newValue, oldValue) 
					{  
						if (newValue != oldValue) {
							var routeManager = RouteManager.GetInstance(RouteManager.KEY);
							routeManager.setPath(newValue);
						}
					},
					true
				);
			}
		);
		
		return App;
	}
);
