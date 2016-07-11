/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'core/event/BaseEvent'
	],
	function(BaseEvent)
	{
		var ViewEvent = Class.create(
			BaseEvent,
			/** @lends core.event.ViewEvent# */
			{
				
				name: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.DisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function($super, name, event, target)
				{
					$super(ViewEvent.TYPE, event, target);
					
					this.name = name;
					
				},
				
				getName: function()
				{
					return this.name;
				}
				
			}
		);
		
		Object.extend(
			ViewEvent,
			{
				TYPE: "ViewEvent"
			}
		);
		
		return ViewEvent;
		
	}
);

