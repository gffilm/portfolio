'use strict';

/* Directives */

myApp.directive('confirm', function() {
  return {
	templateUrl: 'views/partials/modal.html',
	transclude: true,
	link: function(scope, element, attrs) {
		scope.showModal = false;
		scope.displayModal = function() {
			console.log('displayModal');
			scope.showModal = true;
			scope.title = scope.title || 'Confirmation';
			scope.content = scope.content || 'Are you sure?';
			scope.yes = scope.yes || 'Save';
			scope.no = scope.no || 'Cancel';
		};
		scope.hideModal = function() {
			console.log('hideModal');
			scope.showModal = false;
		};
		scope.confirmModal = function() {
			console.log('confirmModal');
			scope.callback();
		};
	}
  }
});

myApp.directive('ngConfirmClick', function() {
	return {
		link: function(scope, element, attrs) {
			var clickAction = attrs.ngConfirmClick,
			 	modalElement = document.getElementById('confirm'),
    			$modalScope = angular.element(modalElement).scope(),
    			callback = function() {
    				console.log('callback');
					scope.$eval(clickAction);
				},
				scopeCallback = function() {
					console.log('scopeCallback');
	        		$modalScope.title = attrs.title;
					$modalScope.content = attrs.content;
					$modalScope.yes = attrs.yes;
					$modalScope.no = attrs.no;
					$modalScope.callback = callback;
	        		$modalScope.displayModal();
    			},
    			clickingCallback = function() {
    				console.log('clickingCallback');
					$modalScope.$apply(scopeCallback);
					$modalScope.hideModal();
				};

			element.bind('click', clickingCallback);
		}
	};
});