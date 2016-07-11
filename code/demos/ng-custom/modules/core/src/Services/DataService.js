define(
	[
		'./BaseService'
	],
	function
	(
		BaseService
	)
	{
		var DataService = Class.create(
			BaseService,
			{
				course_list: [],
				student_list: [],
				teacher_list: [],
				teacher_data: [],
				
				insertCourse: function(course)
				{
					this.course_list.push(course);
				},
				
				setCourseList: function(course_list)
				{
					this.course_list = course_list;
				},
				
				getCourseList: function()
				{
					return this.course_list;
				},
				
				insertStudent: function(student)
				{
					this.student_list.push(student);
				},
				
				setStudentList: function(student_list)
				{
					this.student_list = student_list;
				},
				
				getStudentList: function()
				{
					return this.student_list;
				},
				
				insertTeacher: function(teacher)
				{
					this.teacher_list.push(teacher);
				},
				
				setTeacherList: function(teacher_list)
				{
					this.teacher_list = teacher_list;
				},
				
				getTeacherList: function()
				{
					return this.teacher_list;
				},
				
				setTeacherData: function(teacher_data)
				{
					this.teacher_data = teacher_data;
				},
				
				getTeacherData: function() {
					return this.teacher_data;
				}
			}
		);
		
		return DataService;
	}
);