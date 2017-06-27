app.controller('MainCtrl', function($scope, $mdToast, $document, $http, $location,Auth) {

  $scope.isPath= function(viewLocation) {
    return viewLocation === $location.path();
  };
  $scope.signUp=function (user) {
    console.log('bhai');
    $http({
      url:URL_PREFIX+"api/signup/",
      method:"POST",
      headers:{
        'Content-Type': 'text/html; charset=utf-8'
      },
      data:{
        'email':user.email,
        'password':user.password

      }
    }).then(function sucessCallback(response) {

        console.log(response);
        // $location.path("/login");

    }, function errorCallback(error) {
      console.log(error);
    });
  };
  $scope.logInUser=function (user) {
    if (user===undefined) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Please check your input field')
        .position('bottom right')
        .hideDelay(3000)
      );
    }
    Auth.login(user).then(function(response) {
      // $scope.userDetails = response;
      // $location.path("/dashboard");
      console.log(response);
      $mdToast.show(
        $mdToast.simple()
        .textContent('User sucessfully logged in!')
        .position('bottom right')
        .hideDelay(3000)
      );
    });
  };
});
