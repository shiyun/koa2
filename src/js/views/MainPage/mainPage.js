angular.module('myApp.mainPage', ['ui.router'])
    .controller('MainPageCtrl', ['mainService', '$scope', "$cookieStore", "$sce", "localStorageService", "$state", "$rootScope", "$stateParams",
        function(mainService, $scope, $cookieStore, $sce, localStorageService, $state, $rootScope, $stateParams) {            
            $scope.caseStatus = $stateParams.step;               
    }]);