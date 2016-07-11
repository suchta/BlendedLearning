define(
	[
		'puremvc',
		'core/event/ViewEvent'
	],
	function
	(
		puremvc,
		ViewEvent
	)
	{
		
		var BaseMediator = Class.create(
			puremvc.Mediator,
			{
				
				initialize: function($super, name, viewComponent)
				{
					$super(name, viewComponent);
					
					this.viewComponent.addEventListener(ViewEvent.TYPE, this.handleViewEvent.bindAsEventListener(this));
				},
				
				handleViewEvent: function(event)
				{
					// OVERRIDE
				}
				
			}
		);
		
		return BaseMediator;
		
	}
);
