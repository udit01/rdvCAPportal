app.controller('MainCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window,$rootScope,$mdSidenav) {

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

      $scope.login();
      $scope.$apply();



    });



    if($window.localStorage.userDetails !=null){

    $scope.userDetails = JSON.parse($window.localStorage.userDetails);
      }

      if($window.localStorage.userFullDetails !=null){

      $scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);
        }


    $scope.login = function(){
            $scope.isLogin = true;
      console.log($scope.isLogin);
      // if($window.localStorage.userDetails !=null){
      //   $mdToast.show(
      //     $mdToast.simple()
      //     .textContent('Please First Signup through Facebook')
      //     .position('bottom right')
      //     .hideDelay(3000)
      //   );
      //
      //   }

      if($scope.userDetails !=null){


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
                      'token':$scope.userDetails.token
                  }
                }).then(function successCallback(response) {
                  $scope.isLogin = false;
                  userFullDetails = {
                      name: response.data.user.name,
                      points: Math.floor(response.data.user.points/1000000000000000),
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

                }


    };

    // if($scope.userDetails !=null){
    //   $scope.login();
    //   console.log("its working");
    // }


    if($window.localStorage.userFullDetails !=null){
    $rootScope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);

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

    $scope.checkGod = function (type) {
      if(type == 'god'){
        return true;
      }
      else {
        return false;
      }

    };






  $rootScope.logout = function(){
    localStorage.clear();
    $location.path("/");
    $scope.storageClear = true;
    // $location.path("/");
    console.log($scope.storageClear);

  };

  $rootScope.makeLogout = function(){
    if($scope.storageClear){

      console.log("it works");
      $location.path("/");
        console.log("it again works");
    }
  };

  $rootScope.makeLogout();


  $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');

      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        };
      };


$scope.userProfile = function(){
  console.log("korkudeepak");
  console.log($scope.userFullDetails.access_token);
  console.log("korku");
  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'profile',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
        $scope.userProfile = response.data.user;
        console.log(response);

        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
        $mdToast.show(
          $mdToast.simple()
          .textContent('Something went wrong')
          .position('bottom right')
          .hideDelay(3000)
        );
      });

};

  $scope.userProfile();



 });
