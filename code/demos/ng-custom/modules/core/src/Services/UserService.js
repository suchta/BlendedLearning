define(
	[
		'./BaseService'
	],
	function
	(
		BaseService
	)
	{
		var UserService = Class.create(
			BaseService,
			{
				
				id: 0,
				name: '',
				user_level: -1,
				course_list: [],
				
				getId: function()
				{
					return this.id;
				},
				
				getName: function()
				{
					return this.name;
				},
				
				setName: function(name)
				{
					this.name = name;
				},
				
				getUserLevel: function()
				{
					return this.user_level;
				},
				
				setUserData: function(id, name, user_level, course_list)
				{
					this.id = id;
					this.name = name;
					this.user_level = user_level;
					this.course_list = course_list;
				}
			}
		);
		
		return UserService;
	}
);