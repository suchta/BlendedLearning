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
		
		var ModuleFacade = Class.create(
			puremvc.Facade,
			/** @lends app.common.module.ModuleFacade# */
			{
				
				name: null,
				
				data: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends puremvc.Facade
				 * @constructs
				 * @param {String} key The instance key.
				 */
				initialize: function($super, name, key, data)
				{
					this.name = name;
					if(this.data) this.data = data;
					$super(key);
					this.startup();
				},
				
				startup: function()
				{
					
				}
				
			}
		);
		
		return ModuleFacade;
		
	}
);
