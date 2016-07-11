/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		// Module includes
		'app/common/module/ModuleFacade',
		
		// Controllers
		'app/loader/controller/StartupCommand'
	],
	function
	(
		// Module includes
		ModuleFacade,
		
		// Controllers
		StartupCommand
	)
	{
		
		var Application = Class.create(
			ModuleFacade,
			/** @lends app.loader.Application# */
			{
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends app.common.module.ModuleFacade
				 * @constructs
				 * @param {String} key The instance key.
				 */
				initialize: function($super, key, data)
				{
					$super(Application.MODULE_NAME, key, data);
				}
				
			}
		);
		
		Application.MODULE_NAME = 'loader';
		
		return Application;
		
	}
);
