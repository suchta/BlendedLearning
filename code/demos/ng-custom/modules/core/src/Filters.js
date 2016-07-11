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
			'Core.Filters',
			[
				'Core.Services'
			]
		);
		
		module.filter(
			'interpolate',
			[
				'version',
				function(version) {
					return function(text) {
						return String(text).replace(/\%VERSION\%/mg, version);
					};
				}
			]
		);
		
		return module;
});
