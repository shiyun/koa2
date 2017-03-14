angular.module('myApp.directive.formStep1', [
]).directive('formStep1', ["mainService", "$cookieStore",  function(mainService, $cookieStore) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,  
        template: '<div>333</div>',
        controller: function() {

        },
        link: function postLink(scope, iElement, iAttrs, controller) {
            scope.$on('formData', function(event, data){
                console.log(event);
            })
        }
    }
}]);
