'use strict';

//Setting up route
angular.module('mean.drivers').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all drivers', {
        url: '/drivers',
        templateUrl: 'drivers/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create driver', {
        url: '/drivers/create',
        templateUrl: 'drivers/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit driver', {
        url: '/drivers/:driverId/edit',
        templateUrl: 'drivers/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('driver by id', {
        url: '/drivers/:driverId',
        templateUrl: 'drivers/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
