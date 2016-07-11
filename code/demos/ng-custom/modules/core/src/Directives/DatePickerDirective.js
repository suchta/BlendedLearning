define(
	[
		'angular'
	],
	function() {
		'use strict';
		// $scope, $elm, $attrs

		return function($document) {
				return {
					restrict: 'A',
					link: function ($scope, $elm, $attrs) {       
						
						$elm.datepicker($scope.datepickerOpts);  
						
						$elm.bind('changeDate',function(e){
							console.log("datepicker.date is: " + e.date);
							
							if($scope.datePickCallBack) $scope.datePickCallBack(e.date);                
						})
					}
				};
		
		
		
		
		}

	}
);