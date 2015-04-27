'use strict';

angular.module('mean.drivers', ['ui.bootstrap']).controller('DriversController', ['$scope', '$stateParams', '$location', 'Global', 'Drivers',
  function($scope, $stateParams, $location, Global, Drivers) {
    $scope.global = Global;
    $scope.hasAuthorization = function(driver) {
      if (!driver || !driver.user) return false;
      return $scope.global.isAdmin || driver.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var driver = new Drivers({
          title: this.title,
          content: this.content
        });
        driver.$save(function(response) {
          $location.path('drivers/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(driver) {
      if (driver) {
        driver.$remove(function(response) {
          for (var i in $scope.drivers) {
            if ($scope.drivers[i] === driver) {
	      $scope.drivers.splice(i,1);
            }
          }
          $location.path('drivers');
        });
      } else {
        $scope.driver.$remove(function(response) {
          $location.path('drivers');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var driver = $scope.driver;
        if(!driver.updated) {
          driver.updated = [];
	}
        driver.updated.push(new Date().getTime());

        driver.$update(function() {
          $location.path('drivers/' + driver._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Drivers.query(function(drivers) {
        $scope.drivers = drivers;
      });
    };

    $scope.findOne = function() {
      Drivers.get({
        driverId: $stateParams.driverId
      }, function(driver) {
        $scope.driver = driver;
      });
    };
  }
]);
