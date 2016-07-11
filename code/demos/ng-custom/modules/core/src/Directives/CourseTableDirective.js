define(
	[
		'angular'
	],
	function() {
		'use strict';
		
		return function($document) {
			
			// define stuff here
			
			return {
				restrict: 'E',
				  template: '<table class="bls-moduletable"> <tbody>' +
							  '<tr ng-repeat="row in rowsData" ng-style="{ height: cssRowHeight }" >' +
							  
								' <td ng-repeat="cell in row" ng-style="{ width: cssColumnWidth }">' +
									'<span ng-switch="cell.name">'+
									
										'<span ng-switch-when="BLSCalendar"> <a class="bls-calendarbutton" href="" onclick="openCalendarDialog(this)" name="{{cell.value}}">calendar</a> </span>'+
								   
										'<span ng-switch-default>'+
											' <span class="bls-spanTable">'  +
												' <span class="bls-spanRow"> <dd>{{cell.value}}</dd> </span>' +
												'<span class="bls-spanRow"> <dt>{{cell.name}}</dt> </span>' +
											 '</span>' +
										'</span>'+
									
									'</span>'+
								'</td>' +
							  
							  '</tr>' +
							'</tbody></table>',
							
				  scope: {
					numColumns: '=',
					data: '='
				  },
	  
				link: function($scope, $elm, $attrs) {

					//console.log("dataArray is " + $scope.data);
					//console.log("numColumns is " + $scope.numColumns);
					
					// calculate the number of Rows implied by the total Array elements and the colums ( assumes that its not a jagged array )
					$scope.numRows = $scope.data.length / $scope.numColumns;
					
					//$scope.totalHeight = 107 * $scope.numRows; // calculate the total height of the Table to be displayed ( used for the CSS dropdown )
					
					// calculate out the % of the Table Rows/Columns
					$scope.cssColumnWidth = ( 100 / $scope.numColumns).toString() +"%";
					$scope.cssRowHeight =  (100/ $scope.numRows).toString() + "%";
					
					//console.log("cssRowHeight is " + $scope.cssRowHeight);
					//console.log("cssColumnWidth is " + $scope.cssColumnWidth);
					
					// HELPER FUNCTIONS
					$scope.isCalendar = function (name) {
						// console.log('name is ' + name + " /  $scope.tabName: " +  $scope.tabName);
					  return name ==  $scope.tabName ? "bls-currenttab" : "";
					}
					
					// create the Data for each Row ( HTML Tables have Rows which inlcude an array of 'cells' )
					$scope.rowsData = [];
					var currentRow = 0;
					var rowDataCounter = 0;
					$scope.rowsData[currentRow] = [];
					for ( var i = 0; i <  $scope.data.length; i++)
					{
						// save the row Data
						$scope.rowsData[currentRow][rowDataCounter] = { name: $scope.data[i][0], value: $scope.data[i][1] } 
						//console.log("Current Object name/value is " + $scope.rowsData[currentRow][rowDataCounter].name + " / " + $scope.rowsData[currentRow][rowDataCounter].value );

						rowDataCounter++; // increment the number of elements possible to be saved in a Row 
						if( rowDataCounter >= $scope.numColumns) // if there are more than max ( which is equal to columns )
						{
							rowDataCounter = 0; // reset
							currentRow++;	// increment the currently filled row
							$scope.rowsData[currentRow] = []; // create new Array for the Table cells to be held
						}
						
					}
					
					//console.log("numRows is " + $scope.numRows);
				}
			};
		}
		
	}
);