angular.module('myApp.directive.areaLevel', [
]).directive('areaLevel', ["mainService", "$cookieStore",  function(mainService, $cookieStore) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,  
        template: '<div><select required ng-model="sheng" ng-change="changesheng(sheng)"><option ng-repeat="x in shengList" value="{{x.id}}">{{x.name}}</option></select>' +
        '<select required ng-model="shi" ng-change="changeshi(shi)"><option ng-repeat="x in shiList" value="{{x.id}}">{{x.name}}</option></select>' +
        '<select required ng-model="qu" ng-change="changequ(sheng, shi, qu)"><option ng-repeat="x in quList" value="{{x.id}}">{{x.name}}</option></select></div>' ,
        controller: function() {
        },
        link: function postLink(scope, iElement, iAttrs, controller) {
            mainService.getServiceArea().then(function(data){
                scope.shengList = data;
            });
            scope.changesheng = function(area){                            
                mainService.getServiceArea(area).then(function(data){
                    scope.shiList = data;
                    scope.shi = '';
                    scope.quList = [];
                }); 
            }
            scope.changeshi = function(area){                            
                mainService.getServiceArea(area).then(function(data){
                    scope.quList = data;
                }); 
            }
            scope.changequ = function(sheng, shi ,qu){ 
                if(scope.qu != undefined){
                    scope.$emit('area', {sheng: scope.sheng, shi: scope.shi, qu: scope.qu}) 
                }                           
            }
        }
    }
}]);
