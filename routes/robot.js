var express = require('express');
var router = express.Router();
var RobotModel = require('../models/RobotModel');
var BrandModel = require('../models/BrandModel');

//URL: localhost:3001/robot
router.get('/', async (req, res) => {
   var robots = await RobotModel.find({}).populate('brand');
   //Path: views/robot/index.hbs
   res.render('robot/index', { robots });
})

router.get('/customer', async (req, res) => {
   var robots = await RobotModel.find({}).populate('brand');
   //Path: views/robot/index.hbs
   res.render('robot/list', { robots });
})

router.get('/add', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('robot/add', { brands });
})

router.post('/add', async (req, res) => {
   var robot = req.body;
   await RobotModel.create(robot);
   res.redirect('/robot');
})


router.get('/delete/:id', async (req, res) => {
   await RobotModel.findByIdAndDelete(req.params.id);
   res.redirect('/robot');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var robot = await RobotModel.findById(id);
   var brands = await BrandModel.find({});
   res.render('robot/edit', { robot, brands });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var robot = req.body;
   try {
      await RobotModel.findByIdAndUpdate(id, robot);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/robot');
})

router.get('/sort/asc', async (req, res) => {
   //SQL: SELECT * FROM robots ORDER BY model
   var robots = await RobotModel.find().populate('brand').sort({ model: 1 });
   res.render('robot/index', { robots })
})

router.get('/sort/desc', async (req, res) => {
   //SQL: SELECT * FROM robots ORDER BY model DESC
   var robots = await RobotModel.find().populate('brand').sort({ model: -1 });
   res.render('robot/index', { robots })
})

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //SQL: SELECT * FROM robots WHERE model LIKE '%keyword%'
   var robots = await RobotModel.find({ model: new RegExp(keyword, "i") }).populate('brand');
   res.render('robot/index', { robots })
})

module.exports = router;