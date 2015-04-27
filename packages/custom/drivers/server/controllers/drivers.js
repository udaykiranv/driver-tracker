'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Driver = mongoose.model('Driver'),
  _ = require('lodash');


/**
 * Find driver by id
 */
exports.driver = function(req, res, next, id) {
  Driver.load(id, function(err, driver) {
    if (err) return next(err);
    if (!driver) return next(new Error('Failed to load driver ' + id));
    req.driver = driver;
    next();
  });
};

/**
 * Create an driver
 */
exports.create = function(req, res) {
  var driver = new Driver(req.body);
  driver.user = req.user;

  driver.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the driver'
      });
    }
    res.json(driver);

  });
};

/**
 * Update an driver
 */
exports.update = function(req, res) {
  var driver = req.driver;

  driver = _.extend(driver, req.body);

  driver.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the driver'
      });
    }
    res.json(driver);

  });
};

/**
 * Delete an driver
 */
exports.destroy = function(req, res) {
  var driver = req.driver;

  driver.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the driver'
      });
    }
    res.json(driver);

  });
};

/**
 * Show an driver
 */
exports.show = function(req, res) {
  res.json(req.driver);
};

/**
 * List of Drivers
 */
exports.all = function(req, res) {
  Driver.find().sort('-created').populate('user', 'name username').exec(function(err, drivers) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the drivers'
      });
    }
    res.json(drivers);

  });
};
