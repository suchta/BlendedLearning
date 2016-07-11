
define(
	[
		'puremvc'
	],
	function
	(
		puremvc
	)
	{
		
		var ModuleLoader =
			/** @lends app.common.module.ModuleLoader */
			{
				
				NEXT_KEY: 0,
				
				MODULE_PATH_PREFIX: 'app/',
				MODULE_PATH_SUFFIX: '/ApplicationFacade',
				
				Load: function(moduleName, key, data, callback)
				{
					require(
						[
							ModuleLoader.GetModulePath(moduleName)
						],
						function
						(
							key,
							data,
							callback,
							ModuleClass
						)
						{
							var moduleInstance = ModuleLoader.GetInstance(ModuleClass, key, data);
							callback(moduleInstance);
						}.curry(key, data, callback)
					);
				},
				
				GetNextKey: function()
				{
					var key = ModuleLoader.NEXT_KEY;
					while(puremvc.Facade.hasCore(key)) {
						key = ModuleLoader.NEXT_KEY++;
					}
					ModuleLoader.NEXT_KEY++;
					return key;
				},
				
				GetInstance: function(ModuleClass, key, data)
				{
					if (key == undefined || key == null) {
						key = ModuleLoader.GetNextKey();
						return new ModuleClass(key, data);
					} else if(!puremvc.Facade.hasCore(key)) {
						return new ModuleClass(key, data);
					} else {
						return puremvc.Facade.getInstance(key);
					}
				},
				
				GetModulePath: function(moduleName)
				{
					return ModuleLoader.MODULE_PATH_PREFIX + moduleName + ModuleLoader.MODULE_PATH_SUFFIX;
				},
				
				GetModuleByName: function(moduleName, callback)
				{
					
				}
				
			};
		
		return ModuleLoader;
		
	}
);
