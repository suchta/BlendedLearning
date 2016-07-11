define(
	[
		'./BaseService'
	],
	function
	(
		BaseService
	)
	{
		var CourseService = Class.create(
			BaseService,
			{
				
				id: 0,
				name: "",
				code: "",
				teacher: "",
				grade: 0,
				isComplete: false,
				isLocked: false,
				subject: "",
				
				getId: function() {
					return this.id;
				},
				
				getName: function() {
					return this.name;
				},
				
				getCode: function() {
					return this.code;
				},
				
				getTeacher: function() {
					return this.teacher;
				},
				
				getGrade: function() {
					return this.grade;
				},
				
				getIsComplete: function() {
					return this.isComplete;
				},
				
				getIsLocked: function() {
					return this.isLocked;
				},
				
				getSubject: function() {
					return this.subject;
				},
				
				setCourseData: function(id, name, code, teacher, grade, isComplete, isLocked, subject) {
					this.id = id;
					this.name = name;
					this.teacher = teacher;
					this.grade = grade;
					this.isComplete = isComplete;
					this.isLocked = isLocked;
					this.subject = subject;
				}
			}
		);
		
		return CourseService;
	}
);