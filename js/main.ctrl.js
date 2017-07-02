app.controller('MainCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window,$rootScope) {
  $scope.isAdmin = false;

  $rootScope.isPath= function(viewLocation) {
    return viewLocation === $location.path();
  };

  if($rootScope.isPath('/')===true && $scope.userFullDetails !=undefined){
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
      if($window.localStorage.userDetails ==null && $window.localStorage.userFullDetails){
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
                  url: URL_PREFIX + 'api/auth/facebook',
                  headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                  },
                  data:{
                      'token':token
                  }
                }).then(function successCallback(response) {
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
                    console.log(response);
                  }, function errorCallback(response) {
                    console.log(response);
                  });


    };


    if($window.localStorage.userFullDetails !=null){
    $scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);

    if($window.localStorage.userFullDetails.type = "admin"){
      $scope.isAdmin = true;
    }

  };

  $scope.logout = function(){
    console.log($window.localStorage);
    $window.localStorage.clear();
    $location.path("/");
    console.log($window.localStorage);
  }

 });