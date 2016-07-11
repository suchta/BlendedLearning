define(
	[
		'angular'
	], 
	function
	(
		angular
	)
	{
		
		var BaseApplication = Class.create(
			{
				
				name: null,
				
				title: null,
				
				isActive: null,
				
				isDisabled: null,
				
				controllers: null,
				
				routes: null,
				
				initialize: function(name, title)
				{
					this.name = name;
					this.title = title;
					this.isActive = false;
					this.isDisabled = false;
					
					this.controllers = {};
					this.routes = {};
					
					// Add the application CSS to the document
					$$('head')[0].insert(new Element('link', {rel: "stylesheet", href: "apps/" + this.name + "/css/default.css"}));
					
				},
				
				getName: function()
				{
					return this.name;
				},
				
				addController: function(name, path)
				{
					this.controllers[name] = path;
				},
				
				addRoute: function(route, options)
				{
					
					if(options.controller != undefined)
						options.controller = this.name + '.' + options.controller;
					if(options.redirectTo != undefined)
						options.redirectTo = this.name + options.redirectTo;
					
					if(options.templateUrl != undefined)
						options.templateUrl = '/apps/' + this.name + options.templateUrl;
					
					this.routes[route] = options;
				},
				
				registerControllers: function($controllerProvider)
				{
					
					for(var key in this.controllers) {
						
						var name = this.name + "." + key;
						var path = 'apps/' + this.name + this.controllers[key];
						
						$controllerProvider.register(
							name,
							[
								'$scope',
								'$route',
								'$location',
								function(path, $scope, $route, $location) 
								{
									require(
										[ path ], 
										function (controller) 
										{
											angular.injector(['ng', 'Core.Services', 'ui.bootstrap']).invoke(controller, this, {'$scope': $scope, '$route': $route, '$location': $location});
										}
									);
								}.curry(path)
							]
						);
					}
				},
				
				registerRoutes: function($routeProvider)
				{
					for(var key in this.routes) {
						$routeProvider.when('/' + this.name + key, this.routes[key]);
					}
				},
				
				handleRoute: function(path)
				{
					
				}
				
				
			}
		);
		
		return BaseApplication;
		
		
});
