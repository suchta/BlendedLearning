/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[],
	function()
	{
		
		var BaseEvent = Class.create(
			{
				
				type: null,
				
				data: null,
				
				target: null,
				
				initialize: function(type, data, target)
				{
					this.type = type;
					this.data = data;
					this.target = target;
				},
				
				getData: function()
				{
					return this.data;
				}
				
			}
		);
		
		return BaseEvent;
		
	}
);
