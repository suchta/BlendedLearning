define(
	[
		'angular'
	],
	function
	(
		angular
	)
	{
	return ['$scope', '$http', '$document', 'UserService', 'DataService', 'ApplicationService', 'DialogService', function($scope, $http, $document, UserService, DataService, ApplicationService, DialogService) {
		
		$scope.name = UserService.getName();
		
		$scope.newName = '';
		
		$scope.setName = function()
		{
			UserService.setName($scope.newName);
			$scope.name = $scope.newName;
		};
		
		$scope.today = ApplicationService.getToday();
		
		// $http.get auto deserialize json if json data detected
		/*if(DataService.getStudentList().length == 0) {
			$http.get('/json/student_list.json').success(function(response) {
				$studentObj = response.student;
				if($studentObj != null) {
					DataService.setStudentList($studentObj);
				}
			});
		}
		
		if(DataService.getTeacherList().length == 0) {
			$http.get('/json/teacher_list.json').success(function(response) {
				$teacherObj = response.teacher;
				if($teacherObj != null) {
					DataService.setTeacherList($teacherObj);
				}
			});
		}
		
		if(DataService.getCourseList().length == 0) {
			$http.get('/json/course_list.json').success(function(response) {
				$courseObj = response.course;
				if($courseObj != null) {
					DataService.setCourseList($courseObj);
				}
			});
		}*/
		$("chart_wrapper").on("click", function(e){
			var posx = posy = x = X = Y = 0;
			
			x = $("chart_wrapper").getBoundingClientRect().left;
			X = (e.pageX) ? e.pageX : e.clientX;
			posx = X - x + 85;
			Y = (e.pageY) ? e.pageY : e.clientY;
			posy = Y + 5;
			$document.find("db_popupmenu").css({top: posy + "px", left: posx + "px"});
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
		}
		
		/*var jsonChartData = '{"charts":[{"type":"PieChart","title":"World Literature","displayed":false,"column":["Task","+","-","ON PACE"],"row":["Pace",14,9,77]},{"type":"PieChart","title":"Algebra","displayed":false,"column":["Task","+","-","ON PACE"],"row":["Pace",30,5,65]},{"type":"PieChart","title":"Geometry","displayed":false,"column":["Task","+","-","ON PACE"],"row":["Pace",13,12,75]},{"type":"PieChart","title":"Biology","displayed":false,"column":["Task","+","-","ON PACE"],"row":["Pace",35,20,45]},{"type":"PieChart","title":"World History","displayed":false,"column":["Task","+","-","ON PACE"],"row":["Pace",8,15,65]},{"type":"PieChart","title":"Psychology","displayed":false,"column":["Task","+","-","ON PACE"],"row":["Pace",30,10,60]}]}';*/
	}];
});