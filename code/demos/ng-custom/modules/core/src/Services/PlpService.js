define(
	[
		'./BaseService'
	],
	function
	(
		BaseService
	)
	{
		var PlpService = Class.create(
			BaseService,
			{
				
				// List of available plps for the current user
				plpList: null,
				
				// Map of plp data
				plpMap: null,
				
				// The json data from the file
				jsonData: null,
				
				initialize: function()
				{
					
					/*
					this.plpList.push({
						"name": "David Mullich",
						"userId": "10",
						"plpId": "101"
					});
					this.plpList.push({
						"name": "Jonny Morrill",
						"userId": "11",
						"plpId": "111"
					});
					this.plpList.push({
						"name": "John Say",
						"userId": "12",
						"plpId": "121"
					});
					this.plpList.push({
						"name": "Angel Berger",
						"userId": "13",
						"plpId": "131"
					});
					this.plpList.push({
						"name": "Gabe Enck",
						"userId": "14",
						"plpId": "141"
					});
					
					*/
					
					
				},
				
				loadPlpData: function(callback)
				{
					// Load the JSON file
					var url = 'json/plp.json';
					new Ajax.Request(url, {
							method: 'get',
							evalJS: false,
							evalJSON: false,
							onSuccess: this.onLoadPlpDataSuccess.bindAsEventListener(this, callback),
							onFailure: this.onLoadPlpDataFailure.bindAsEventListener(this, callback)
					});
				},
				
				onLoadPlpDataSuccess: function(transport, callback)
				{
					var data = transport.responseText.evalJSON(true);
					
					this.plpList = data.list;
					this.plpMap = data.map;
					
					for(var i = 0; i< this.plpList.length; i++) {
						this.plpList[i].display = this.plpList[i].lastName + ", " + this.plpList[i].firstName + ((this.plpList[i].isMeetingGoals)?(""):(" ( ! )"));
					}
					
					callback();
				},
				
				onLoadPlpDataFailure: function(callback)
				{
					alert('failure');
					this.plpList = [];
					callback();
				},
				
				getPlpList: function(callback)
				{
					if(this.plpList != null) {
						callback(this.plpList);
					} else {
						this.loadPlpData(this.getPlpList.bind(this, callback));
					}
				},
				
				getPlp: function(userId, plpId, callback)
				{
					if(this.plpMap != null) {
						if(this.plpMap[plpId] != undefined) {
							callback(this.plpMap[plpId]);
						} else {
							alert('unable to find PLP data');
						}
					} else {
						this.loadPlpData(this.getPlpList.bind(this, userId, plpId, callback));
					}
				},
				
				saveNote: function(userId, plpId, tab)
				{
					
				},
				
				getNote: function(userId, plpId, tab, text)
				{
					
				}
				
			}
		);
		
		return PlpService;
	}
);