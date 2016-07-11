define(
	[
		'./BaseService'
	],
	function
	(
		BaseService
	)
	{
		var InterventionService = Class.create(
			BaseService,
			{
				
				// List of available interventions for the current user
				interventionList: null,
				
				// Map of intervention data
				interventionMap: null,
				
				// The json data from the file
				jsonData: null,
				
				initialize: function()
				{
					this.interventionList = [];
					
					this.interventionList.push({
						"display": "David Mullich",
						"userId": "10",
						"interventionId": "101"
					});
					this.interventionList.push({
						"display": "Jonny Morrill",
						"userId": "11",
						"interventionId": "111"
					});
					this.interventionList.push({
						"display": "John Say",
						"userId": "12",
						"interventionId": "121"
					});
					this.interventionList.push({
						"display": "Angel Berger",
						"userId": "13",
						"interventionId": "131"
					});
					this.interventionList.push({
						"display": "Gabe Enck",
						"userId": "14",
						"interventionId": "141"
					});
					
				},
				
				loadInterventionData: function(callback)
				{
					callback();
					// Load the JSON file
					/*
					var url = 'json/intervention.json';
					new Ajax.Request(url, {
							method: 'get',
							evalJS: false,
							evalJSON: false,
							onSuccess: this.onLoadInterventionDataSuccess.bindAsEventListener(this, callback),
							onFailure: this.onLoadInterventionDataFailure.bindAsEventListener(this, callback)
					});
					*/
				},
				
				onLoadInterventionDataSuccess: function(transport, callback)
				{
					var data = transport.responseText.evalJSON(true);
					
					this.interventionList = data.list;
					this.interventionMap = data.map;
					
					for(var i = 0; i< this.interventionList.length; i++) {
						this.interventionList[i].display = this.interventionList[i].lastName + ", " + this.interventionList[i].firstName + ((this.interventionList[i].isMeetingGoals)?(""):(" ( ! )"));
					}
					
					callback();
				},
				
				onLoadInterventionDataFailure: function(callback)
				{
					alert('failure');
					this.interventionList = [];
					callback();
				},
				
				getInterventionList: function(callback)
				{
					if(this.interventionList != null) {
						callback(this.interventionList);
					} else {
						this.loadInterventionData(this.getInterventionList.bind(this, callback));
					}
				},
				
				getIntervention: function(userId, interventionId, callback)
				{
					if(this.interventionMap != null) {
						if(this.interventionMap[interventionId] != undefined) {
							callback(this.interventionMap[interventionId]);
						} else {
							alert('unable to find PLP data');
						}
					} else {
						this.loadInterventionData(this.getInterventionList.bind(this, userId, interventionId, callback));
					}
				},
				
				saveNote: function(userId, interventionId, tab)
				{
					
				},
				
				getNote: function(userId, interventionId, tab, text)
				{
					
				}
				
			}
		);
		
		return InterventionService;
	}
);