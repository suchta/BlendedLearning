define([], function() {
	return ['$scope', '$http', 'UserService', function($scope, $http, UserService) {
		
		$scope.name = UserService.getName();
		
		$scope.$apply();
	}];
});