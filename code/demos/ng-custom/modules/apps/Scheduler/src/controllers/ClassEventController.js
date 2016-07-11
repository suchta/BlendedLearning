define(
	[],
	function() {
		return [
			'$scope', 
			'$route',
			'$location',
			'$http', 
			function($scope, $route, $location, $http)
			{
				
				// Get the current parameters
				for(var key in $route.current.params) {
					$scope[key] = $route.current.params[key];
				}
				
				// Retrieve the event data for the current event
				console.log("EventController.js");
				
				$scope.$apply();
			}
		];
	}
);