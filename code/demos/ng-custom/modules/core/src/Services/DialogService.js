define(
	[
		'./BaseService'
	],
	function
	(
		BaseService
	)
	{
		/*
			Usage:
			
			Define custom function into scope in order to be called
			
			$scope.launchStudentWarning = function() {
				DialogService({
					id: 'dashboard-dialog',				// [string] unique id for the dialog div
					title: 'Dashboard Dialog Title',	// [string] dialog header title
					body: '<p>Message</p>',				// [string] message of the dialog in html
					firstCallback: {lbl: "OK", fn: function() {}},	// [object] (optional) callback for the first button, if this is not defined, firstCallback.lbl will be default as "OK" and firstCallback.fn will be an empty function
					secondCallback: {lbl: "OK", fn: function() {}},	// [object] (optional) callback for the second button, if this is not defined, secondCallback will be == null and second button will not be shown
					thirdCallback: {lbl: "OK", fn: function() {}}	// [object] (optional) callback for the third button, if this is not defined, thirdCallback will be == null and third button will not be shown
				});
			};
		
		*/
		var DialogService = ["$document", "$compile", "$rootScope", "$controller", "$timeout", function($document, $compile, $rootScope, $controller, $timeout) {
			var defaults = {
				id: null,
				body: null,
				title: "Default Title",
				firstCallback: {lbl: "OK", fn: function() {}},
				secondCallback: null,
				thirdCallback: null
			};
			var dialogContainer = $document.find('dialogContainer');
			return function Dialog(options) {
				
				if(options.firstCallback == null) {
					options.firstCallback = defaults.firstCallback;
				}

				var idAttr = options.id ? ' id="' + options.id + '" ' : '';
				var footer = '<div class="bls-popupbottombar">';
				if(options.thirdCallback != null) {
					footer += '<button class="bls-popupyesno bls-buttonmedium bls-greenbutton" ng-click="$thirdCallback()">{{$thirdBtnLbl}}</button>';
				}
				if(options.secondCallback != null) {
					footer += '<button class="bls-popupyesno bls-buttonmedium bls-greenbutton" ng-click="$secondCallback()">{{$secondBtnLbl}}</button>';
				}
				footer += '<button class="bls-popupyesno bls-buttonmedium bls-grassgreenbutton" ng-click="$firstCallback()">{{$firstBtnLbl}}</button>';
				footer += '</div>';
				
				var html = angular.element(
					'<div class="bls-overlay bls-overlayActive"' + idAttr + '>' +
					'	<div class="bls-verticalcontainer">' +
					'		<div class="bls-dialog bls-animatePopupDialog">' +
					'				<h2>{{$title}}</h2>' +
								options.body +
								footer +
					'		</div>' +
					'	</div>' +
					'</div>');

				var closeFn = function () {
					html.remove();
				};

				var scope = $rootScope.$new();

				scope.$title = options.title;
				scope.$close = closeFn;
				scope.$firstCallback = function() {
					var callFn = options.firstCallback.fn || closeFn;
					callFn.call(this);
					scope.$close();
				}
				if(options.secondCallback != null) {
					scope.$secondCallback = function() {
						var callFn = options.secondCallback.fn || closeFn;
						callFn.call(this);
						scope.$close();
					}
				}
				if(options.thirdCallback != null) {
					scope.$thirdCallback = function() {
						var callFn = options.thirdCallback.fn || closeFn;
						callFn.call(this);
						scope.$close();
					}
				}
				
				scope.$firstBtnLbl = options.firstCallback.lbl;
				if(options.secondCallback != null) {
					scope.$secondBtnLbl = options.secondCallback.label;
				}
				if(options.thirdCallback != null) {
					scope.$thirdBtnLbl = options.thirdCallback.label;
				}

				$compile(html)(scope);
				dialogContainer.append(html);

				$timeout(function () {
					html.addClass('in');
				}, 600);
			};
		}];
		return DialogService;
	}
);