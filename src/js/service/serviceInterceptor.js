//var apiUrl = 'http://work.mediation.alpha.haolawyers.cn/api/';
//var apiUrl = 'http://localhost:3001/api/';
var apiUrl = '/api/';
var apiCommand = {
	GETVERIFYCODE 			: 'RIGHT_URL/getVerifyCode' 						,
	LOGIN 					: 'login' 								,
	VERIFICATIONCODE 		: 'RIGHT_URL/verificationCode' 			,
	GETCONDITIONALALLCASE 	: 'MEDIATION_URL/getConditionalAllCase' 
}

angular.module('myApp.mainPage.service', [])
	.factory('mainService', ['$http', '$rootScope', 'localStorageService', function($http, $rootScope, localStorageService){
		var mainFun = {};

		mainFun.getVerifyCode = function() {
			return  $http.post(apiUrl+apiCommand.GETVERIFYCODE)
						 .then(function(res){
						 	if(res.data.status.code == 1){
						 		return res.data.result
						 	}else{
						 		return '获取验证码失败'
						 	}
						 })
		};

		mainFun.login = function(name, password) {
			return  $http.post(apiUrl+apiCommand.LOGIN, {name: name, password: password})
						 .then(function(res){
						 	if(res.data.code == 1){
						 		$rootScope.token = res.data.data.result.token;
						 		localStorageService.add('token', res.data.data.result.token)
						 		return true;
						 	}else{
						 		return false;
						 	}
						 })
						 .catch(function(err){
						 	console.log(err);
						 })
		};

		mainFun.verificationCode = function(verifyCode, verifySn) {
			return  $http.post(apiUrl+apiCommand.VERIFICATIONCODE, {verifyCode: verifyCode, verifySn: verifySn})
						 .then(function(res){						 	
						 	if(res.data.status.code == 1){
						 		return true;
						 	}else{
						 		return false;
						 	}
						 })
						 .catch(function(err){
						 	console.log(err);
						 })
		};

		mainFun.getConditionalAllCase = function(pageNow, token) {
			return  $http.post(apiUrl+apiCommand.GETCONDITIONALALLCASE, {pageNow: pageNow, token: token})
						 .then(function(res){						 	
						 	if(res.data.status.code == 1){
						 		return res.data.result.mediationCases;
						 	}else{
						 		return false;
						 	}
						 })
						 .catch(function(err){
						 	console.log(err);
						 })
		};

		return mainFun;
	}]);