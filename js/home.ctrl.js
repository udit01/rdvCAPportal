app.controller('MainCtrl', function($scope, $mdToast, $document, $http, $location) {

  // $scope.isPath= function(viewLocation) {
  //   return viewLocation === $location.path();
  // };
  // $scope.signUp=function (user) {
  //   $http({
  //     url:URL_PREFIX+"api/register/",
  //     method:"POST",
  //     headers:{
  //       'Content-Type': 'application/json; charset=UTF-8'
  //     },
  //     data:{
  //       'user_name':user.username,
  //       'user_id':user.userid.toUpperCase(),
  //       'user_hostel':user.hostel,
  //       'email':user.email,
  //       'password':user.password
  //     }
  //   }).then(function sucessCallback(response) {
  //     if (response.status===200){
  //       $location.path("/login");
  //       $mdToast.show(
  //         $mdToast.simple()
  //         .textContent('User created sucessfully!')
  //         .position('bottom right')
  //         .hideDelay(3000)
  //       );
  //     }
  //   }, function errorCallback(error) {
  //     if (error.status===302){
  //       $mdToast.show(
  //         $mdToast.simple()
  //         .textContent('Something went wrong, Please try again!')
  //         .position('bottom right')
  //         .hideDelay(3000)
  //       );
  //     }
  //   });
  // };
  // $scope.logInUser=function (user) {
  //   if (user===undefined) {
  //     $mdToast.show(
  //       $mdToast.simple()
  //       .textContent('Please check your input field')
  //       .position('bottom right')
  //       .hideDelay(3000)
  //     );
  //   }
  //   Auth.login(user).then(function(response) {
  //     $scope.userDetails = response;
  //     $location.path("/dashboard");
  //     $mdToast.show(
  //       $mdToast.simple()
  //       .textContent('User sucessfully logged in!')
  //       .position('bottom right')
  //       .hideDelay(3000)
  //     );
  //   });
  // };
});
