define(
	[],
	function() {
		
		return function() {
			return {
				restrict: 'A',
				scope: {},
				templateUrl: '/core/tpl/SystemPanel.html',
				controller: [
					'$scope',
					'$route',
					'$element',
					'$attrs',
					'ApplicationService',
					'$modal',
					function
					(
						$scope,
						$route,
						$element,
						$attrs,
						ApplicationService,
						$modal
					) {
						
						$scope.applications = ApplicationService.getApplicationList();
						
						$scope.getApplicationClass = function(a)
						{
							if(a.isActive && a.isDisabled) return "active mousedisabled";
							else if(a.isActive) return "active";
							else if(a.isDisabled) return "mousedisabled";
							return "";
						};
						
						$scope.getApplicationHref = function(a)
						{
							if(!a.isDisabled) return "#/" + a.name;
							return "";
						};
						
						$scope.handleClick = function(a)
						{
							
							if(!a.isDisabled) return;
							
							// Inlined template for demo
							var t = '<div class="modal-header">'+
							'<h3>' + a.title + '</h3>'+
							'</div>'+
							'<div class="modal-body">'+
							'<p>This application has not yet been implemented.</p>'+
							'</div>'+
							'<div class="modal-footer">'+
							'<button ng-click="close(result)" class="btn btn-primary" >Close</button>'+
							'</div>';
							
							var opts = {
								backdrop: true,
								dialogFade: true,
								backdropFade: true,
								keyboard: true,
								backdropClick: true,
								template:  t, // OR: templateUrl: 'path/to/view.html',
								controller: function($scope, $modalInstance) {
									$scope.close = function(result){
										$modalInstance.close(result);
									};
								}
							};
							
							var modalInstance = $modal.open(opts);
							
						};
						
					}
				]
			};
		}
		
	}
);