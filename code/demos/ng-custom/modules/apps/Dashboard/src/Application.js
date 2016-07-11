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
					
					this.addController('HomeController', '/controllers/HomeController');
					
					this.addRoute(
						'',
						{
							templateUrl: '/tpl/home.html',
							controller: 'HomeController'
						}
					);
					
					this.addRoute(
						'/test',
						{
							templateUrl: '/tpl/test.html'
						}
					);
					
				}
				
			}
		);
		
		return Application;
		
});
