define(
	[],
	function() {
		return [
			'$scope', 
			'$route',
			'$location',
			'$http', 
			'ScheduleService',
			function($scope, $route, $location, $http, ScheduleService)
			{
				// CONSTANTS
				var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
				$scope.TYPE_SUBGROUP = "subgroup";
				$scope.TYPE_STUDENT = "student";
				$scope.MAX_SUBGROUPS = 32;
				
				$scope.MAIN_GROUP_TYPE = "_MAIN";
				$scope.SUB_GROUP_TYPE = "_SUB";
				$scope.NEWSUB_GROUP_TYPE = "_NEW";
				
				
				//$scope.GROUP_FOUNDATIONAL = "Foundational";
				//$scope.GROUP_COLLABORATIVE = "Collaborative";
				//$scope.GROUP_CONCEPTUAL = "Conceptual";
				//$scope.GROUP_PERSONAL = "Personal";
				//$scope.GROUP_WETLAB = "Wet Lab";
				//$scope.GROUP_TEACHERLED = "Teacher Led";
				
				
				// Get the current parameters
				for(var key in $route.current.params) {
					$scope[key] = $route.current.params[key];
				}
				
				var userId = $route.current.params["userId"],
					eventId = $route.current.params["eventId"];
				
				
				//var date = $route.current.params['date'];
				//console.log("date is: " + date);
				
				// COMMENT THIS ONCE THE ABOVE 'date' OBJECT WORKS
				//var date = "2013-10-15 ";
				
				
				// HELPERS: Identical to ShcedulerController.js (should be moved into and then called from the Service )
				var dateToDisplayFormatString = function(date) {
					return monthNames[date.getMonth().toString()] +" "+ date.getDate().toString() + ", " + date.getFullYear().toString();
				};
				
				// Set the next and previous dates
/* 				var stringToDate = function(string) {
					return new Date(
						parseInt(string.substr(0,4)),
						parseInt(string.substr(5,2)) - 1,
						parseInt(string.substr(8,2))
					);
				} */
				
				
				$scope.currentDayString = "";
				
				
				// set up Data
				$scope.allGroups = [];
				$scope.courseTitle = "";
				$scope.studentlist = [];
				
				

				
				
				// _______________________________________________________________________________________
				// HARD CODED DATA START
				var today = new Date();
				//$scope.todayString = monthNames[today.getMonth().toString()] +" "+ today.getDate().toString() + ", " + today.getFullYear().toString();
				
				
				//$scope.courseTitle = "Algebra";
				
				//$scope.lastweekprogress1 = 7;
				//$scope.lastweekprogress2 = 3;
				//$scope.nineweekprogress1 = 43;
				//$scope.nineweekprogress2 = 57;
				
				//$scope.lastweekprogressPerc1 = 70;
				//$scope.lastweekprogressPerc2 = 25;
				//$scope.nineweekprogressPerc1 = 33;
				//$scope.nineweekprogressPerc2 = 55;
				
				
				
				
				// Student list
				// _______________________________________________________________________________________
				
				// CONSTANTS

/* 				
				var student;
				
				student = {};
				student.name = "Arthur Fontaine";
				student.id = 0;
				student.interventionalert = 1;
				student.plpalert = 0;
				student.picurl = "/core/res/img/sp100001.png";
				student.lastweekprogress1 = 7;
				student.lastweekprogress2 = 3;
				student.nineweekprogress1 = 43;
				student.nineweekprogress2 = 57;
				student.lastweekprogress1total = 11;
				student.lastweekprogress2total = 6;
				student.nineweekprogress1total = 80;
				student.nineweekprogress2total = 80;
				student.categoryId = $scope.GROUP_FOUNDATIONAL;
				student.groupId = 0;
				student.late = true;
				student.present = true; // also used for 'absent'
				student.earlyout = false;
				student.excused = false;
				student.rollcallnotes = true;
				student.coach = "Julian Teneyck";
				student.currentGrade = 10;
				student.enrolDate = "9/14/2012";
				
				$scope.studentlist[0] = student;
				
				student = {};
				student.name = "Beatris Domenico";
				student.id = 1;
				student.interventionalert = 1;
				student.plpalert = 0;
				student.picurl = "/core/res/img/sp100002.png";
				student.lastweekprogress1 = 2;
				student.lastweekprogress2 = 5;
				student.nineweekprogress1 = 43;
				student.nineweekprogress2 = 57;
				student.lastweekprogress1total = 45;
				student.lastweekprogress2total = 76;
				student.nineweekprogress1total = 80;
				student.nineweekprogress2total = 80;
				student.categoryId = $scope.GROUP_FOUNDATIONAL;
				student.groupId = 0;
				student.late = false;
				student.present = false; // also used for 'absent'
				student.earlyout = true;
				student.excused = true;
				student.rollcallnotes = false;
				student.coach = "Jonny Da Great";
				student.currentGrade = 9;
				student.enrolDate = "9/13/2011";
				$scope.studentlist[1] = student;
				
				student = {};
				student.name = "Danette Turley";
				student.id = 2;
				student.interventionalert = 0;
				student.plpalert = 0;
				student.picurl = "/core/res/img/sp100003.png";
				student.lastweekprogress1 = 8;
				student.lastweekprogress2 = 1;
				student.nineweekprogress1 = 43;
				student.nineweekprogress2 = 57;
				student.lastweekprogress1total = 60;
				student.lastweekprogress2total = 70;
				student.nineweekprogress1total = 80;
				student.nineweekprogress2total = 80;
				student.categoryId = $scope.GROUP_COLLABORATIVE;
				student.groupId = 1;
				student.late = false;
				student.present = true; // also used for 'absent'
				student.earlyout = false;
				student.excused = false;
				student.rollcallnotes = false;
				student.coach = "Spider man";
				student.currentGrade = 13;
				student.enrolDate = "9/11/2013";
				$scope.studentlist[2] = student;		
				
				student = {};
				student.name = "Darell Helget";
				student.id = 3;
				student.interventionalert = 0;
				student.plpalert = 1;
				student.picurl = "/core/res/img/sp100004.png";
				student.lastweekprogress1 = 1;
				student.lastweekprogress2 = 4;
				student.nineweekprogress1 = 43;
				student.nineweekprogress2 = 57;
				student.lastweekprogress1total = 20;
				student.lastweekprogress2total = 25;
				student.nineweekprogress1total = 80;
				student.nineweekprogress2total = 80;
				student.categoryId = $scope.GROUP_COLLABORATIVE;
				student.groupId = 1;
				student.late = false;
				student.present = false; // also used for 'absent'
				student.earlyout = false;
				student.excused = false;
				student.rollcallnotes = true;
				student.coach = "Dr X";
				student.currentGrade = 10;
				student.enrolDate = "9/5/2005";
				$scope.studentlist[3] = student; */
				
				

				
				
				// HARD CODED DATA END
				// _______________________________________________________________________________________
				

				// PARSE STUDENT GROUPS
				// _______________________________________________________________________________________
				
				// helper function
				$scope.findSubGroup = function (subgroupIndex, mainGroup) {
				//console.log("SEARHCHING FOR " + subgroupIndex);
					for( var i = 0; i< mainGroup.length; i++)
					{
						if(mainGroup[i].type == $scope.TYPE_SUBGROUP && mainGroup[i].subgroupIndex == subgroupIndex ) 
						{
						//console.log("FOUND subgroupIndex" + mainGroup[i].subgroupIndex);
							return mainGroup[i];
						}
					}
					
					return null; // javascript null: http://stackoverflow.com/questions/801032/why-is-null-an-object-and-whats-the-difference-compared-to-undefined
				}
				
				$scope.findMainGroupById = function (mainGroupId) {
					for( var i= 0; i < $scope.allGroups.length; i ++)
					{
						if($scope.allGroups[i].id == mainGroupId) return $scope.allGroups[i];
					}
					
					return null;
				}
				
				$scope.findMainGroupArray = function (mainGroupId) {
					for( var i= 0; i < $scope.allGroups.length; i ++)
					{
						if($scope.allGroups[i].id == mainGroupId) return $scope.allGroups[i].data;
					}
					
					return null;
				}
				
				$scope.findStudentById = function (studentId) {
				
					for( var i = 0; i< $scope.studentlist.length; i++)
					{ //console.log("test id is: " + $scope.studentlist[i].id  + " / against id: " + studentId)
						if($scope.studentlist[i].id == studentId ) return $scope.studentlist[i];
					}
					
					return null;
				}


				//$scope.FoundationalGroup = [];
				//$scope.CollaborativeGroup = [];
				//$scope.ConceptualGroup = [];
				//$scope.PersonalGroup = [];
				//$scope.WetLabGroup = [];
				//$scope.TeacherLedGroup = [];
				
				//$scope.allGroups[0] = { name: $scope.GROUP_FOUNDATIONAL, data: $scope.FoundationalGroup, hasNewSubGroupButton: false, createSubGroupsByDefault: false };
				//$scope.allGroups[1] = { name: $scope.GROUP_COLLABORATIVE, data: $scope.CollaborativeGroup, hasNewSubGroupButton: false, createSubGroupsByDefault: true };
				//$scope.allGroups[2] = { name: $scope.GROUP_CONCEPTUAL, data: $scope.ConceptualGroup, hasNewSubGroupButton: true, createSubGroupsByDefault: false };
				//$scope.allGroups[3] = { name: $scope.GROUP_PERSONAL, data: $scope.PersonalGroup, hasNewSubGroupButton: true, createSubGroupsByDefault: false };
				//$scope.allGroups[4] = { name: $scope.GROUP_WETLAB, data: $scope.WetLabGroup, hasNewSubGroupButton: true, createSubGroupsByDefault: false };
				//$scope.allGroups[5] = { name: $scope.GROUP_TEACHERLED, data: $scope.TeacherLedGroup, hasNewSubGroupButton: true, createSubGroupsByDefault: false };
				

				
				
				$scope.updateStudentGroupDisplay = function () {
				
					// reset all Category arrays 
					for( var i = 0; i< $scope.allGroups.length; i++)
						$scope.allGroups[i].data.length = 0;

					// Re populate Categories, based on latest student data
					var participator;
					var currentGroup;
					var subGroup;
					for( var i = 0; i< $scope.studentlist.length; i++)
					{
						student = $scope.studentlist[i];
						
						// 1) first find the appropriate (main) Group based the Student's data
						//if(student.categoryId == $scope.GROUP_FOUNDATIONAL) currentGroup = $scope.FoundationalGroup;
						//else if(student.categoryId == $scope.GROUP_COLLABORATIVE) currentGroup = $scope.CollaborativeGroup;
						//else if(student.categoryId == $scope.GROUP_CONCEPTUAL) currentGroup = $scope.ConceptualGroup;
						//else if(student.categoryId == $scope.GROUP_PERSONAL) currentGroup = $scope.PersonalGroup;
						//else if(student.categoryId == $scope.GROUP_WETLAB) currentGroup = $scope.WetLabGroup;
						//else /*if(student.categoryId == $scope.GROUP_TEACHERLED) */currentGroup = $scope.TeacherLedGroup;
						
						
						currentGroup = $scope.findMainGroupArray(student.categoryId);
						if(currentGroup == null) continue;
						
						
						// 2) Groups contain Participators, which are either just students, or CLO groups which are nested student groups
						participator = {}; 
						participator.type = $scope.TYPE_STUDENT;
						participator.data = student;
											
						
						// 3) if Student has a subGroup 
						
						if(student.groupId > 0) // if student has a Subgroup  then we must first try to find an Existing CLO group in this (main) Group
						{
							//console.log("Looking for CLO " + student.groupId + " for student" + student.id);
							subGroup = $scope.findSubGroup(student.groupId, currentGroup)
							if(subGroup == null) // if such a subGroup doesn't already exist
							{
								//console.log("NO SUBGROUP FOUND, creating new for " + student.groupId);
								subGroup ={};
								subGroup.type = $scope.TYPE_SUBGROUP;
								subGroup.subgroupIndex = student.groupId;
								subGroup.data = [];
								
								currentGroup.push(subGroup); // must add subGroup itself to main group
							}
							
							// once subGroup was either created or found, we add new student participator to it
							subGroup.data.push(participator);
							//console.log("Added to Subgroup subgroupIndex"+subGroup.subgroupIndex+" has number of participator students: " + subGroup.data.length);
						}
						else // if Student doesn't belong to any subGroup 
						{
							currentGroup.push(participator); // if its just a student then we add it to the main group array
						}
					}
					
					// need to count how many subgroups there are in each group, so we can always get the 'next empty index' for when creating groups
 					for( var i = 0; i < $scope.allGroups.length; i++)
					{
						var group = $scope.allGroups[i];
						group.subGroupIndeces =[]; // this array stores the lookup Indeces
						
						for( var j =0; j < group.data.length; j++)
						if(group.data[j].type == $scope.TYPE_SUBGROUP) 
							group.subGroupIndeces.push(group.data[j].subgroupIndex);

						
						//console.log(group.name + " has " + group.subGroupIndeces +" as subgroups, length is: " + group.subGroupIndeces.length)
					}
					
				}
				
				
				$scope.findNextEmptySubGroupIndex = function (group) {
					// go through all the possible Sub Group Indeces
					for( var i = 1; $scope.MAX_SUBGROUPS; i++) // Indexes start at 1, because index 0 is reserved for when there is no sub group
					{
						// check against existing indeces, and if a potential Index is not found then return that
						if( group.subGroupIndeces.indexOf(i) == -1) return i;
					}
				

					return -1; // didn't find any
				}
				
				
				// display the data first time around
				//$scope.updateStudentGroupDisplay();



				
				

				
				// PARSE STUDENT GROUPS END
				// _______________________________________________________________________________________


				
				// SWITCHING MODES	
				$scope.listview = true;
				$scope.rollCall = false;
				
				$scope.switchToListView = function () {
				 $scope.listview = true;
				 $scope.rollCall = false;
				// console.log("listview = true");
				}
				
				$scope.switchToClassView = function () {
				  $scope.listview = false;
				  $scope.rollCall = false;
				 // console.log("listview = false");
				}	
				
				$scope.searchBoxActive = false;
				$scope.toggleActivateSearchBox = function () {
				  $scope.searchBoxActive =  !$scope.searchBoxActive;
				}
				
				$scope.determineSearchFilterStatus = function () {
				  if($scope.searchBoxActive)  return "shd-searchfilter";
				  else return "shd-displayNone";
				}
				
				$scope.determineSearchButtonStatus = function () {
				  if($scope.searchBoxActive)  return "shd-searchbuttonactive";
				  else return "shd-searchbutton ";
				}
				
				
				
				$scope.switchToListRollcallView = function () {
				  $scope.listview = true;
				  $scope.rollCall = true;
				
				}
				

				$scope.determineSwitchButtonStyle = function (listViewButton) {
					if(listViewButton)
					{
						if($scope.listview) return "shd-classlistviewbutton shd-viewcurrent";
						else return "shd-classlistviewbutton";
					}
					else
					{
						if($scope.listview == false) return "shd-classlistviewbutton shd-viewcurrent";
						else return "shd-classlistviewbutton";
					}
				}
				$scope.determineSearchVisibility = function () {
					if($scope.listview) return "";
					else return " shd-displayNone"
				}
				
				
				// HELPERS
				$scope.getStudentPicURL = function (student) {
					if(student == null || student == undefined) return "";
					else return student.picUrl;

				}


				
				$scope.producealertStyle = function (studentData) {
				
					if(studentData == null || studentData == undefined) return "";
				
					if( studentData.plpAlert == 0 && studentData.interventionAlert==0) return "";
					else if(studentData.plpAlert != 0) return "shd-studentalertbase shd-studentalertplp";
					else  return "shd-studentalertbase shd-studentalertinvervention";
				
				}
				
				// ROLL CALL STATUS HELPERS
				$scope.determineLateStatus = function (student) {
					if(student == null || student == undefined) return "";
					else
					{
						if(student.late == true)  return "shd-studentlate";
						else return "shd-studentnotlate";
					}
				}
				
				$scope.determinePresentStatus = function (student) {
					if(student == null || student == undefined) return "";
					else
					{
						if(student.present == true)  return "shd-studentpresent";
						else return "shd-studentnotpresent";
					}
				}
				
				$scope.determineAbsentStatus = function (student) {
					if(student == null || student == undefined) return "";
					else
					{
						if(student.present == false)  return "shd-studentabsent";
						else return "shd-studentnotabsent";
					}
				}	
				
				$scope.determineEarlyOutStatus = function (student) {
					if(student == null || student == undefined) return "";
					else
					{
						if(student.earlyout == true)  return "shd-studentearlyout";
						else return "shd-studentnotearlyout";
					}
				}
				
				$scope.determineExcusedStatus = function (student) {
					if(student == null || student == undefined) return "";
					else
					{
						// excused can only apply when a student is either absent or was 'Early out'
						if(student.earlyout == true || student.present == false)
						{
							if(student.excused == true) return "shd-studentexcused";
							else return "shd-studentnotexcused";
						}
						
						else return ""; // no icon appears if neither applies

					}
				}
				
				$scope.determineNoteStatus = function (student) {
					if(student == null || student == undefined) return "";
					else
					{
						if(student.rollcallnotes == true)  return "shd-studentnote";
						else return "shd-studentnotnote";
					}
				}
				
				

				

				
				$scope.determinebackground = function (student) {
				  var index = $scope.selectedStudents.indexOf(student);
					if(index == -1) return "";
					else return "shd-studentlistitemselected";
				}	


				
				//_____________________________________________________________________
				// CLO PANEL
				$scope.CLOlist = [{},{},{},{},{},{},{},{}];
				$scope.CLOPanelActive = false;
				$scope.determineCLOPanelVisibility = function () {
				  if($scope.CLOPanelActive == true)  return "";
				  else return "shd-displayNone";
				}
				
				$scope.toggleCLOPanelVisibility = function () {
				  $scope.CLOPanelActive = !$scope.CLOPanelActive;
				}
				
				$scope.determineCLOButtonState = function () {
				  if($scope.CLOPanelActive == true)  return "shd-customlearnbuttonactive";
				  else return "shd-customlearnbutton";
				}
				
				//_____________________________________________________________________
				// SELECT STUDENT LIST / STUDENT DETAIL:
				$scope.selectedStudents = [];
				$scope.currentStudent = {};
				$scope.currentStudentIndex = 0;
				//$scope.selectedStudents = [];
				
				$scope.selectStudent = function (event, student) {
				//console.log("selectStudent, studentis: " + student);
					if(student == null || student == undefined) 
					{
						console.log("STUDENT DOESNT EXIST");
						return;
					}
					else
					{
						// 1) get the Element itself
						var elem = angular.element(event.srcElement);
						
						// 2) figure out if we have already added this student or not
						var index = $scope.selectedStudents.indexOf(student);
						
						
						// A) if it was NOT added yet then we add it
						//_______________________________________
						if(index == -1)
						{
							$scope.selectedStudents.push(student);
							
							// if this was the first student to be added then we make this the 'current'
							if($scope.selectedStudents.length == 1) $scope.currentStudent = student;
						}
						// B) if student was already added then remove it
						else
						{
							$scope.selectedStudents.splice(index,1);
							
							// if the student just removed was the Current student the we will try to pick another if we can
							if($scope.currentStudent == student)
							{	
								// a) if there are no students left then just set it to a blank one
								if($scope.selectedStudents == 0) $scope.currentStudent = {};
								
								// b) if there is only 1 student left, make that the current
								else if($scope.selectedStudents == 1) $scope.currentStudent = $scope.selectedStudents[0];
								
								// c) if there is at least 2
								else 
								{
									// I) if current Student was the first, then choose the next after(which is the new first)
									if($scope.currentStudentIndex == 0) $scope.currentStudent = $scope.selectedStudents[0];
									// if it was NOT the first, then we choose the Student just before it (ie index -1 )
									else $scope.currentStudent = $scope.selectedStudents[$scope.currentStudentIndex-1];
								}
							}

							
						}
					}
					
					// 4) Finally update the displayed student index
					$scope.determineCurrentStudentIndex();
					//console.log("elem.className is: " + elem.className);
					
					//console.log("Selected students num: " + $scope.selectedStudents.length);
				}
				
				$scope.determineCurrentStudentIndex = function () {
					$scope.currentStudentIndex = $scope.selectedStudents.indexOf($scope.currentStudent);
					//if($scope.currentStudentIndex < 0) $scope.currentStudentIndex = 0;
				}
				
				$scope.showNextStudent = function () {
				
					// if there is still one student after the current
					console.log("index: " + $scope.currentStudentIndex + " / length; " + $scope.selectedStudents.length);
					if($scope.currentStudentIndex < $scope.selectedStudents.length -1)
					{
						$scope.currentStudent = $scope.selectedStudents[$scope.currentStudentIndex+1];
						$scope.determineCurrentStudentIndex();
					}	
				}	

				$scope.showPrevStudent = function () {
				
					// if there is still one student after the current
					if($scope.currentStudentIndex > 0)
					{
						$scope.currentStudent = $scope.selectedStudents[$scope.currentStudentIndex-1];
						$scope.determineCurrentStudentIndex();
					}	
				}				
				
				
				$scope.determineStudentDetailVisibility = function () {
				  if($scope.selectedStudents.length >0)  return "";
				  else return "shd-displayNone";
				}
				
				
				$scope.calculateLastWeekProgress1 = function (student) {
				  return (student.lastWeekProgress1/student.lastWeekProgress1Total) * 100;
				}
				$scope.calculateLastWeekProgress2 = function (student) {
				// console.log("progress2: " + student.lastweekprogress2 + " / total2: " + student.lastweekprogress2total + " / perc: " + ((student.lastweekprogress2/student.lastweekprogress2total) * 100)) ;
				  return (student.lastWeekProgress2/student.lastWeekProgress2Total) * 100;
				}	
				
				$scope.calculateNineWeekProgress1 = function (student) {
				  return (student.nineWeekProgress1/student.nineWeekProgress1Total) * 100;
				}	
				$scope.calculateNineWeekProgress2 = function (student) {
				  return (student.nineWeekProgress2/student.nineWeekProgress2Total) * 100;
				}	
				
				//_____________________________________________________________________
				// DRAG AND DROP: http://www.html5rocks.com/en/tutorials/dnd/basics/
				// http://blog.parkji.co.uk/2013/08/11/native-drag-and-drop-in-angularjs.html
				// http://www.html5rocks.com/en/tutorials/dnd/basics/
				
				
				/*$scope.handleDragStart = function (e) {
				  this.style.opacity = '0.4';  // this / e.target is the source node.
				}

				var cols = document.querySelectorAll('#columns .column');
				[].forEach.call(cols, function(col) {
				  col.addEventListener('dragstart', handleDragStart, false);
				});*/
				
/* 				$scope.handleDrop = function (studentId) {
				 // alert("DROP SUCCESS");
				  console.log("DROP SUCCESS: " +studentId);
				}	
				$scope.handleDropped = function (studentId) {
				 // alert("DROP SUCCESS");
				  console.log("!!handleDropped SUCCESS: " +studentId);
				} */
				
				
				// DRAG AND DROP
				$scope.onDropPoint = function (studentId, targetGroupId) {
				 // alert("DROP SUCCESS");
				  console.log("onDropPoint SUCCESS: " +studentId + " / targetGroupId: " + targetGroupId);
				  
				  
				  // 1) find student data object based on his ID
				  var lookupId =parseInt(studentId.split("student")[1]); // student Ids are encoded as 'student0' IE 'student' + #
					console.log("lookupId is: " + lookupId);
		
				  
				  var student = $scope.findStudentById(lookupId);
				  if(student == null) return;
				  
				  //console.log("FOUND STUDENT, his group is: " + student.categoryId);
				  // 2) extract the Target Drop site from the 'targetGroupId' String
				  // The rules are that are encoded in the string are the following:
				  // categoryid + '_MAIN' = Main Group
				  // categoryid '_SUB' + # = sub group of a main group, plus the number of the subgroup
				  // categoryid + '_NEW' = Create new subgroup inside a Main Group
				  
				  var targetGroup;
				  var groupStringArray;
				   // 3) Depending on the Target Group, re-assign Student's groups
				   
				   // IF ASSIGNING TO A MAIN GROUP
				  if( targetGroupId.indexOf($scope.MAIN_GROUP_TYPE) != -1)
				  {
					//console.log("adding to new main group");
					targetGroup = targetGroupId.split($scope.MAIN_GROUP_TYPE)[0]; // this extracts "Foundational" from "Foundational_MAIN"
					//if(student.categoryId != targetGroup)
					//{
						//console.log("adding to DIFFERENT main group: " + targetGroup);
						student.categoryId = targetGroup;
						
						// when a student was added to a completely different group than before then we must reset his CLO, so he doesnt 'bring' that with him
						student.groupId = 0;
					//}
				  }

				  // IF ASSIGNING TO A SUB GROUP OF A MAIN GROUP
				  else if(targetGroupId.indexOf($scope.SUB_GROUP_TYPE) != -1)
				  {
					groupStringArray = targetGroupId.split($scope.SUB_GROUP_TYPE);
					targetGroup = groupStringArray[0]; // this extracts "Foundational" from "Foundational_SUB1"
					var subgroupIndex = parseInt(groupStringArray[1]); // this extracts "1" from "Foundational_SUB1"
					
					// only change student's location if its different ( IE either in a completely different Main Group or different subgroup
					//if(student.groupId != subgroupIndex || student.categoryId != targetGroup)
					//{
						student.categoryId = targetGroup;
						student.groupId =subgroupIndex;
					//}
				  }
				  
				  // IF CREATING A NEW SUB GROUP IN A MAIN GROUP
				  else if(targetGroupId.indexOf($scope.NEWSUB_GROUP_TYPE) != -1)
				  {
				 
					groupStringArray = targetGroupId.split($scope.NEWSUB_GROUP_TYPE);
					targetGroup = groupStringArray[0]; // this extracts "Foundational" from "Foundational_NEW"
					
					// get the next unused Sub Group Index of main group
					var groupDataObject =  $scope.findMainGroupById(targetGroup);// $scope.findMainGroupArray(targetGroup); // $scope.findMainGroupByName(targetGroup);
					if(groupDataObject == null) return;
					
					// find the next available sub Group Index number 
					var subgroupIndex = $scope.findNextEmptySubGroupIndex(groupDataObject);
					if(subgroupIndex == -1) return;
					
					
					student.categoryId = targetGroup;
					student.groupId = subgroupIndex;

					//console.log("creating new subgroup for main group: " + targetGroup+ " which has num subgroups: " + groupDataObject.subGroupIndeces + " / student.groupId: " + student.groupId);
				  }
				  
				  
				  
				  // a) if target is the same as current then do nothing
				  
				  // b) if 
				  
				  
				  
					// 4) refresh Student group display
					$scope.updateStudentGroupDisplay();
					$scope.$apply(); // update html
				}	
				
				$scope.getSubGroupColor = function (subgroupindex) {
				  if(subgroupindex == 1) return "f6e595";
				  else if(subgroupindex == 2)  return "f69595";
				  else if(subgroupindex == 3)  return "a0f695";
				  else if(subgroupindex == 4)  return "959cf6";
				  else if(subgroupindex == 5)  return "cc95f6";
				  else if(subgroupindex == 6)  return "f695f0";
				  else return "f6e595";
				}
				
				$scope.determineGroupType = function (group) {
				  if(group.createSubGroupsByDefault == false) return $scope.MAIN_GROUP_TYPE;
					else return $scope.NEWSUB_GROUP_TYPE;
				}	  
			
				//_____________________________________________________________________
			
				// Retrieve the event data for the current event
				ScheduleService.getEvent(userId, eventId, function(event) {
					//alert("got event data: " + event);
					
					$scope.courseTitle = event.name;
					
					$scope.currentDayString = dateToDisplayFormatString ( ScheduleService.stringToDate(event.date)  );
					
					$scope.studentlist = event.users;
					//alert("got event data: " + event.users.length);
					// 1) Process students
					//__________________________________
					// Produce short version names
					for( var i = 0; i< $scope.studentlist.length; i++)
					{
						student = $scope.studentlist[i];
						student.name = student.firstName + " " + student.lastName;
						var nameArray = student.name.split(" "); // get ["Jonny","Morill"]
						if(nameArray.length > 1) // if student had multiple words in his name
						{
							student.nameshort = nameArray[0] + " " + nameArray[1].charAt(0) +"." // get "Jonny M."
						}
						
						// if student only had 1 word name, then simply use that
						else student.nameshort = student.name;
					}
					
					
					// 2) Process main Categories
					//__________________________________
					for( var i = 0; i< event.categories.length; i++)
					{
						var eventcat = event.categories[i];
						
						// clone a category object, and add an empty array for the students
						var category = { name: eventcat.name, data: [], hasNewSubGroupButton: eventcat.isGroupType, createSubGroupsByDefault: eventcat.isGroupType, id: eventcat.id };
						$scope.allGroups.push(category);
					}
					
					
					
					// 3) display the data first time around
					//__________________________________
					$scope.updateStudentGroupDisplay();
					
					// update view
					$scope.$apply();
				});
			
			
				
				$scope.$apply();
			}
		];
	}
);