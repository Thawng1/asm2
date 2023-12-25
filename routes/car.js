var express = require('express');
var router = express.Router();
var CarModel = require('../models/CarModel');
var BrandModel = require('../models/BrandModel');

//URL: localhost:3001/car
router.get('/', async (req, res) => {
   var cars = await CarModel.find({}).populate('brand');
   //Path: views/car/index.hbs
   res.render('car/index', { cars, layout: 'layoutadmin' }); 
})

router.get('/show', async (req, res) => {
   var cars = await CarModel.find({}).populate('brand');
   //Path: views/car/index.hbs
   res.render('car/show', { cars });
})

router.get('/add', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('car/add', { brands, layout: 'layoutadmin'  });
})

router.post('/add', async (req, res) => {
   var car = req.body;
   await CarModel.create(car);
   res.redirect('/car');
})
router.get('/delete/:id', async (req, res) => {
   await CarModel.findByIdAndDelete(req.params.id);
   res.redirect('/car');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var car = await CarModel.findById(id);
   var brands = await BrandModel.find({});
   res.render('car/edit', { car, brands, layout: 'layoutadmin'  });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var car = req.body;
   try {
      await CarModel.findByIdAndUpdate(id, car);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/car');
})
router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //SQL: SELECT * FROM dolls WHERE model LIKE '%keyword%'
   var cars = await CarModel.find({ model: new RegExp(keyword, "i") }).populate('brand');
   res.render('car/index', { cars ,layout: 'layoutadmin'})
})
module.exports = router;