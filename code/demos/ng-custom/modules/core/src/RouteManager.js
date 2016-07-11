define(
	[
		'./Manager'
	],
	function
	(
		Manager
	)
	{
		
		var RouteManager = Class.create(
			Manager,
			{
				
				controllerProvider: null,
				
				routeProvider: null,
				
				core: null,
				
				applicationService: null,
				
				initialize: function($super, key)
				{
					$super(key);
					
				},
				
				setApplicationService: function(value)
				{
					this.applicationService = value;
				},
				
				setControllerProvider: function(value)
				{
					this.controllerProvider = value;
				},
				
				setRouteProvider: function(value)
				{
					this.routeProvider = value;
				},
				
				setCore: function(value)
				{
					this.core = value;
				},
				
				setPath: function(path)
				{
					var name = path.split('/')[1];
					if(name == "loading") return;
					this.applicationService.activate(name);
				},
				
				setupRoute: function(params, path, search)
				{
				
					// Load and setup the application
					var name = path.split('/')[1];
					require(
						['apps/' + name + '/Application'], 
						function(Application) 
						{
							var application = new Application(name);
							application.registerControllers(this.controllerProvider);
							application.registerRoutes(this.routeProvider);
							
							this.applicationService.addApplication(application);
							this.applicationService.activate(application.getName());
							
							// Check to make sure route exists (hasRoute?)
							application.handleRoute(path);
							
							// reload the route
							//angular.injector(['Core']).path(path);
							this.core.get('$location').path(path);
							this.core.get('$rootScope').$apply();
							
							var test = 1;
						}.bind(this)
					);
					
					// Set the view to loading screen while application is being loaded
					return '/loading';
				
				},
				
				getCurrentApplication: function()
				{
					if(this.currentApplication != null) {
						return this.application[this.currentApplication];
					}
				}
				
			}
		);
		
		Object.extend(
			RouteManager,
			/** @lends core.Manager */
			{
				GetInstance: function(key)
				{
					if (!Manager.HasCore(key)) {
						new RouteManager(key);
					}
					var retVal = Manager.GetInstance(key);
					return retVal;
				},
				KEY: "RouteManager"
			}
		);
		
		return RouteManager;
		
	}
);