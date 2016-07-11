/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
	],
	function
	(
	)
	{
		
		var Application = Class.create(
			/** @lends app.core.application.Application# */
			{
				
				name: null,
				
				icon: null,
				
				focused: false,
				
				loaded: false,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 */
				initialize: function(name, icon)
				{
					this.name = name;
					this.icon = icon;
				},
				
				isLoaded: function()
				{
					return this.loaded;
				},
				
				isFocused: function()
				{
					return this.focused;
				},
				
				getName: function()
				{
					return this.name;
				},
				
				getIcon: function()
				{
					return this.icon;
				}
				
			}
		);
		
		return Application;
		
	}
);
