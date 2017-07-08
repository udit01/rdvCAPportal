app.controller('PendingCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window) {

$scope.isSubmit = true;
$scope.init = function() {
  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'approve',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
        $scope.pendingData = response.data;
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
}

$scope.init();

$scope.submitPending = function(data){
  $http({
      method: 'POST',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
       data:{
         'points':data.allot_points,
         'submission_id':data.uuid
       },
      url: URL_PREFIX + 'approve',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
      $scope.leaderboardData = response.data.leaderboard;
      $mdToast.show(
        $mdToast.simple()
          .textContent(response.data.message)
          .hideDelay(5000)
          .position('right bottom')
        );
        $scope.isSubmit = false;
        data.allot_points = '';

      }, function errorCallback(response) {
        console.log(response);
        $mdToast.show(
          $mdToast.simple()
            .textContent(response.data.message)
            .hideDelay(5000)
            .position('right bottom')
          );
      });

      
}
});
