define(
	[],
	function()
	{
		return [
			'$scope',
			'$route',
			'$location',
			'$http', '$document', 'UserService', 'DataService', 'PlpService', 'DialogService',  '$rootScope', '$modal',
			function($scope, $route, $location, $http, $document, UserService, DataService, PlpService, DialogService, $rootScope, $modal)
			{
				
				// Get the current parameters
				for(var key in $route.current.params) {
					$scope[key] = $route.current.params[key];
				}
				
				$scope.plp = null;
				$scope.plpData = null;
				
				// Student List Data
				$scope.plpList = [];
				PlpService.getPlpList(function(data) {
					$scope.plpList = data;
					if(
						$scope['userId'] != undefined &&
						$scope['plpId'] != undefined
					) {
						for(var i = 0; i < $scope.plpList.length; i++) {
							if(
								$scope.plpList[i].userId == $scope['userId'] &&
								$scope.plpList[i].plpId == $scope['plpId']
							) {
								$scope.plp = $scope.plpList[i];
								break;
							}
						}
					}
					$scope.$apply();
				});
				
				$scope.$watch('plp', function(newValue, oldValue, $scope) {
				
					// If the new plp isn't null
					if(newValue != null) {
						
						// If the plp is different than what we have in the current scope
						if(
							$scope.userId != newValue.userId ||
							$scope.plpId != newValue.plpId
						) {
							var userId = newValue.userId;
							var plpId = newValue.plpId;
							var tabName = 'Attendance'
							if($scope.tabName) tabName = $scope.tabName;
							
							$location.path('/PlpWizard/' + userId + '/' + plpId + '/' + tabName);
							$location.replace();
						} else {
							
							// get the plp data
							PlpService.getPlp(newValue.userId, newValue.plpId, function(data) {
								
								
								// Use this property to store all plp details
								$scope.plpData = data;
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
						
						}
						
					} else {
						
						if(newValue != oldValue) {
							// we are switching to a null PLP
							$location.path('/PlpWizard');
							$location.replace();
						}
						
					}
					
				});
				
				
				
				
				// Handling tab notes
				$scope.openCurrentTabNotes = function()
				{
					
					var notes = $scope.currentTabData.notes;
					
					var opts = {
						backdrop: true,
						keyboard: true,
						//template: t,
						templateUrl:  'apps/PlpWizard/tpl/notes.html?killcache=' + new Date().getTime(),
						controller: function($scope, $modalInstance) {
							
							$scope.notes = notes;
							
							$scope.close = function() {
								$modalInstance.close(this.notes);
							};
						}
					};
					
					var modalInstance = $modal.open(opts);
					
					console.log('modal');
					
					modalInstance.result.then(
						function (notes) {
							// Save the note data
							$scope.currentTabData.notes = notes;
						},
						function () {
							// Dismissed
						}
					);
					
				};
				
				$scope.sendMessage = function()
				{
					
					var opts = {
						backdrop: true,
						keyboard: true,
						templateUrl:  'apps/PlpWizard/tpl/message.html?killcache=' + new Date().getTime()
					};
					
					var modalInstance = $modal.open(opts);
				}
				
				// _____________________________ HARD CODED DATA _________________________________
				
				$scope.numLearningObjects = [];
				for ( var z = 0; z < 17; z++) $scope.numLearningObjects[z] = {};
				/*
				// main student data
				$scope.studentData = [
					{
						data: "xx-year",
						toolTip: ""
					},
					{
						data: "xx-school blablabla looong!",
						toolTip: ""
					},
					{
						data: "11th grade",
						toolTip: ""
					},
					{
						data: "(555) 555-5555",
						toolTip: "Parent's cell"
					}
				];
				
				// student details data: map 2 pieces of data http://stackoverflow.com/questions/5745960/javascript-dictionary-with-names
				$scope.studentDetails = [
					["First Name", "Jonny"], // col 1
					["Last Name", "Morill"], // col 2
					["Middle Name", "C."],	 // col 3
					
					["Suffix", "Jr."],
					["Nickname", "Jonny"],
					["Age", "14"], 
					
					["Student ID", "100341"],
					["Schools", "Big Spring High School"],
					["Family ID", "356"], 
					
					["Username", "test"],
					["Password", "test"],
					["User ID", "756"],
					
					["Gender", "Male"],
					["BirthDay", "09/05/1999"],
					["Student State ID", "Male"],
					
					["Status", "Active"],
					["Email", "<a href='mailto:test.text@gmail.com'> test.text@gmail.com</a>"],  // use  | linky filter if ngResource can be loaded
					["Timezone", "(GMT -5, DST) Eastern State"],
					
					["Country", "United States of America"],
					["School District", "something"],
					["Student Role", "Tutor"],
					
					["Grade Level", "11th Grade"],
					["Grade Level Stard Date", "09/05/2009"],
					["Genious Username", "test"]
				];


				// goals Data for each tab
				$scope.goalsDataAbsences = [
					  ["Maximum Tardies", "2"] ,
					  ["Maximum Absences", "1"] 
				];	
				
				$scope.goalsDataPerformance = [
					  ["Maximum Final Grade", "70%"] ,
					  ["Minimum Grade to Date", "75%"] ,
					  
					  ["Minimum Minutes in Course", "2,500"] ,
					  ["Minimum Daily Progress", "400"] ,
					  ["Minimum Course Complete by Date", "2"] ,
					  ["Minimum Diagnostic Scores", "37%"] 
				];
				
				$scope.goalsDataModesOfLearning = [
					  ["Minimum Foundational Completion %", "80%"] ,
					  ["Minimum Collaborative Completion %", "80%"] ,
					  
					  ["Minimum Conceptual Completion %", "80%"] ,
					  ["Minimum Personal Completion %", "80%"] ,
					  ["Tutoring Concept Mastery %", "80%"] 
				];
				
				$scope.goalsDataIntervetion = [
					  ["Minimum % of intervention cleared", "75%"] ,
					  ["Maximum number of assessment failure on same standard", "3"] 
				];
				
				$scope.goalsDataChecklist = [
					  ["Minimum 7 Day Progress", "100%"] ,
					  ["Complete a given course by given date (outside of PLP period logic)", "100%"] 
				];
				
				
				// Moduls data for each tab
				
				
				// simulate the 'raw' data for each tab's modules
				var modulesDataAbsences_Raw = [
					["main", "DAILY SYSTEM ATTENDANCE", 0, "",false,   [  ["sub", "Sub Module", 0, "", false, [], []]  ]  , [] ],
					["main", "CLASS ATTENDANCE", 1, "",false,   
						[  
							["sub", "Geometry Foundation", 0, "", false, [], []],  
							["sub", "Grade 9 World Literature", 0, "", false, [], []],
							["sub", "AP Biology", 1, "Absences", true, [], []],
							["sub", "Honors World History", 0, "", false, [], []],
							["sub", "Psychology", 0, "", false, [], []]
						] , [] ]																										
				];
					
				var modulesDataPerformance_Raw = [
					["sub", "Geometry Foundation", 0, "", false, [], []],  
					["sub", "Grade 9 World Literature", 1, "Minutes in Course", true, [], []],
					["sub", "AP Biology", 0, "", false, [], []],
					["sub", "Honors World History", 0, "", false, [], []],
					["sub", "Psychology", 0, "", false, [], []]
																									
				];
					
				var modulesDataModesOfLearning_Raw = [
					["sub", "Geometry Foundation", 0, "", false, [], []],  
					["sub", "Grade 9 World Literature", 1, "Tutoring", true, [], []],
					["sub", "AP Biology", 0, "", false, [], []],
					["sub", "Honors World History", 0, "", false, [], []],
					["sub", "Psychology", 0, "", false, [], []]																									
				];
				
				var modulesDataIntervention_Raw = [
					["sub", "Geometry Foundation", 0, "", false, [], []],  
					["sub", "Grade 9 World Literature", 1, "Minimum %", true, [], []],
					["sub", "AP Biology", 0, "", false, [], []],
					["sub", "Honors World History", 0, "", false, [], []],
					["sub", "Psychology", 0, "", false, [], []]																									
				];
				
				var modulesDataChecklist_Raw = [
					["sub", "Geometry Foundation", 0, "", false, [], []],  
					["sub", "Grade 9 World Literature", 0, "", false, [], []],
					["sub", "AP Biology", 0, "", false, [], []],
					["sub", "Honors World History", 0, "", false, [], []],
					["sub", "Psychology", 0, "", false, [], []]																									
				];
				
				
				// parser for the data objects
				$scope.parseModulData = function (rawData) {
					var parsedData = [];
					var modul;
					var modulData;
					
					for ( var j =0; j < rawData.length; j++)
					{
						modul = rawData[j];
						modulData = new Object();
						modulData.type= modul[0];
						modulData.title= modul[1];
						modulData.alerts= modul[2];
						modulData.events= modul[3] ;
						modulData.messages= modul[4];

						// the submodules are recursively parsed with this same function
						modulData.subModules  = $scope.parseModulData( modul[5])

						modulData.data= modul[6] ; 	

						parsedData.push(modulData);
					} 
					return parsedData;
				};
				

				
				// save the datas
				$scope.modulesDataAbsences = $scope.parseModulData(modulesDataAbsences_Raw);
				$scope.modulesDataPerformance = $scope.parseModulData(modulesDataPerformance_Raw);
				$scope.modulesDataModesOfLearning = $scope.parseModulData(modulesDataModesOfLearning_Raw);
				$scope.modulesDataIntervention = $scope.parseModulData(modulesDataIntervention_Raw);
				$scope.modulesDataChecklist = $scope.parseModulData(modulesDataChecklist_Raw);
				*/
				
				/*for (j =0; j < $scope.modulesDataAbsences.length; j++)
				{
					var modulData = $scope.modulesDataAbsences[j];
					//alert("Module read: " + modulData.type + " / " +  modulData.title + " / " + modulData.alerts+ " / " + modulData.events+ " / " + modulData.messages+ " / " + modulData.subModules+ " / " + modulData.data);
				}*/
				
				
				/* The Data Structure for modules after parsing
				{
				  type: "main", // if its a 'main' or a 'sub' module type
				  title: "Module Title",
				  alerts: 0, // if the exclamation mark appears, this is also used as a counter concatonated to the title like 'ATTENDANCE + "(" + alerts + ")"
				  events: "" // if some text appears next to the exclamation mark
				  messages: true, // if the Chat button appears
				  subModules: [], // an array of submodules, each of them having the same structure as this
				  data: []  
				}*/
				
				// _____________________________ HARD CODED DATA END _____________________________
				
				
				
				$scope.tabs = [
					{
						name: "Attendance",
						title: "Attendance"//, 
						//alerts: 4 // hardcoded for now, which will be displayed as "("+ 1 +")",
					},
					{
						name: "Performance", 
						title: "Performance"//,
						//alerts: 0
					},
					{
						name: "ModesOfLearning",
						title: "Modes of Learning"//,
						//alerts: 0
					},
					{
						name: "Intervention",
						title: "Intervention"//,
						//alerts: 5
					},
					{
						name: "Checklist",
						title: "Checklist"//,
						//alerts: 0
					}
				];
				
				
				// HELPER FUNCTIONS
				$scope.isCurrentTab = function (name) {
					// console.log('name is ' + name + " /  $scope.tabName: " +  $scope.tabName);
				  return name ==  $scope.tabName ? "bls-currenttab" : "";
				}
	
				$scope.tabAlerts = function (name) {
					if($scope.plpData == null) return "";
					return $scope.alertstext($scope.plpData.tabData[name].alertCount);
				}
				
				$scope.alertstext = function (alerts) {
					var alertValue = alerts;
					if(alertValue == undefined || alertValue == null || alertValue == "")  alertValue = 0; 
					   
					   
					return alertValue == 0 ? "" : " ("+ alertValue +")";
				}
				
				$scope.convertNullString = function (condition) {
					if(condition == undefined || condition == null) return "";
					return condition;
				}
				
				$scope.isHiddenStyle = function (condition) {
					if(condition == false || condition == "false" || condition == undefined || condition == null || condition == "") return "display:none";
					return "";
				}
				
				// Helpers deciding styling of Main/SubModules
				$scope.isSubModuleTitle = function (condition) {
					if(condition == "sub") return "bls-submoduletitle";
					return "bls-mainmoduletitle";
				}
				
				$scope.isSubModuleDetailButton = function (condition) {
					if(condition == "sub") return "bls-buttonsmall bls-greenbutton2 bls-moduledetailslink";
					return "bls-mainmoduledetailslink";
				}
				
				$scope.isSubModuleToggle = function (condition, childModules) {
					// This is a hacky fix, if the first 'Child' element is supposed to hold a 'Charts' type of data, then we need to know...
					if (childModules && childModules[0].type == "chart") return "moduledetailtoggle_charts";
					
					if(condition == "sub") return "moduledetailtoggle";
					return "mainmoduledetailtoggle";
				}			
				
				// Change the template based upon the current tab
				//var tabData = null;
				var tabTemplate = null;
				//var tabModules = null;
				switch($scope.tabName) {
					case "Attendance":
						tabTemplate = "/apps/PlpWizard/tpl/Template.html";
						//tabData = $scope.goalsDataAbsences;
						//tabModules = $scope.modulesDataAbsences;
						//tabTemplate = "/apps/PlpWizard/tpl/Attendance.html";
						break;
					case "Performance":
						tabTemplate = "/apps/PlpWizard/tpl/Template.html";
						//tabData = $scope.goalsDataPerformance;
						//tabModules = $scope.modulesDataPerformance;
						//tabTemplate = "/apps/PlpWizard/tpl/Performance.html";
						break;
					case "ModesOfLearning":
						tabTemplate = "/apps/PlpWizard/tpl/Template.html"; // Template_charts.html";
						//tabData = $scope.goalsDataModesOfLearning;
						//tabModules = $scope.modulesDataModesOfLearning;
						//tabTemplate = "/apps/PlpWizard/tpl/ModeOfLearning.html";
						break;
					case "Intervention":
						tabTemplate = "/apps/PlpWizard/tpl/Template.html";
						//tabData = $scope.goalsDataIntervetion;
						//tabModules = $scope.modulesDataIntervention;
						//tabTemplate = "/apps/PlpWizard/tpl/Intervention.html";
						break;
					case "Checklist":
						tabTemplate = "/apps/PlpWizard/tpl/Template.html";
						//tabData = $scope.goalsDataChecklist;
						//tabModules = $scope.modulesDataChecklist;
						//tabTemplate = "/apps/PlpWizard/tpl/Checklist.html";
						break;
				}
				if(tabTemplate != null) $scope.tabTemplate = tabTemplate;
				//if(tabData != null) $scope.tabData = tabData;
				//if(tabModules != null) $scope.tabModules = tabModules;
				
				
				$scope.isCurrentTab = function (name) {
					// console.log('name is ' + name + " /  $scope.tabName: " +  $scope.tabName);
				  return name ==  $scope.tabName ? "bls-currenttab" : "";
				}		
				
				
				
				
				

				
				
				
				//____________________ CHART DATA _____________________________
		// we must add the click listener to an element which is loaded in at the time plp.html, elements in sub templates ( ng-includes) will NOT work as they are not ready
	/*	$("bls-templatetnclude").on("click", function(e){
			var posx = posy = x = X = Y = 0;
			
			
			
			x = $("bls-templatetnclude").getBoundingClientRect().left;
			X = (e.pageX) ? e.pageX : e.clientX;
			posx = X - x + 85;
			Y = (e.pageY) ? e.pageY : e.clientY;
			posy = Y + 5;
			
			var element = document.elementFromPoint(posy, posx);
			//alert("element.className.indexOf('SVG'): " + ( String(element.className).indexOf('SVG')) + " /  class: " + element.className )
			if(element ) //  &&  String(element.className).indexOf('SVG') != -1 // only move it if we have clicked on an SVG graphic ( which can only be a chart )
			{
				 $document.find("db_popupmenu").css({top: posy + "px", left: posx + "px"});
				//alert("element className is: " + element.className);   // SVGSVGElement
				

			}
			
			//alert("element is: " + element.class)
		});
			
			

					

		var currentTeacherIndex = -1;
		var currentCourseIndex = -1;
		var chartType = "PieChart";
		var courses = [];
		
		function getRandomTeacher() {
			if(DataService.getTeacherData().length == 0) return null;
			var teacherLength = parseInt(DataService.getTeacherData().length);
			var teacherIndex = 0;
			if(teacherLength > 1) {
				teacherIndex = Math.random() * teacherLength;
			}
			$scope.name = DataService.getTeacherData()[teacherIndex].teacher
			return teacherIndex;
		}
		
		function buildCourses(teacher_index) {
			this.currentTeacherIndex = teacher_index;
			return DataService.getTeacherData()[teacher_index].courses;
		}
		
		function buildStudents(course_id) {
			if(this.currentTeacherIndex == -1 || this.currentTeacherIndex == 'undefined') return;
			for(var i = 0; i < DataService.getTeacherData()[this.currentTeacherIndex].courses.length; i++) {
				if(course_id == DataService.getTeacherData()[this.currentTeacherIndex].courses[i]) {
					this.currentCourseIndex = i;
					return DataService.getTeacherData()[this.currentTeacherIndex].courses[i].students;
				}
			}
		}
		
		function buildCharts(course_data) {
			var charts = [];
			for(var i = 0; i < course_data.length; i++) {
				var course = course_data[i];
				var chart = {};
				chart.type = chartType;
				chart.title = course.name;
				chart.displayed = false;
				chart.column = ["Task", "+", "-", "On pace"];
				var data = buildChartData(course);
				chart.row = data.row;
				chart.students = data.students;
				chart.collaborative = course.collaborative_lessons;
				charts.push(chart);
			}
			return angular.toJson({charts:charts});
		}
		
		function buildChartData(course) {
			var data = {};
			var row = ["Pace"];
			var students = {
				abovePace: [],
				belowPace: [],
				onPace: []
			};
			var abovePace = belowPace = onPace = 0;
			for(var i = 0; i < course.students.length; i++) {
				if(course.students[i].grade > course.passing) {
					abovePace++;
					students.abovePace.push(course.students[i]);
				} else if(course.students[i].grade < course.passing) {
					belowPace++;
					students.belowPace.push(course.students[i]);
				} else {
					onPace++;
					students.onPace.push(course.students[i]);
				}
			}
			row.push(abovePace);
			row.push(belowPace);
			row.push(onPace);
			data.row = row;
			data.students = students;
			return data;
		}
		
		if(DataService.getTeacherData().length == 0) {
			$http.get('/json/teacher_data.json').success(function(response) {
				DataService.setTeacherData(response.data);
				courses = buildCourses(getRandomTeacher());
				onDataLoaded();
			});
		} else {
			courses = buildCourses(getRandomTeacher());
			onDataLoaded();
		}
		
		function onDataLoaded() {
			var jsonObj = JSON.parse(buildCharts(courses)).charts;
			var charts = [];
			for(var i=0; i<jsonObj.length; i++) {
				var chart = jsonObj[i];
				var c = {};
				c.type = chart.type;
				c.displayed = chart.displayed;
				var data = [];
				for(var j=0; j<chart.column.length; j++) {
					data.push([chart.column[j], chart.row[j]]);
				}
				c.data = data;
				c.students = chart.students;
				c.collaborative = chart.collaborative;
				c.options = {
					"title": chart.title,
					"colors": ["blue", "red", "green"],
					"displayExactValues": true,
					"backgroundColor": "none",
					"legend": "none",
					"pieSliceText": "label",
					"pieSliceTextStyle": {fontSize: 12},
					"tooltip" : { trigger: "none" },
					"chartArea": {top: 55, width: "75%", height: "75%"},
					"titleTextStyle": {color: "#39a277", fontSize: 18}
				};
				charts.push(c);
			}
			$scope.charts = charts;
			
			$scope.hideServer = false;

			$scope.$apply();
		}*/
				
				//______________________________________________________________
				
				
				
				
				
				
				
				
				
				
				
				$scope.$apply();
			}
		];
	}
);