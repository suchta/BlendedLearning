/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'puremvc', 
		'./ModelPrepCommand', 
		'./ViewPrepCommand'
	],
	function
	(
		puremvc, 
		ModelPrepCommand, 
		ViewPrepCommand
	)
	{
		
		var StartupCommand = Class.create(
			/** @lends app.loader.controller.StartupCommand# */
			puremvc.MacroCommand,
			{
				
				initializeMacroCommand: function()
				{
					this.addSubCommand(ModelPrepCommand);
					this.addSubCommand(ViewPrepCommand);
				}
				
			}
		);
		
		return StartupCommand
		
	}
);

