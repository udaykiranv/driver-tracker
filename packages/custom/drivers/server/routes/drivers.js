'use strict';

var drivers = require('../controllers/drivers');

// Driver authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.driver.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Drivers, app, auth) {

  app.route('/drivers')
    .get(drivers.all)
    .post(auth.requiresLogin, drivers.create);
  app.route('/drivers/:driverId')
    .get(auth.isMongoId, drivers.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, drivers.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, drivers.destroy);

  // Finish with setting up the driverId param
  app.param('driverId', drivers.driver);
};
