var express = require('express');
var router = express.Router();
var RobotModel = require('../models/RobotModel');
var DollModel = require('../models/DollModel');

router.get('/', async (req, res) => {
  var robots = await RobotModel.find({}).populate('brand');
  var dolls = await DollModel.find({}).populate('brand');
  var products = {
    robots: robots,
    dolls: dolls
  };

  // Path: views/robot/index.hbs
  res.render('index', products);
});

module.exports = router;
