var express = require('express');
var router = express.Router();
var DollModel = require('../models/DollModel');
var BrandModel = require('../models/BrandModel');
//URL: localhost:3001/doll
router.get('/', async (req, res) => {
   var dolls = await DollModel.find({}).populate('brand');
   //Path: views/doll/index.hbs
   res.render('doll/index', { dolls, layout: 'layoutadmin'});
})

router.get('/show', async (req, res) => {
   var dolls = await DollModel.find({}).populate('brand');
   //Path: views/doll/index.hbs
   res.render('doll/show', { dolls });
})

router.get('/add', async (req, res) => {
   var brands = await BrandModel.find({});
   res.render('doll/add', { brands , layout: 'layoutadmin' });
})

router.post('/add', async (req, res) => {
   var doll = req.body;
   await DollModel.create(doll);
   res.redirect('/doll');
})


router.get('/delete/:id', async (req, res) => {
   await DollModel.findByIdAndDelete(req.params.id);
   res.redirect('/doll');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var doll = await DollModel.findById(id);
   var brands = await BrandModel.find({});
   res.render('doll/edit', { doll, brands , layout: 'layoutadmin' });
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var doll = req.body;
   try {
      await DollModel.findByIdAndUpdate(id, doll);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/doll');
})

router.get('/sort/asc', async (req, res) => {
   //SQL: SELECT * FROM dolls ORDER BY model
   var dolls = await DollModel.find().populate('brand').sort({ model: 1 });
   res.render('doll/index', { dolls })
})

router.get('/sort/desc', async (req, res) => {
   //SQL: SELECT * FROM dolls ORDER BY model DESC
   var dolls = await DollModel.find().populate('brand').sort({ model: -1 });
   res.render('doll/index', { dolls })
})

router.post('/search', async (req, res) => {
   var keyword = req.body.keyword;
   //SQL: SELECT * FROM dolls WHERE model LIKE '%keyword%'
   var dolls = await DollModel.find({ model: new RegExp(keyword, "i") }).populate('brand');
   res.render('doll/index', { dolls, layout: 'layoutadmin' })
})

module.exports = router;