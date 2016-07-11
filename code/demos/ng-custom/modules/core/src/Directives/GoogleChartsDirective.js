define(
	[
		'angular'
	],
	function() {
		'use strict';
		
		return function($timeout) {
			return {
				restrict: 'A',
				scope: {
					chart: '=chart'
				},
				link: function($scope, $elm, $attr) {
					$scope.$watch('chart', function() {
						draw();
					}, true);
					
					function draw() {
						if(!draw.triggered && ($scope.chart != undefined || $scope.chart != null)) {
							draw.triggered = true;
							$timeout(function() {
								draw.triggered = false;
								var dataTable = new google.visualization.arrayToDataTable($scope.chart.data);
								
								var chartWrapperArgs = {
									chartType: $scope.chart.type,
									dataTable: dataTable,
									view: $scope.chart.view,
									options: $scope.chart.options,
									containerId: $elm[0]
								};
								
								if($scope.chartWrapper == null) {
									$scope.chartWrapper = new google.visualization.ChartWrapper(chartWrapperArgs);
									google.visualization.events.addListener($scope.chartWrapper, 'ready', function() {
										$scope.chart.displayed = true;
									});
									google.visualization.events.addListener($scope.chartWrapper, 'error', function(err) {
										console.log("Error while displaying chart: " + err.message);
									});
								} else {
									$scope.chartWrapper.setChartType($scope.chart.type);
									$scope.chartWrapper.setDataTable(dataTable);
									$scope.chartWrapper.setView($scope.chart.view);
									$scope.chartWrapper.setOptions($scope.chart.options);
								}
								
								$timeout(function() {
									$scope.chartWrapper.draw();
								});
							}, 0, true);
						}
					}
					
				}
			};
		}
	}
);