define(
	[
		'angular'
	],
	function() {
		'use strict';
		

		return function($document) {
			return {
			
			// Cannot have a separate scope, otherwise it would not work with Ng-repeat
/* 				scope: {
				  //drop: '&' // parent
				  //onDrop: '=', // parent's method to call on drop event
				  //target: '=?' // optional target object
				},  */
				
				
				//link: function(scope, element)
				link: function(scope, element, attrs)
				{
				  // again we need the native object
				  var el = element[0];

				  el.addEventListener(
					'dragover',
					function(e) {
					  e.dataTransfer.dropEffect = 'move';
					  // allows us to drop
					  if (e.preventDefault) e.preventDefault();
					  this.classList.add('over');
					  return false;
					},
					false
				  );

				  el.addEventListener(
					'dragenter',
					function(e) {
					  this.classList.add('over');
					  return false;
					},
					false
				  );

				  el.addEventListener(
					'dragleave',
					function(e) {
					  this.classList.remove('over');
					  return false;
					},
					false
				  );

/*  				  el.addEventListener(
					'drop',
					function(e) {
					  // Stops some browsers from redirecting.
					  if (e.stopPropagation) e.stopPropagation();

					  this.classList.remove('over');

					  var item = document.getElementById(e.dataTransfer.getData('Text'));
					  this.appendChild(item);

					  // call the drop passed drop function
					  scope.$apply('drop()');

					  return false;
					},
					false
				  );  */
				  
				  
				  
 				  el.addEventListener(
					'drop',
					function(e) {
					
					// Stops some browsers from redirecting.
					if (e.stopPropagation) e.stopPropagation();
					
					
					// to prevent Firefox browser redirecting the browser to the 'getData('Text') as a target location: http://html5doctor.com/native-drag-and-drop/
					 if (e.preventDefault) {
						e.preventDefault(); 
					  }
  
					this.classList.remove('over');
					
					
					  // PREVIEW FUNCTIONALITY: Add Item to the Droppable's Div...
					 // var item = document.getElementById(e.dataTransfer.getData('Text')); // get the Item's Div element
					  //this.appendChild(item); // adds the actual Div to the target
					  //_____________________________________________
					  
					  
					  
					  var itemId = e.dataTransfer.getData('Text'); // get the Item's ID
					  var dropTarget = attrs['droptarget']; // get the actual TARGET of where the item is dropped into
					  
					  
					 // console.log("e.dataTransfer.getData('Text') is: " + e.dataTransfer.getData('Text'));
					 // console.log("item is: " + item);
					 // console.log("attrs is: " + attrs);
					 // console.log("attrs.id is: " + attrs.id);
					 // console.log("attrs.name is: " + attrs.name);
					// console.log("id is: " +  e.dataTransfer.getData('Text'));
					 
					 //console.log("drop target is: " +  attrs['droptarget']); 
					 
					//var myFunct = e.dataTransfer.getData('CallBack');
					//myFunct();
					//console.log("e.dataTransfer.getData('CallBack') is: " + e.dataTransfer.getData('CallBack'));
					   //scope.$apply(myFunct());
					
						//attrs['dropper'];
					  //scope.$apply(attrs['drop']); // this calls the callback function letting controller know that it has done the drop

					  // this is not ideal, as directive relies on this function existing on Scope 
					  // ( could not save function dynamically it onto its scope, as this directive cannot have a scope...
					  if(scope.onDropPoint) scope.onDropPoint(itemId, dropTarget);

					 
					  
					  return false;
					},
					false
				  );
				  
				  
				}
			  }
		
		
		
		
		}

	}
);