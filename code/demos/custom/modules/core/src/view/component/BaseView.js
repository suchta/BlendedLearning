define(
	[
		'core/display/html/HtmlElement'
	],
	function
	(
		HtmlElement
	)
	{
		
		var BaseView = Class.create(
			HtmlElement,
			{
				data: null,
				
				initialize: function($super, html)
				{
					$super('div');
					
					this.element.update(html);
					this.buildElementTree(this.element, this);
				},
				
				buildElementTree: function(element, parent)
				{
					var child, id;
					for(var i = 0; i < element.childNodes.length; i++) {
					
						// Skip text nodes
						if(element.childNodes[i].nodeType == 3) continue;
						
						child = new HtmlElement(element.childNodes[i]);
						
						this.buildElementTree(element.childNodes[i], child);
						parent.children.push(child);
						
						id = child.readAttribute('id');
						if(id) {
							this[id] = child;
						}
					}
				}
				
			}
		);
		
		return BaseView;
		
	}
);
