/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[],
	function()
	{
		
		var Manager = Class.create(
			/** @lends app.common.manager.Manager# */
			{
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 * @param {String} key The instance key.
				 */
				initialize: function(key)
				{
					if(Manager.InstanceMap[key] != null) {
						throw new Error(Manager.MULTITON_MSG);
					}
					Manager.InstanceMap[key] = this;
				}
			
			}
		);
		
		Object.extend(Manager,
			/** @lends core.Manager */
			{
				
				/**
				 * The array of instances.
				 * @type Array
				 */
				InstanceMap: [],
				
				/**
				 * Error message.
				 * @type String
				 */
				MULTITON_MSG: "Manager instance for this Multiton key already constructed!",
				
				/** 
				 * Static function description.
				 */
				GetInstance: function(key)
				{
					if (null == key)
						return null;	
					if(Manager.InstanceMap[key] == null) {
						Manager.InstanceMap[key] = new Manager(key);
					}
					return Manager.InstanceMap[key];
				},
				
				/** 
				 * Static function description.
				 */
				HasCore: function(key)
				{
					return Manager.InstanceMap[key] != null;
				},
				
				/** 
				 * Static function description.
				 */
				RemoveCore: function(key)
				{
					if(Manager.InstanceMap[key] == null)
						return;
					delete Manager.InstanceMap[key];
				}
			}
		);
		
		return Manager;
		
	}
);
