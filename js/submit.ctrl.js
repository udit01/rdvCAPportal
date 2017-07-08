app.controller('SubmitCtrl', function($scope, $mdToast, $document, $http, $location,socialLoginService, $window, $mdDialog,$rootScope) {
$scope.userFullDetails = JSON.parse($window.localStorage.userFullDetails);



$scope.getTasks = function(){
  $http({
      method: 'GET',
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
       },
      url: URL_PREFIX + 'tasks',
      headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'x-access-token':$scope.userFullDetails.access_token
      }
    }).then(function successCallback(response) {
      $scope.taskData = response.data.tasks;
      console.log("korku tasks");
      console.log(response);

      }, function errorCallback(response) {
        console.log(response);
      });
}

$scope.getTasks();


$scope.showAdvanced = function(ev,id,type) {
      $rootScope.task_id = id;
      console.log($scope.task_id);
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '../templates/'+type +'.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';



    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.createDialog = function(ev) {

      $mdDialog.show({
        controller: DialogController,
        templateUrl: '../templates/createDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';



      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
    };

  function DialogController($scope, $mdDialog) {

    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  };

  $scope.submitTask = function (task) {
    console.log($rootScope.task_id);
    $http({
        method: 'POST',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
         },
         data:{
           'task_id':$rootScope.task_id,
           'image_url':task.image_url,
           'detail':task.detail
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
  };

  $scope.deleteTask = function (task) {
    console.log($rootScope.task_id);
    console.log("deleteTask");
    $http({
        method: 'DELETE',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
         },
         data:{
           'task_id':$rootScope.task_id

         },
        url: URL_PREFIX + 'tasks',
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
  };

  $scope.updateTask = function (task) {
    console.log($rootScope.task_id);
    console.log("updateTask");
    var data = {};
    data['task_id'] = $rootScope.task_id;
    data['name'] = task.name;
    data['detail'] = task.details;
    data['image_url'] = task.image_url;
    $http({
        method: 'PUT',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
         },
         data,
        url: URL_PREFIX + 'tasks',
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
          $window.location.reload();
        }, function errorCallback(response) {
          console.log(response);
          $mdToast.show(
            $mdToast.simple()
              .textContent(response)
              .hideDelay(5000)
              .position('right bottom')
            );
        });
  };
  
  $scope.createTask = function (task) {
    console.log('korku createTask');
    $http({
        method: 'POST',
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
         },
         data:{
           'name':task.name,
           'detail':task.details,
           'image_url':task.image_url,
           'task_id':task.task_id
         },
        url: URL_PREFIX + 'tasks',
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
          $window.location.reload();
        }, function errorCallback(response) {
          console.log(response);
          $mdToast.show(
            $mdToast.simple()
              .textContent(response.data.message)
              .hideDelay(5000)
              .position('right bottom')
            );
        });
  };
});
