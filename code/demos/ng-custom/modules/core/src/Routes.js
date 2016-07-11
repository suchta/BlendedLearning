define(
	[
		'./App',
		'./RouteManager'
	],
	function
	(
		App,
		RouteManager
	)
	{
		
		'use strict';
		
		var Routes = App.config(
			[
				'$routeProvider',
				function($routeProvider) {
					
					var routeManager = RouteManager.GetInstance(RouteManager.KEY);
					routeManager.setRouteProvider($routeProvider);
					
					// Redirection for the home page,
					$routeProvider.when('', { redirectTo: '/Dashboard' });
					
					// Route for the loading page
					$routeProvider.when('/loading', {
						templateUrl: '/core/tpl/loading.html'
					});
					
					// Magical dynamic application routing
					$routeProvider.otherwise({
						redirectTo: function(params, path, search) {
							var routeManager = RouteManager.GetInstance(RouteManager.KEY);
							return routeManager.setupRoute(params, path, search)
						}
					});
					
				}
			]
		);
		
		return Routes;
		
	}
);