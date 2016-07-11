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
		var HtmlEvent = Class.create(
			BaseEvent,
			/** @lends core.event.HtmlEvent# */
			{
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.DisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function($super, type, event, target)
				{
					$super(type, event, target);
				}
				
			}
		);
		
		Object.extend(
			HtmlEvent,
			{
				CLICK:			"HtmlEvent_Click",
				MOUSE_UP:		"HtmlEvent_MouseUp",
				MOUSE_DOWN:		"HtmlEvent_MouseDown",
				MOUSE_MOVE:		"HtmlEvent_MouseMove",
				
				KEY_DOWN:		"HtmlEvent_KeyDown",
				KEY_UP:			"HtmlEvent_KeyUp",
				
				FOCUS:			"HtmlEvent_Focus",
				BLUR:			"HtmlEvent_Blur",
				
				DRAG_ENTER:		"HtmlEvent_DragEnter",
				DRAG_EXIT:		"HtmlEvent_DragExit",
				DRAG_OVER:		"HtmlEvent_DragOver",
				DROP:			"HtmlEvent_Drop"
			}
		);
		
		return HtmlEvent;
		
	}
);

