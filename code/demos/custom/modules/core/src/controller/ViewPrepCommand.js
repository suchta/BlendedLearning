/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'puremvc',
		'core/view/ShellMediator',
		'core/view/component/Shell',
		'core/CoreConstants',
		
		'core/application/Application'
	],
	function
	(
		puremvc,
		ShellMediator,
		Shell,
		CoreConstants,
		
		Application
	)
	{
		
		var ViewPrepCommand = Class.create(
			/** @lends app.core.controller.ViewPrepCommand# */
			puremvc.SimpleCommand,
			{
				
				execute: function(notification)
				{
					var shell = new Shell();
					var shellMediator = new ShellMediator(shell);
					this.facade.registerMediator(shellMediator);
					
					var body = notification.getBody();
					body.shell.insert(shell.element);
					
					// Add applications
					var app1 = new Application('CoursePlayer', 'CP');
					this.sendNotification(CoreConstants.INSERT_APPLICATION, app1);
					var app2 = new Application('Scheduler', 'S');
					this.sendNotification(CoreConstants.INSERT_APPLICATION, app2);
					
					body.onLoaded();
				}
				
			}
		);
		
		return ViewPrepCommand;
		
	}
);
