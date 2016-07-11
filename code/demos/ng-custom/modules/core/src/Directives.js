define(
	[
		'angular',
		'./Services',
		'./Directives/SystemPanelDirective',
		'./Directives/GoogleChartsDirective',
		'./Directives/DashboardChartsDirective',
		'./Directives/PopUpLinkDirective',
		'./Directives/CourseTableDirective',
		'./Directives/DraggableDirective',
		'./Directives/DroppableDirective' //,
		//'./Directives/DatePickerDirective'
	],
	function
	(
		angular,
		Services,
		SystemPanelDirective,
		GoogleChartsDirective,
		DashboardChartsDirective,
		PopUpLinkDirective,
		CourseTableDirective,
		DraggableDirective,
		DroppableDirective //,
		//DatePickerDirective
	)
	{
		'use strict';
		
		var module = angular.module(
			'Core.Directives',
			[
				'Core.Services',
				'ui.bootstrap'
			]
		);
		
		module.directive(
			'systempanel',
			SystemPanelDirective
		);
		
		module.directive(
			'googlechart',
			GoogleChartsDirective
		);
		
		module.directive(
			'dashboardchart',
			DashboardChartsDirective
		);
		
		module.directive(
			'popuplink',
			PopUpLinkDirective
		);
		
		module.directive(
			'coursetable',
			CourseTableDirective
		);
		
		
		
		module.directive(
			'draggable',
			DraggableDirective
		);
		
		module.directive(
			'droppable',
			DroppableDirective
		);
		
		//module.directive(
		//	'datepicker',
		//	DatePickerDirective
		//);
		
		return module
		
	}
);