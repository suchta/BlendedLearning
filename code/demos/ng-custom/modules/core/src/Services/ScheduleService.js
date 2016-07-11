define(
	[
		'./BaseService'
	],
	function
	(
		BaseService
	)
	{
		var ScheduleService = Class.create(
			BaseService,
			{
				
				scheduleMap: null,
				
				eventMap: null,
				
				eventTemplates: null,
				
				initialize: function()
				{
					
				},
				
				loadData: function(callback)
				{
					// Load the JSON file
					var url = 'json/schedule.json';
					new Ajax.Request(url, {
							method: 'get',
							evalJS: false,
							evalJSON: false,
							onSuccess: this.onLoadDataSuccess.bindAsEventListener(this, callback),
							onFailure: this.onLoadDataFailure.bindAsEventListener(this, callback)
					});
				},
				
				onLoadDataSuccess: function(transport, callback)
				{
					this.scheduleMap = {};
					this.eventMap = {};
					this.eventTemplates = {};
					
					var data = transport.responseText.evalJSON(true);
					var key;
					
					for(key in data.events) {
						var event = data.events[key];
						event["id"] = key;
						this.eventTemplates[key] = event;
					}
					
					var today = new Date();
					todayStr = this.dateToString(today);
					for(key in data.schedule) {
						
						
						var date = new Date(
							today.getFullYear(),
							today.getMonth(),
							today.getDate() + parseInt(key)
						);
						var dateStr = this.dateToString(date);
						
						var events = data.schedule[key];
						var eventList = [];
						for(var i = 0; i < events.length; i++) {
							var event = {};
							var eventData = Object.clone(this.eventTemplates[events[i]]);
							var id = ScheduleService.NEXT_EVENT_ID++;
							eventData["id"] = id;
							eventData["date"] = dateStr;
							this.eventMap[id] = eventData;
							if(eventData == undefined) continue;
							event["id"] = id;
							event["name"] = eventData["name"];
							event["startTime"] = eventData["startTime"];
							event["endTime"] = eventData["endTime"];
							eventList.push(event);
						}
						
						this.scheduleMap[dateStr] = eventList;
						
					}
					
					callback();
				},
				
				onLoadDataFailure: function(callback)
				{
					alert('failure');
					callback();
				},
				
				getSchedule: function(userId, date, callback)
				{
					if(this.scheduleMap != null) {
						if(this.scheduleMap[date] != undefined) {
							callback(this.scheduleMap[date]);
						} else {
							callback([]);
						}
					} else {
						this.loadData(this.getSchedule.bind(this, userId, date, callback));
					}
				},
				
				getEvent: function(userId, eventId, callback)
				{
					if(this.eventMap != null) {
						if(this.eventMap[eventId] != undefined) {
							callback(this.eventMap[eventId]);
						} else {
							callback(null);
						}
					} else {
						this.loadData(this.getEvent.bind(this, userId, eventId, callback));
					}
				},
				
				// Helper functions
				pad: function(n, width, z)
				{
					z = z || '0';
					n = n + '';
					return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
				},
				
				dateToString: function(date)
				{
					return date.getFullYear() + '-' + this.pad(date.getMonth()+1, 2) + '-' + this.pad(date.getDate(), 2);
				},
				
				stringToDate: function(string)
				{
					return new Date(
						parseInt(string.substr(0,4)),
						parseInt(string.substr(5,2)) - 1,
						parseInt(string.substr(8,2))
					);
				}
				
			}
		);
		
		ScheduleService.NEXT_EVENT_ID = 1000;
		
		return ScheduleService;
	}
);