
requirejs.config({

	paths: {
		'angular':		'lib/angular',
		'prototype': 	'lib/prototype',
		'text':			'lib/text',
		'ui-bootstrap':	'lib/ui-bootstrap-tpls',
		
		// core
		'core':			'/core/src',
		
		// apps
		'apps/CoursePlayer': 		'/apps/CoursePlayer/src',
		'apps/Dashboard': 			'/apps/Dashboard/src',
		'apps/PlpWizard':	 		'/apps/PlpWizard/src',
		'apps/Scheduler':	 		'/apps/Scheduler/src',
		'apps/Interventions':	 	'/apps/Interventions/src',
		
		// plugins
		'plugins/Dialogs': 			'/plugins/Dialogs/src',
		'plugins/Facebook': 		'/plugins/Facebook/src',
		'plugins/Twitter': 			'/plugins/Twitter/src'
	},
	
	shim: {
		'prototype': {
            'exports': 'Prototype'
        },
		'angular' : {
			'exports' : 'angular'
		}
	}
	
});

requirejs(
	['angular'],
	function()
	{
		require(
			['ui-bootstrap'],
			function()
			{
				require(['startup']);
			}
		);
	}
);
