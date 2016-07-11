/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		// Manager
		'app/common/manager/Manager'
	],
	function
	(
		// Manager
		Manager
	)
	{
		
		var PluginManager = Class.create(
			Manager,
			/** @lends app.core.application.PluginManager# */
			{
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends app.common.manager.Manager
				 * @constructs
				 */
				initialize: function($super)
				{
					
				}
				
			}
		);
		
		return PluginManager;
		
	}
);
