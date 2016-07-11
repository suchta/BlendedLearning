


requirejs.config({
	
	paths: {
		'prototype': 	'lib/prototype',
		'puremvc': 		'lib/puremvc',
		'pipes': 		'lib/puremvc-pipes'
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
