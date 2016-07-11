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
					$super(name);
					
					this.addController('PlpController', '/controllers/PlpController');
					
					
					this.addRoute(
						'/:userId/:plpId/:tabName',
						{
							templateUrl: '/tpl/plp.html',
							controller: 'PlpController'
						}
					);
					
					this.addRoute(
						'',
						{
							templateUrl: '/tpl/plp.html',
							controller: 'PlpController'
						}
					);
				}
				
			}
		);
		
		return Application;
		
});
