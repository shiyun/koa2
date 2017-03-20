angular.module('myApp.directive.formStep1', [
]).directive('formStep1', ["mainService", "$cookieStore", "$state", "$stateParams",  function(mainService, $cookieStore, $state, $stateParams) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<form name="myForm">{{titlename}} <br />'+
        '*渠道<select required ng-model="pChannelSn"><option ng-repeat="x in channels" value="{{x.channelSn}}">{{x.channelName}}</option></select><br />' +
        '*测试字段邮箱<input type="email" name="email" ng-model="clientCaseId" placeholder="请输入邮箱" required /><br />'+
        '<div style="color:red" ng-show="myForm.email.$dirty && myForm.email.$invalid">' +
        '<span ng-show="myForm.email.$error.required">邮箱是必须的。</span>' +
        '<span ng-show="myForm.email.$error.email">非法的邮箱地址。</span>' +
        '</div>' +
        '*保险公司及涉案子公司<select required ng-model="insuranceCompanyId"><option ng-repeat="x in companies" value="{{x.id}}">{{x.companyName}}</option></select><br />' +
        '*保险公司代理人<input type="text" name="insuranceAgent" ng-model="insuranceAgent" placeholder="保险公司代理人" required /><br />'+
        '*保险公司代理人联系方式<input type="text" name="insuranceAgentContact" ng-model="insuranceAgentContact" placeholder="保险公司代理人联系方式" required /><br />'+        
        '<area-level></area-level>' + 
        '<p class="mt20 mb20"><button ng-click="submitStep1()">提交</button></p>' + 
        '</form>',
        controller: ["$scope", function($scope) {
            $scope.titlename = '填写基本信息'
        }],
        link: function postLink(scope, iElement, iAttrs, controller) { 
            mainService.getChannelAndCompany().then(function(data){
                scope.channels = data.channels;
                scope.companies = data.companies;
            });
            var id = $stateParams.id; //获取的caseid
            var step = $stateParams.step;

            scope.submitStep1 = function(){
                $state.go('MainPage', {step: Number(step) + 1, id: 657})   //设个假的， 真实数据为获取的caseid;             
            }

            scope.$on('area', function(event, data){
                console.log(data)
            });

            if(id != 0){
                mainService.getCaseBaseInfo(id).then(function(data){
                    console.log(data);
                    scope.pChannelSn = data.mediationCase.pChannelSn
                    scope.insuranceCompanyId = data.mediationCase.insuranceAgentContact
                    scope.insuranceAgentContact = data.mediationCase.gmtClientCaseCreated
                })
            }
        }
    }
}]);
 