'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Drivers = new Module('drivers');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Drivers.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Drivers.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Drivers.menus.add({
    'roles': ['authenticated'],
    'title': 'Drivers',
    'link': 'all drivers'
  });
  Drivers.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Driver',
    'link': 'create driver'
  });

  //Drivers.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Drivers.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Drivers.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Drivers.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Drivers.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Drivers.aggregateAsset('css', 'drivers.css');

  return Drivers;
});
