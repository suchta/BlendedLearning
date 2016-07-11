define(
	[],
	function() {
		return [
			'$scope', 
			'$route',
			'$location',
			'$http', 
			'$timeout',
			'$document',
			'ScheduleService',
			function($scope, $route, $location, $http, $timeout, $document, ScheduleService)
			{
				// STATICS
				var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
				$scope.timeSlots = ["9AM","10AM","11AM","Noon","1PM","2PM","3PM","4PM"];
				
				
				// TODO: PUT THESE HELPER FUNCTIONS IN THE SERVICE
				function pad(n, width, z) {
					z = z || '0';
					n = n + '';
					return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
				}
				var dateToString = function(date) {
					return date.getFullYear() + '-' + pad(date.getMonth()+1, 2) + '-' + pad(date.getDate(), 2);
				};
				var stringToDate = function(string) {
					return new Date(
						parseInt(string.substr(0,4)),
						parseInt(string.substr(5,2)) - 1,
						parseInt(string.substr(8,2))
					);
				}
				
				var dateToDisplayFormatString = function(date) {
					return monthNames[date.getMonth().toString()] +" "+ date.getDate().toString() + ", " + date.getFullYear().toString();
				};
				
				
				
				// Set the standard params
				var today = new Date(),
					reload = false,
					userId = $route.current.params['userId'],
					date = $route.current.params['date'];
				
				//console.log("date is: " + date);
				
				// Check to see if we need to reload anything
				if(userId == 'me') {
					reload = true;
					userId = 1234;
				}
				if(date == 'today') {
					reload = true;
					date = dateToString(today); //.toISOString().substr(0, 10);
				}
				
				// Reload the URL if we need to set the params
				if(reload) {				
					$location.path('/Scheduler/Schedule/' + userId + '/' + date);
					$location.replace();
					$scope.$apply();
					return;
				}
				
				// Get the current parameters
				for(var key in $route.current.params) {
					$scope[key] = $route.current.params[key];
				}
				
				// Set the next and previous dates
				var dateObj = stringToDate(date);
				$scope['nextDateObj'] = new Date(
					dateObj.getFullYear(),
					dateObj.getMonth(),
					dateObj.getDate() + 1
				);
				//$scope['nextDateObj'].setDate(dateObj.getDate() + 1);
				$scope['nextDateStr'] = dateToString($scope['nextDateObj']); // .toISOString().substr(0, 10);
				
				$scope['prevDateObj'] = new Date(
					dateObj.getFullYear(),
					dateObj.getMonth(),
					dateObj.getDate() - 1
				);
				//$scope['prevDateObj'].setDate(dateObj.getDate() - 1);
				$scope['prevDateStr'] = dateToString($scope['prevDateObj']); //.toISOString().substr(0, 10);
				
				// Retrieve the event data for the current day
				$scope.currentDayString = dateToDisplayFormatString ( stringToDate(date)  );
				

				
				//console.log("SCHEDULE CONTROLLER INIT");
				
				// _______________________________________________________________________________________
				// HARD CODED DATA START
				
				//$scope.myDate = "Monday, 7 October, 2013";
				//$scope.datepickerConfig = {};
				//$scope.datepicker.dayHeaderFormat="E"
				
				//day-header-format="E"
				
				
				// color 'CONSTANTS'
				var orangeColName = "orange"; var orangeColBGVal = "251,155,51"; var orangeColBorderVal = "ff9733";
				var greenColName = "green"; var greenColBGVal = "151,206,1"; var greenColBorderVal = "97ce01";
				var blueColName = "blue"; var blueColBGVal = "179, 222, 231"; var blueColBorderVal = "b3dee7";
				

				
				
				$scope.getColorBG = function (colorName) {		
					switch(colorName)
					{
					case orangeColName:
					  return orangeColBGVal;
					  break;
					case blueColName:
					  return blueColBGVal;
					  break;
					case greenColName:
					  return greenColBGVal;
					  break;
					default:
					  return orangeColBGVal;
					}
				}
				
				$scope.getColorBorder = function (colorName) {		
					switch(colorName)
					{
					case orangeColName:
					  return orangeColBorderVal;
					  break;
					case blueColName:
					  return blueColBorderVal;
					  break;
					case greenColName:
					  return greenColBorderVal;
					  break;
					default:
					  return orangeColBorderVal;
					}
				}
				
				
				// Time to pixel conversion
				var hourHeight = 61; // the pixel Height dimension of 1 hour, IE can be used to calculate the height of something based on a time
				$scope.convertTimeToPixels = function (timeInMinutes) {
					// get minutes as expressed in hours
					var hours = timeInMinutes / 60;
					//console.log("(hours * hourHeight) is: " + (hours * hourHeight) + " / hourHeight: " + hourHeight + " / hours: " + hours + " / timeInMinutes: " + timeInMinutes);
					return (hours * hourHeight);
				}
				$scope.getMinutesFromTimeFormat = function (timeInFormat) { // gets the number of minutes from a time formatted as "12:30"
					// get minutes as expressed in hours
					var timeArray = timeInFormat.split(":"); // get ["12","30"]
					var minutes = (parseInt(timeArray[0]) * 60) + parseInt(timeArray[1]); // 12 * 60 + 30

					return minutes;
				}
				
				$scope.startTime = $scope.getMinutesFromTimeFormat("8:00"); // the display area starts at 8 AM, so we need to 'normalize' all calculated values so that 8AM = 0 pixels
				$scope.endTime =$scope.getMinutesFromTimeFormat("17:00"); // the display area maxes out at 17:00
				$scope.getYPosition = function (start) { 

					var startMinutes = $scope.getMinutesFromTimeFormat(start)
					var normalized =  startMinutes - $scope.startTime;
					if(normalized < 0) normalized = 0; // cap it to 0
					
					
					return $scope.convertTimeToPixels(normalized);
				}
				
				
				// User Data
				$scope.currentUserName = "David";
				//$scope.todayString = monthNames[today.getMonth().toString()] +" "+ today.getDate().toString() + ", " + today.getFullYear().toString();
				
				
				// _____________ EVENTS START _____________________
				$scope.getEventHeight = function (start,end) {
					
					// parse the "12:30" into minutes as numbers
					var endMinutes = $scope.getMinutesFromTimeFormat(end);
					var startMinutes = $scope.getMinutesFromTimeFormat(start);
					
					// get difference
					var minutes = endMinutes - startMinutes;
					return $scope.convertTimeToPixels(minutes);
				}
				

				$scope.studyevents = []; //= [geometry1Event, algebra1Event, algebra2Event];
/* 				var geometry1Event = {};
				geometry1Event.startTime = "08:00";
				geometry1Event.endTime = "09:00";
				geometry1Event.name = "GEOMETRY 1";
				geometry1Event.color = orangeColName;
				geometry1Event.height = $scope.getEventHeight(geometry1Event.startTime,geometry1Event.endTime);
				geometry1Event.yPos = $scope.getYPosition(geometry1Event.startTime);

				var algebra1Event = {};
				algebra1Event.startTime = "10:30";
				algebra1Event.endTime = "12:00";
				algebra1Event.name = "ALGEBRA 1";
				algebra1Event.color = blueColName;
				algebra1Event.height = $scope.getEventHeight(algebra1Event.startTime,algebra1Event.endTime);
				algebra1Event.yPos = $scope.getYPosition(algebra1Event.startTime);
				
				
				var algebra2Event = {};
				algebra2Event.startTime = "13:00";
				algebra2Event.endTime = "14:30";
				algebra2Event.name = "ALGEBRA 2";
				algebra2Event.color = greenColName;	
				algebra2Event.height = $scope.getEventHeight(algebra2Event.startTime,algebra2Event.endTime);	
				algebra2Event.yPos = $scope.getYPosition(algebra2Event.startTime); 
				
				//console.log("geometry1Event.yPos: " + geometry1Event.yPos);
				
				
				
				// as elements are positioned RELATIVELY, so we must subtract the Heights of all previous elements to be able to position them by calculating their time
				for ( var i = 0; i < $scope.studyevents.length; i++)
				{
					if(i == 0) continue;
					var currentEvent = $scope.studyevents[i];
					var prevEvent;
					for (var j = 0; j < i; j++)
					{
						prevEvent = $scope.studyevents[j];
						currentEvent.yPos -= prevEvent.height;
					}
				}*/
				// _____________ EVENTS END _____________________
				
				
			
				

				

				
				
				
				
				
				// HARD CODED DATA END
				// _______________________________________________________________________________________
				
				
				
				// __________________ TIME PLAY HEAD _______________________
				$scope.playHeadPos = 0;

				// Angular Interval http://stackoverflow.com/questions/14237070/using-setinterval-in-angularjs-factory
				var updatePlayHead = function() {
					cancelRefresh = $timeout(function myFunction() 
					{
						$scope.calculatePlayHeadPos();

						$scope.$apply();
						
						cancelRefresh = $timeout(updatePlayHead, 60000);
						
						
						//console.log("$document.find('datepickerName') is: " + $document.find('datepickerName') );
						//console.log("$('dp3') is: " + $('dp3') );
						//$scope.dateInit();
						
					},60000);
				};
				$scope.testFunction = function () {
					console.log("testFunction");
				}							
				
				$scope.calculatePlayHeadPos = function () {
					//console.log("calculatePlayHeadPos");
				
					var playHead = document.getElementById('shd-timeplayhead');
					//var playHeadCircle = document.getElementById('shd-timeplayheadcirlce');
					if(playHead != undefined && playHead != null)
					{
						// get current time
						var nowDate = new Date();
						var currentTimeMinutes = (nowDate.getHours() * 60) + nowDate.getMinutes();
						
						// put time into the display limits of 8-17
						if( currentTimeMinutes > $scope.endTime)  currentTimeMinutes = $scope.endTime;
						
						var normalized =  currentTimeMinutes - $scope.startTime; // align time so that it 0 = 8:00AM.
						if(normalized < 0) normalized = 0;
						
						var playHeadYPos = $scope.convertTimeToPixels(normalized);

						//console.log("playHeadYPos: " + parseInt(playHeadYPos).toString() + "px");
						
						$scope.playHeadPos = parseInt(playHeadYPos).toString();
						
				
						return $scope.playHeadPos;
					}	
					else return 0;
				}

				$scope.$on('$destroy', function(e) {
						$timeout.cancel(cancelRefresh);
				});		
				
				updatePlayHead(); // start the interval check
				// __________________ TIME PLAY HEAD END _______________________
				
				

				// DatePicker functions: http://bootstrap-datepicker.readthedocs.org/en/latest/events.html#changedate
				
				// http://bootstrap-datepicker.readthedocs.org/en/latest/events.html#changedate
				// http://jsfiddle.net/qxjck/10/
				// https://gist.github.com/skhatri/5662604
				// http://www.brucher.us/blog/2012/08/16/integrating-jquery-ui-datepicker-with-angularjs/
				
				
				$scope.myDate="02-16-2012";
				
				
				 //$scope.model = {};// {name:'', startDate:'', endDate:''};
/* 				  $scope.$watch('model.endDate',function(e){ 
				     
					 
					 console.log("model.endDate: " + $scope.model.endDate);
				}); */
				
/* 				$scope.$watch(function() { 
				  return $scope.datepicker; 
				}, function(newVal, oldVal){ 
				  //do something when value changes 
				  console.log("model.endDate: " + $scope.datepicker);
				
				});  */
				
				
				
/* 				$scope.dateInit = function () {
				
		
					//$('dp3').datepicker();
					
					$('dp3').on('changeDate', function() {
						var date = $('#date').val();
					 
						//alert("FUCK");
						console.log("New Date picked: " + date);	
						
						return false; // for testing...
						//$location.path('/Scheduler/Schedule/' + userId + '/' + e.date);
						//$location.replace();
						//$scope.$apply();
					});
				} */
				
				
/* 				$scope.datepickerDate = {};
			  $scope.$watch('datepicker.date',function(e){ 
				     
					 
					 console.log("FUCK: " + e );
				}); */

/*             $('dp3').bind('changeDate',function(e){
                console.log("datepicker.date is: " + e.date);
                
               // if(scope.datePickCallBack) scope.datePickCallBack(e.date);                
            }) */
	
				//$scope.$on('$includeContentLoaded', function() {console.log('$includeContentLoaded');});
				//$scope.testInit = function () {
				//	console.log("FUUUCK" + text);
				//}


				/* $('#dp3').datepicker()
				  .on('changeDate', function(ev){
					 console.log("FUCK: " + ev );
				  }); */				
				
				
				// call this after all the other data are ready
				ScheduleService.getSchedule(userId, date, function(schedule) {
					// TODO: This is where we retrieve the schedule data
					// Pass the data to the scope: $scope.studyevents
					// Be sure to use the id when generating the links

					$scope.studyevents = schedule;
					
					// Parse raw data objects into usable ones
					for ( var i = 0; i < $scope.studyevents.length; i++)
					{
						var currentEvent = $scope.studyevents[i];
						// make color random for now
						var colorName;
						var randomChance = Math.floor((Math.random()*3)+1);
						if(randomChance == 1) colorName = orangeColName;
						else if(randomChance == 2) colorName = blueColName;
						else  colorName = greenColName;
						
						currentEvent.color = colorName;	
						currentEvent.height = $scope.getEventHeight(currentEvent.startTime,currentEvent.endTime);	
						currentEvent.yPos = $scope.getYPosition(currentEvent.startTime);
					
						if(i == 0) continue;
						
						var prevEvent;
						for (var j = 0; j < i; j++)
						{
							prevEvent = $scope.studyevents[j];
							currentEvent.yPos -= prevEvent.height;
						}
					}
					
					
					
					
					$scope.$apply();
				});
				
	
				$scope.$apply();
			}
		];
	}
);


				/*$("bls-templatetnclude").on("click", function(e){
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
				});*/
				