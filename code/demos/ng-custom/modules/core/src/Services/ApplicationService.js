define(
	[
		'./BaseService',
		'core/RouteManager'
	],
	function
	(
		BaseService,
		RouteManager
	)
	{
		var ApplicationService = Class.create(
			BaseService,
			{
				
				applicationMap: null,
				applicationList: null,
				
				initialize: function()
				{
					var routeManager = RouteManager.GetInstance(RouteManager.KEY);
					routeManager.setApplicationService(this);
					
					this.applicationMap = {};
					this.applicationList = [];
					
					this.applicationList.push({
						"name": "Dashboard",
						"title": "Dashboard",
						"isActive": false,
						"isDisabled": false
					});
					this.applicationList.push({
						"name": "Scheduler",
						"title": "Teacher Scheduler",
						"isActive": false,
						"isDisabled": false
					});
					this.applicationList.push({
						"name": "Interventions",
						"title": "Interventions",
						"isActive": false,
						"isDisabled": false
					});
					this.applicationList.push({
						"name": "Customize",
						"title": "Custom Learning Objects",
						"isActive": false,
						"isDisabled": true
					});
					this.applicationList.push({
						"name": "PlpWizard",
						"title": "Personal Learning Plan",
						"isActive": false,
						"isDisabled": false
					});
					/*this.applicationList.push({
						"name": "CoursePlayer",
						"title": "Course Player",
						"isActive": false,
						"isDisabled": true
					});*/
					this.applicationList.push({
						"name": "Messenger",
						"title": "Messenger",
						"isActive": false,
						"isDisabled": true
					});
					this.applicationList.push({
						"name": "Setting",
						"title": "Settings",
						"isActive": false,
						"isDisabled": true
					});
					for(var i = 0; i < this.applicationList.length; i++) {
						this.applicationMap[this.applicationList[i].name] = this.applicationList[i];
					}
					
				},
				
				addApplication: function(application)
				{
					this.applicationMap[application.getName()] = application;
					for(var i = 0; i < this.applicationList.length; i++) {
						if(this.applicationList[i].name == application.getName()) {
							this.applicationList[i] = application;
						}
					}
				},
				
				activate: function(name)
				{
					for(var i = 0; i < this.applicationList.length; i++) {
						this.applicationList[i].isActive = false;
					}
					this.applicationMap[name].isActive = true;
				},
				
				disable: function(name)
				{
					for(var i = 0; i < this.applicationList.length; i++) {
						this.applicationList[i].isDisabled = false;
					}
					this.applicationMap[name].isDisabled = true;
				},
				
				getApplicationList: function()
				{
					return this.applicationList;
				},
				
				getToday: function()
				{
					return new Date();
				}
				
			}
		);
		
		return ApplicationService;
	}
);