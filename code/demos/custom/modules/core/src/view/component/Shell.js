/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'core/view/component/BaseView',
		'text!core/templates/Shell.html',
		
		'core/display/html/HtmlElement',
		'core/event/HtmlEvent',
		'core/event/ViewEvent'
		
	],
	function
	(
		BaseView,
		html,
		
		HtmlElement,
		HtmlEvent,
		ViewEvent
	)
	{
		
		var Shell = Class.create(
			/** @lends app.core.view.component.Shell# */
			BaseView,
			{
				
				initialize: function($super)
				{
					$super(html);
				},
				
				// inserting app icon
				insertApplication: function(application)
				{
					var appButton = new HtmlElement(new Element('div', {'class': 'Application'}));
					appButton.element.innerHTML = application.getIcon();
					this.systemPanel.addChild(appButton);
					appButton.addEventListener(
						HtmlEvent.CLICK,
						this.handleApplicationClick.bindAsEventListener(this, application)
					);
				},
				
				showApplication: function(application)
				{
					
				},
				
				handleApplicationClick: function(event, application)
				{
					var event = new ViewEvent(Shell.APPLICATION_CLICKED, application, this);
					this.dispatchEvent(event);
				}
				
				
			}
		);
		
		Shell.APPLICATION_CLICKED = "ApplicationClicked";
		
		return Shell;
		
	}
);
