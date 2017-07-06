app.controller('HomeCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window) {
$scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);
console.log($scope.userFullDetails);
var access_token = $scope.userFullDetails.access_token;

$scope.init = function(){

  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'leaderboard',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
      $scope.leaderboardData = response.data.leaderboard;
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });






};

$scope.init();
});
