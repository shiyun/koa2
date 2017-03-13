angular.module('myApp.mainPage', ['ui.router'])
    .controller('MainPageCtrl', ['mainService', '$scope', "$cookieStore", "$sce", "localStorageService", "$state", "$rootScope", "$stateParams",
        function(mainService, $scope, $cookieStore, $sce, localStorageService, $state, $rootScope, $stateParams) {
            mainService.getConditionalAllCase(1, localStorageService.get('token')).then(function(res){
            	$scope.tData = res;
            });            
    }]);