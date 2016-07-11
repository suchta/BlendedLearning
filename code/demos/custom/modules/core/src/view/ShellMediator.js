define(
	[
		'core/CoreConstants',
		'core/view/BaseMediator',
		'core/view/component/Shell'
	],
	function
	(
		CoreConstants,
		BaseMediator,
		Shell
	)
	{
		
		var ShellMediator = Class.create(
			BaseMediator,
			{
				
				initialize: function($super, viewComponent)
				{
					$super(ShellMediator.NAME, viewComponent);
				},
				
				listNotificationInterests: function()
				{
					return [
						CoreConstants.INSERT_APPLICATION,
						CoreConstants.SHOW_APPLICATION
					];
				},
				
				handleNotification: function(notification)
				{
					var name = notification.getName();
					var body = notification.getBody();
					
					switch(name) {
						case CoreConstants.INSERT_APPLICATION:
							this.handleInsertApplication(body);
							break;
						case CoreConstants.SHOW_APPLICATION:
							this.handleShowApplication(body);
							break;
					}
				},
				
				handleViewEvent: function(event)
				{
					var name = event.getName();
					switch(name) {
						case Shell.APPLICATION_CLICKED:
							this.handleApplicationClicked(event.getData());
							break;
					}
				},
				
				handleInsertApplication: function(application)
				{
					this.viewComponent.insertApplication(application);
				},
				
				handleShowApplication: function(application)
				{
					this.viewComponent.showApplication(application);
				},
				
				handleApplicationClicked: function(application)
				{
					console.log(application);
					alert("Application Clicked: " + application.getName());
					
					// Code for loading Application.
					
				}
				
			}
		);
		
		Object.extend(
			ShellMediator,
			{
				NAME: "ShellMediator"
			}
		);
		
		return ShellMediator;
		
	}
);
