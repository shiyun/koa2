angular.module('myApp.directive.tabList', [
]).directive('tabList', ["mainService", "$cookieStore", "localStorageService", "$state", "$stateParams",  function(mainService, $cookieStore, localStorageService, $state, $stateParams) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,     
        template: '<div><table class="table">'+
            '           <thead>'+
            '               <tr>'+
            '                   <th>案件ID</th>'+
            '                   <th>保协编号</th>'+
            '                   <th>案件状态</th>'+
            '                   <th>委托日期</th>'+
            '                   <th>案件调解员</th>'+
            '                   <th>操作</th>'+
            '               </tr>'+
            '           </thead>'+
            '           <tbody>'+
            '               <tr ng-repeat="x in tData">'+
            '                   <td>{{x.id}}</td>'+
            '                   <td>{{x.clientCaseId}}</td>'+
            '                   <td>{{x.sysNodeStatus}}</td>'+
            '                   <td>{{x.gmtCaseEntrusted}}</td>'+
            '                   <td>{{x.mediator}}</td>'+
            '                   <td ng-click="aa()">{{x.action.state}}</td>'+
            '               </tr>'+
            '           </tbody>'+
            '       </table><p><button ng-click="submitStep3()">返回</button></p></div>',
        controller: function() {

        },
        link: function postLink(scope, iElement, iAttrs, controller) {
            mainService.getConditionalAllCase(1, localStorageService.get('token')).then(function(res){
                scope.tData = res;
            });
            scope.aa = function(){
                scope.tData = [{id: 1, clientCaseId:1, sysNodeStatus:1, gmtCaseEntrusted: 1, mediator:1, state: 1}]      
            }

            var id = $stateParams.id;
            var step = $stateParams.step;
            scope.submitStep3 = function(){
                $state.go('MainPage', {step: Number(step) - 1, id: id})                
            }
        }
    }
}]);
