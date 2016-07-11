define(
	[
		'angular'
	],
	function() {
		'use strict';
		
		return function($document, $timeout, DialogService) {
			return {
				restrict: 'A',
				scope: {
					chart: '=chart'
				},
				link: function($scope, $elm, $attr) {
					
					$elm[0].style.width = "300px";
					$elm[0].style.height = "300px";
					
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
										
										//$document.find('svg').attr({width: "100%", height: "100%", viewBox: "0 0 300 300"});
										
										// Setting div element style
										//$elm[0].style.width = "30%";
										//$elm[0].style.height = "";
										
										//$elm[0].children[0].style.width = "";
										
										//$elm[0].children[0].children[0].style.width = "";
										//$elm[0].children[0].children[0].style.height = "";
										
										$elm[0].removeAttribute('style');
										$elm[0].children[0].removeAttribute('style');
										$elm[0].children[0].style.maxHeight = '300px';
										$elm[0].children[0].style.minHeight = '200px';
										$elm[0].children[0].children[0].removeAttribute('style');
										$elm[0].children[0].children[0].children[0].removeAttribute('style');
										
										if(navigator.appName.indexOf("Internet Explorer")==-1){
											$elm[0].children[0].children[0].children[0].setAttribute('width', '100%');
											$elm[0].children[0].children[0].children[0].setAttribute('height', '100%');
										} else {
											$elm[0].style.minHeight = '300px';
											$elm[0].style.minWidth = '300px';
											$elm[0].children[0].children[0].children[0].setAttribute('width', '300px');
											$elm[0].children[0].children[0].children[0].setAttribute('height', '300px');
										}
										$elm[0].children[0].children[0].children[0].setAttribute('viewBox', '0 0 300 300');
										
									});
									google.visualization.events.addListener($scope.chartWrapper, 'error', function(err) {
										console.log("Error while displaying chart: " + err.message);
									});
									
									// select sector of pie graph
									google.visualization.events.addListener($scope.chartWrapper, 'select', function() {
										var chartWrapper = $scope.chartWrapper.getChart();
										var selection = chartWrapper.getSelection();
										// create a popup directive
										var allStudents = $scope.chart.students;
										var students = [];
										var divId = $scope.chart.options.title.replace(/\s/g, '').toLowerCase();
										var data = {};
										
										if(selection[0])
										{
											// create student popup menu
											var title = "";
											switch(selection[0].row) {
												case 0:
													students = allStudents.abovePace;
													title = "<span style=\"color:blue; font-weight: bold;\">Ahead Of Pace ";
													break;
												case 1:
													students = allStudents.belowPace;
													title = "<span style=\"color:red; font-weight: bold;\">Behind Pace ";
													break;
												case 2:
													students = allStudents.onPace;
													title = "<span style=\"color:green; font-weight: bold;\">On Pace ";
													break;
											}
											
											var totalValue = 0;
											for(var i=0; i<dataTable.getNumberOfRows(); i++) {
												totalValue += parseInt(dataTable.getFormattedValue(i, 1));
											}
											
											var ul = new Element('ul', {
												'id': 'student_popupmenu',
												'class': 'list'
											});
											var li = new Element('li');
											li.update(title + (parseInt(dataTable.getFormattedValue(selection[0].row, 1)) / totalValue) * 100 + "%</span>");
											ul.insert(li);
											
											for(var i=0; i<students.length; i++) {
												li = new Element('li');
												li.update(students[i].name);
												ul.insert(li);
												li.observe('click', function(event) {
													$scope.$apply(function() {
														$scope.launchStudentWarning();
														$scope.chartWrapper.getChart().setSelection(null);
														$scope.closePopup();
													});
												}.bindAsEventListener(this));
											}
											
											data.html = ul;
											data.id = 'student_popupmenu';
											data.fn = function() {
												$scope.chartWrapper.getChart().setSelection(null);
											}
											$scope.createPopup(data);
										} else {
											$scope.closePopup();
										}
									});
								} else {
									$scope.chartWrapper.setChartType($scope.chart.type);
									$scope.chartWrapper.setDataTable(dataTable);
									$scope.chartWrapper.setView($scope.chart.view);
									$scope.chartWrapper.setOptions($scope.chart.options);
								}
								
								// draw material bin and setup popup menu
								var divId = $scope.chart.options.title.replace(/\s/g, "").toLowerCase();
								var data = {};
								var materialbin = "<div id=\"" + divId + "_materialbin\" class=\"material_bin\"><img src=\"/core/res/icons/dashboard.materialbin.png\" /></div>";
								angular.element($elm[0]).append(materialbin);
								$(divId + "_materialbin").observe('click', function(event) {
									var db_popupmenu = $document.find('db_popupmenu');
									if(db_popupmenu.html() != '' && db_popupmenu.html().indexOf($scope.chart.options.title) != -1 && db_popupmenu.html().indexOf('material_popupmenu') != -1) {
										$scope.closePopup();
										return;
									}
									var ul = new Element('ul', {
										'id': 'material_popupmenu',
										'class': 'list'
									});
									var fli = new Element('li');
									fli.update('<span style="color:#39a277; font-weight: bold;">' + $scope.chart.options.title + ' classes</span>');
									ul.insert(fli);
									for(var i=0; i<$scope.chart.collaborative.length; i++) {
										var li = new Element('li', {
											'id': $scope.chart.collaborative[i].id
										});
										li.update($scope.chart.collaborative[i].name);
										li.observe('click', function(event) {
											$scope.$apply(function() {
												$scope.launchMaterialWarning();
												$scope.closePopup();
											});
										}.bindAsEventListener(this));
										ul.insert(li);
									}
									data.html = ul;
									data.id = 'material_popupmenu';
									$scope.createPopup(data);
								}.bindAsEventListener(this));
								
								$scope.chartWrapper.draw();
								
							}, 0, true);
						}
					}
				},
				
				controller: [
					'$scope',
					function
					(
						$scope
					) {
						$scope.launchStudentWarning = function() {
							DialogService({
								id: 'dashboard-student-warning',
								title: 'Dashboard Alert',
								body: '<p>In the final version of the Blended Learning Suite, clicking on a students name will display the students detail page.</p>'
							});
						}
						
						$scope.launchMaterialWarning = function() {
							DialogService({
								id: 'dashboard-material-warning',
								title: 'Dashboard Alert',
								body: '<p>In the final version of the Blended Learning Suite, clicking on a course name will display the course detail page.</p>'
							});
						}
						
						$scope.createPopup = function(data) {
							var db_popupmenu = $document.find('db_popupmenu');
							db_popupmenu.html('');
							db_popupmenu.append(data.html);
							db_popupmenu.bind('mouseout click', function(e) {
								var relTarg = e.relatedTarget || e.fromElement;
								if(relTarg && relTarg.id == data.id) {
									db_popupmenu.unbind('mouseout click');
									var callback = data.fn || function() {};
									callback.call(this);
									$scope.closePopup();
								}
							});
						};
						
						$scope.closePopup = function() {
							var db_popupmenu = $document.find('db_popupmenu');
							db_popupmenu.unbind('mouseout click');
							db_popupmenu.html('');
						}
					}
				]
				
			};
		}
	}
);