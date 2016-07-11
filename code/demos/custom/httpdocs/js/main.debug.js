
requirejs.config({

	paths: {
		'prototype': 	'lib/prototype',
		'puremvc': 		'lib/puremvc',
		'pipes': 		'lib/puremvc-pipes',
		'text':			'lib/text',
		
		// core
		'core':			'/core/src',
		
		// apps
		'apps/CoursePlayer': 		'/apps/CoursePlayer/src',
		'apps/Scheduler':	 		'/apps/Scheduler/src',
		
		// plugins
		'plugins/Dialogs': 			'/plugins/Dialogs/src',
		'plugins/Facebook': 		'/plugins/Facebook/src',
		'plugins/Twitter': 			'/plugins/Twitter/src'
	},
	
	shim: {
		'prototype': {
            exports: 'Prototype'
        },
		'puremvc': {
            exports: 'puremvc'
        },
		'pipes': {
            exports: 'puremvc.pipes'
        }
	}
	
});

requirejs(['startup']);
