define(
	[
		'angular'
	],
	function() {
		'use strict';
		
		return function($document) {
			var openElement = null,
			closeMenu = angular.noop;
			return {
				restrict: 'A',
				link: function($scope, $elm, $attrs) {
					$elm.bind('click', function(e) {
						var elementWasOpen = ($elm == openElement);
						
						e.preventDefault();
						e.stopPropagation();
						
						if(!!openElement) {
							closeMenu();
						}
						
						if(!elementWasOpen) {
							$elm.parent().addClass('open');
							openElement = $elm;
							
							closeMenu = function(e) {
								if(e) {
									e.preventDefault();
									e.stopPropagation();
								}
								$document.unbind('click', closeMenu);
								$elm.parent().removeClass('open');
								closeMenu = angular.noop;
								openElement = null;
							};
							$document.bind('click', closeMenu);
						}
					});
				}
			};
		}
		
	}
);