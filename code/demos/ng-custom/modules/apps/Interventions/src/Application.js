define(
	[
		'angular',
		'core/BaseApplication'
	], 
	function
	(
		angular,
		BaseApplication
	)
	{
		
		var Application = Class.create(
			BaseApplication,
			{
				
				initialize: function($super, name)
				{
					$super(name, "Dashboard");
					
					this.addController('InterventionController', '/controllers/InterventionController');
					
					this.addRoute(
						'/:userId/:interventionId',
						{
							templateUrl: '/tpl/Intervention.html',
							controller: 'InterventionController'
						}
					);
					
					this.addRoute(
						'',
						{
							templateUrl: '/tpl/Intervention.html',
							controller: 'InterventionController'
						}
					);
					
				}
				
			}
		);
		
		return Application;
		
});
