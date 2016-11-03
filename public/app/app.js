angular.module('app', ['ngRoute','ui.bootstrap'])
	// .constant('viewUrl', '/app/views/')
	.config(function($routeProvider, $httpProvider,$interpolateProvider) {
		$interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

	})
.directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
})
.directive('fileModel', ['$parse', function ($parse) {
return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
};
}])	
