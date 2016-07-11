/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'puremvc',
		'core/CoreConstants',
		
		// Controllers
		'core/controller/StartupCommand'
	],
	function
	(
		puremvc,
		CoreConstants,
		
		// Controllers
		StartupCommand
	)
	{
		
		var CoreFacade = Class.create(
			puremvc.Facade,
			/** @lends app.core.Application# */
			{
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends puremvc.Facade
				 * @constructs
				 * @param {Object} options startup options
				 */
				initialize: function($super, options)
				{
					$super(CoreConstants.KEY);
					this.startup(options);
				},
				
				initializeController: function($super)
				{
					$super();
					this.registerCommand(CoreConstants.STARTUP, StartupCommand);
				},
				
				startup: function(options)
				{
					var defaultOptions = {
						onLoaded: function() {},
						shell: new Element('div')
					};
					
					if(options && typeof options == 'object') 
						defaultOptions = Object.extend(defaultOptions, options);
					
					this.sendNotification(CoreConstants.STARTUP, defaultOptions);
				}
				
			}
		);
		
		return CoreFacade;
		
	}
);
