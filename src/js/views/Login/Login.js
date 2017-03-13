angular.module('myApp.Login', ['ui.router'])
    .controller('LoginCtrl', ['mainService', '$scope', "$cookieStore", "$sce", "localStorageService", "$state","$rootScope",
        function(mainService, $scope, $cookieStore, $sce, localStorageService, $state, $rootScope) {        	
        	$scope.username = 'admin'; 
        	$scope.password = '123456';
        	$scope.verifyCode = '';

        	mainService.getVerifyCode().then(function(res){
				if(!res.verifyImg){
					alert(res)
				}else{
					$scope.imgSrc = 'data:image/jpg;base64,' + res.verifyImg;
					$scope.verifySn = res.verifySn;
				}
			});

        	var refresh = function(){
				mainService.getVerifyCode().then(function(res){
					if(!res.verifyImg){
						alert(res)
					}else{
						$scope.imgSrc = 'data:image/jpg;base64,' + res.verifyImg;
						$scope.verifySn = res.verifySn;
					}
				});
			};
			$scope.refresh = refresh;

			$scope.login = function(){	
				mainService.verificationCode($scope.verifyCode, $scope.verifySn).then(function(res){
					if(res){
						mainService.login($scope.username, $scope.password).then(function(res){
							if(!res){
								alert('登录失败')
							}else{
								//alert('登录成功');									
								//$state.go('MainPage', {id: '333'}); //$stateParams.id 来接收
								$state.go('MainPage'); //$stateParams.id 来接收
							}
						});
					}else{
						refresh();
						alert('验证码失效或不正确')
					}
				})	
				/*		
				if(!/[a-zA-Z]{4}/.test($scope.verifyCode)){
					alert('验证码格式不正确');
					refresh();
					return false;
				}else{
					mainService.verificationCode($scope.verifyCode, $scope.verifySn).then(function(res){
						if(res){
							mainService.login($scope.username, $scope.password).then(function(res){
								if(!res){
									alert('登录失败')
								}else{
									alert('登录成功');									
									$state.go('MainPage', {"data": '333'}); //$stateParams.data 来接收
								}
							});
						}else{
							refresh();
							alert('验证码失效或不正确')
						}
					})
				}*/
			};

    	}
    ]);