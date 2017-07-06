app.controller('SubmissionCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window) {

$scope.getSubmission = function(){

  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'submit',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
      $scope.submissionData = response.data;

      }, function errorCallback(response) {
        console.log(response);
      });


};

$scope.getSubmission();

});
