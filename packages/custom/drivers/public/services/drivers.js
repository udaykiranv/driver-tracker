'use strict';

//Drivers service used for drivers REST endpoint
angular.module('mean.drivers').factory('Drivers', ['$resource',
  function($resource) {
    return $resource('drivers/:driverId', {
      driverId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
