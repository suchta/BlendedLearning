define(	
	[
		'angular',
		'./Services/UserService',
		'./Services/CourseService',
		'./Services/TeacherService',
		'./Services/DataService',
		'./Services/ApplicationService',
		'./Services/PlpService',
		'./Services/InterventionService',
		'./Services/ScheduleService',
		'./Services/DialogService'
	],
	function
	(
		angular,
		UserService,
		CourseService,
		TeacherService,
		DataService,
		ApplicationService,
		PlpService,
		InterventionService,
		ScheduleService,
		DialogService
	)
	{
		'use strict';
		
		var module = angular.module('Core.Services', []);
		
		module.value('UserService', new UserService());
		module.value('CourseService', new CourseService());
		module.value('TeacherService', new TeacherService());
		module.value('DataService', new DataService());
		module.value('ApplicationService', new ApplicationService());
		module.value('PlpService', new PlpService());
		module.value('InterventionService', new InterventionService());
		module.value('ScheduleService', new ScheduleService());
		module.factory('DialogService', DialogService);
		
		return module;
		
	}
);