define(
	[
		'angular',
		'./Services'
	],
	function
	(
		angular,
		Services
	)
	{
		'use strict';
		
		var module = angular.module(
			'Core.Controllers',
			[
				'Core.Services',
				'ui.bootstrap'
			]
		);
		
		return module;
		
	}
);