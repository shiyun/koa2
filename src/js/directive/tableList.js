angular.module('myApp.directive.tabList', [
]).directive('tabList', ["mainService", "$cookieStore",  function(mainService, $cookieStore) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,  
        scope: {
            tData: '='
        },      
        template: '<table class="table">'+
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
            '       </table>',
        controller: function() {

        },
        link: function postLink(scope, iElement, iAttrs, controller) {
            scope.aa = function(){
                scope.tData = [{id: 1, clientCaseId:1, sysNodeStatus:1, gmtCaseEntrusted: 1, mediator:1, state: 1}]      
            }
        }
    }
}]);
