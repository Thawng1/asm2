var express = require('express');
var router = express.Router();
var RobotModel = require('../models/RobotModel');

var DollModel = require('../models/DollModel');

//URL: localhost:3001/robot
router.get('/', async (req, res) => {
   var robots = await RobotModel.find({}).populate('brand');
   var dolls = await DollModel.find({}).populate('brand');
   res.render('admin/index', { robots, dolls, layout: 'layoutadmin' }); 
})

module.exports = router;