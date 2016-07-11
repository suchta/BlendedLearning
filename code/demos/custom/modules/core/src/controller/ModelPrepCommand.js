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
		
		var ModelPrepCommand = Class.create(
			/** @lends app.core.controller.ModelPrepCommand# */
			puremvc.SimpleCommand,
			{
				
				execute: function(notification)
				{
					console.log('Core::ModelPrepCommand - At End');
				}
				
			}
		);
		
		return ModelPrepCommand;
		
	}
);
