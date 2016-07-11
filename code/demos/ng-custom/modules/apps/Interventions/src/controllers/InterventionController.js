define(
	[],
	function()
	{
		return [
			'$scope',
			'$route',
			'$location',
			'$http', '$document', 'UserService', 'DataService', 'InterventionService', 'DialogService',  '$rootScope', '$modal',
			function($scope, $route, $location, $http, $document, UserService, DataService, InterventionService, DialogService, $rootScope, $modal)
			{
				
				// Get the current parameters
				for(var key in $route.current.params) {
					$scope[key] = $route.current.params[key];
				}
				
				$scope.intervention = null;
				
				// Student List Data
				$scope.interventionList = [];
				InterventionService.getInterventionList(function(data) {
					$scope.interventionList = data;
					if(
						$scope['userId'] != undefined &&
						$scope['interventionId'] != undefined
					) {
						for(var i = 0; i < $scope.interventionList.length; i++) {
							if(
								$scope.interventionList[i].userId == $scope['userId'] &&
								$scope.interventionList[i].interventionId == $scope['interventionId']
							) {
								$scope.intervention = $scope.interventionList[i];
								break;
							}
						}
					}
					$scope.$apply();
				});
				
				
				$scope.$watch('intervention', function(newValue, oldValue, $scope) {
				
					// If the new intervention isn't null
					if(newValue != null) {
						
						// If the intervention is different than what we have in the current scope
						if(
							$scope.userId != newValue.userId ||
							$scope.interventionId != newValue.interventionId
						) {
							var userId = newValue.userId;
							var interventionId = newValue.interventionId;
							$location.path('/Interventions/' + userId + '/' + interventionId);
							$location.replace();
						} else {
							
							/*
							// get the intervention data
							PlpService.getPlp(newValue.userId, newValue.interventionId, function(data) {
								
								
								// Use this property to store all intervention details
								$scope.interventionData = data;
								$scope.currentTabData = data.tabData[$scope.tabName];
								
								
								// Angular JS Form Input fields can only have Default values coming from an ng-model 
								// It also cannot be the same one as the old, as that would make them linked (change one change the other )
								// as well as the displayed value has to have a 'type' like '25%' which must be concatenated from Value+Type
								// so we produce this from goal[2] and goal[4] and save it to goal[3]
					  			for( var i = 0; i < $scope.currentTabData.goals.length; i++)
									$scope.currentTabData.goals[i][3] = $scope.currentTabData.goals[i][2] + $scope.currentTabData.goals[i][4];



								// parse the Course Modules for the tab

								$scope.tabModules = $scope.currentTabData.details;

								//$scope.$apply();
								
							});
							*/
						}
						
					} else {
						
						if(newValue != oldValue) {
							// we are switching to a null PLP
							$location.path('/PlpWizard');
							$location.replace();
						}
						
					}
					
				});
				
			}
		];
	}
);
