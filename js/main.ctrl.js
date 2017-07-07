app.controller('MainCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window,$rootScope) {

  $scope.isFbSignup = true;
  $rootScope.isPath= function(viewLocation) {
    return viewLocation === $location.path();
  };
  $rootScope.logout = false;
  if($rootScope.isPath('/')===true && $scope.userDetails !=undefined && $scope.userFullDetails !=undefined && $rootScope.logout===false){
    $location.path("/home");



  }


  $scope.$on('event:social-sign-in-success', (event, userDetails)=> {
  		$scope.result = userDetails;
      $window.localStorage.userDetails = JSON.stringify(userDetails);
      $scope.userDetails = userDetails;

  		$scope.$apply();


  	})
  	// $scope.$on('event:social-sign-out-success', function(event, userDetails){
  	// 	$scope.result = userDetails;
  	// })
    if($window.localStorage.userDetails !=null){

    $scope.userDetails = JSON.parse($window.localStorage.userDetails);
      }


    $scope.login = function(token){
      $scope.isLogin = true;
      console.log($scope.isLogin);
      if($window.localStorage.userDetails ==null && $window.localStorage.userFullDetails ==null){
        $mdToast.show(
          $mdToast.simple()
          .textContent('Please First Signup through Facebook')
          .position('bottom right')
          .hideDelay(3000)
        );

        }


              $http({
                  method: 'POST',
                  transformRequest: function(obj) {
                      var str = [];
                      for(var p in obj)
                      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                      return str.join("&");
                   },
                  url: URL_PREFIX + 'auth/facebook',
                  headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                  },
                  data:{
                      'token':token
                  }
                }).then(function successCallback(response) {
                  $scope.isLogin = false;
                  userFullDetails = {
                      name: response.data.user.name,
                      points: response.data.user.points,
                      email: response.data.user.email,
                      image_url:response.data.user.image_url,
                      name:response.data.user.name,
                      type:response.data.user.type,
                      submission:response.data.user.submission,
                      session_id:response.data.user.uuid,
                      access_token:response.data.token,
                      type:response.data.user.type

                  };
                    $window.localStorage.userFullDetails = JSON.stringify(userFullDetails);

                    $location.path("/home");


                    $window.location.reload();
                    $mdToast.show(
                      $mdToast.simple()
                      .textContent('Succesfully Logged In')
                      .position('bottom right')
                      .hideDelay(3000)
                    );
                    console.log(response);
                  }, function errorCallback(response) {
                    console.log(response);
                    $mdToast.show(
                      $mdToast.simple()
                      .textContent('Unauthorized User Please Send Your id to rdv17publicity@gmail.com')
                      .position('bottom right')
                      .hideDelay(3000)
                    );
                  });


    };


    if($window.localStorage.userFullDetails !=null){
    $scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);

    };

    // if($scope.userFullDetails.type == 'admin'){
    //   $scope.isLogin = true;
    // }
    // else if ($scope.userFullDetails.type == 'god') {
    //   $scope.isLogin = true;
    // }
    // else {
    //   $scope.isLogin = true;
    // }

    $scope.checkTypes = function (type) {
      if(type == 'admin' || type == 'god'){
        return true;
      }
      else {
        return false;
      }

    };

  $rootScope.logout = function(){
      // $location.path("/");
      // $window.location.reload();
    // console.log($window.localStorage);
    // $window.localStorage.userDetails = null;
    // $window.localStorage.userFullDetails = null;
    // // console.log('hello');
    //
    // console.log('deepak');
    // $window.location.reload();
    $rootScope.logout=true;
    $location.path("/");
    localStorage.clear();
    // console.log($window.localStorage);


    // localStorage.clear();


    $mdToast.show(
      $mdToast.simple()
      .textContent('User logout sucessfully!')
      .position('bottom right')
      .hideDelay(3000)
    );
    $window.location.reload();
  }

 });
