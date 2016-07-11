/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'puremvc'
	],
	function
	(
		puremvc
	)
	{
		
		var ViewPrepCommand = Class.create(
			/** @lends app.core.controller.ViewPrepCommand# */
			puremvc.SimpleCommand,
			{
				
				execute: function(notification)
				{
					console.log('Core::ViewPrepCommand - At End');
				}
				
			}
		);
		
		return ViewPrepCommand;
		
	}
);
