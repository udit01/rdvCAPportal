app.controller('SubmitCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window) {
$scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);

$scope.submitTask = function (task) {

  $http({
      method: 'POST',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
       data:{
         'post_id':task.post_id,
         'image_url':task.image_url
       },
      url: URL_PREFIX + 'submit',
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
      }, function errorCallback(response) {
        console.log(response);
      });
}
});
