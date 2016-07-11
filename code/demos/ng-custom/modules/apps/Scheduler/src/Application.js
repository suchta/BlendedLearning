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
				
				name: null,
				
				initialize: function($super, name)
				{
					$super(name);
					
					this.addController('ScheduleController', '/controllers/ScheduleController');
					this.addController('EventController', '/controllers/EventController');
					
					this.addRoute(
						'',
						{ redirectTo: '/Schedule/me/today' }
					);
					
					this.addRoute(
						'/Schedule/:userId/:date',
						{
							templateUrl: '/tpl/schedule.html',
							controller: 'ScheduleController'
						}
					);
					
					this.addRoute(
						'/Event/:userId/:eventId',
						{
							templateUrl: '/tpl/event.html',
							controller: 'EventController'
						}
					);
				}
				
			}
		);
		
		return Application;
								
		
});
