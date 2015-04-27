'use strict';

(function() {
  // Drivers Controller Spec
  describe('MEAN controllers', function() {
    describe('DriversController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        jasmine.addMatchers({
          toEqualData: function() {
            return {
              compare: function(actual, expected) {
                return {
                  pass: angular.equals(actual, expected)
                };
              }
            };
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.drivers');
      });

      // Initialize the controller and a mock scope
      var DriversController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        DriversController = $controller('DriversController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one driver object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('drivers').respond([{
            title: 'An Driver about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.drivers).toEqualData([{
            title: 'An Driver about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one driver object fetched ' +
        'from XHR using a driverId URL parameter', function() {
          // fixture URL parament
          $stateParams.driverId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testDriverData = function() {
            return {
              title: 'An Driver about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/drivers\/([0-9a-fA-F]{24})$/).respond(testDriverData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.driver).toEqualData(testDriverData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postDriverData = function() {
            return {
              title: 'An Driver about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseDriverData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An Driver about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An Driver about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('drivers', postDriverData()).respond(responseDriverData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/drivers/' + responseDriverData()._id);
        });

      it('$scope.update(true) should update a valid driver', inject(function(Drivers) {

        // fixture rideshare
        var putDriverData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Driver about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock driver object from form
        var driver = new Drivers(putDriverData());

        // mock driver in scope
        scope.driver = driver;

        // test PUT happens correctly
        $httpBackend.expectPUT(/drivers\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/drivers\/([0-9a-fA-F]{24})$/, putDriverData()).respond();
        /*
                Error: Expected PUT /drivers\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Driver about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Driver about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/drivers/' + putDriverData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid driverId ' +
        'and remove the driver from the scope', inject(function(Drivers) {

          // fixture rideshare
          var driver = new Drivers({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.drivers = [];
          scope.drivers.push(driver);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/drivers\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(driver);
          $httpBackend.flush();

          // test after successful delete URL location drivers list
          //expect($location.path()).toBe('/drivers');
          expect(scope.drivers.length).toBe(0);

        }));
    });
  });
}());
