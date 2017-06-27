var app = angular.module('app', ['ngMaterial','ngAnimate','ngRoute']);

var URL_PREFIX = 'http://10.194.31.195:8080/';
var CLIENT_ID='usOAFye6wnoJAKX0BWk0EYZshsWO2LZY5zfHM4tb';
var CLIENT_SECRET='M5qMOfXMWwTVKpHVQt20QVnGFqowylJrCuUxDiuTzkpwaWhDnIv22jNLjOgcNsEeSVH3L3Hunh0GUgULQXKCQYfibqvU4snMbmoMdKvoXFFBv7UcjjmBLpWnBQaWdW8J';
//
// app.config(function ($httpProvider) {
//   $httpProvider.defaults.headers.common = {};
//   $httpProvider.defaults.headers.post = {};
//   $httpProvider.defaults.headers.put = {};
//   $httpProvider.defaults.headers.patch = {};
// });
//
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider.when("/", {
    controller: "MainCtrl",
    templateUrl: "templates/signup.html"
  }).when("/login", {
    controller: "MainCtrl",
    templateUrl: "templates/login.html"
  }).otherwise({
    controller: "MainCtrl",
    templateUrl: "templates/error.html"
  });
}]);
app.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeSuccess", function (userDetails) {
        // console.log(userDetails);
    });
    $rootScope.$on("$routeChangeError", function (event, current, previous, eventObj) {
        if (eventObj.authenticated === false) {
            $location.path("/");
        }
    });
}]);
app.factory("Auth", ["$http","$q","$window",function ($http, $q, $window) {
    var userDetails;
    function login(user) {
        var url=URL_PREFIX+'api/login/';
        var deferred = $q.defer();
        $http({
             method: "POST",
             transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
             },
             data: {
                'email':user.email,
                'password':user.password

             },
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
             url: url
           }).then(function successCallback(response) {
             console.log(response);
            //  userDetails = {
            //      accessToken: response.data.access_token,
            //      hostel:response.data.hostel,
            //      name:response.data.name,
            //      email: response.data.email,
            //      id:response.data.id,
            //      role:response.data.role
            //  };
            //  $window.localStorage.userDetails = JSON.stringify(userDetails);
            //  deferred.resolve(userDetails);
           }, function errorCallback(error) {
             deferred.reject(error);
         });
         return deferred.promise;
    };

    function logout() {
        var deferred = $q.defer();
        $http({
            method: "POST",
            url: URL_PREFIX+"logout/",
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
              'Authorization':'Bearer '+userDetails.accessToken
            }
        }).then(function (result) {
            // console.log(result);
            userDetails = null;
            $window.localStorage.userDetails = null;
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };

    function getuserDetails() {
        return userDetails;
    }
    function init() {
        if ($window.localStorage.userDetails) {
            userDetails = JSON.parse($window.localStorage.userDetails);
        }
    }
    init();
    return {
        login: login,
        logout: logout,
        getuserDetails: getuserDetails
    };
}]);
