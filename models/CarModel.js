var mongoose = require('mongoose');
var CarSchema = mongoose.Schema({
   model: String,
   price: Number,
   image: String,
   date: Date,
    
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  // 'brands': collection
   }
});
//Relationship : mobiles (many) - brands (one)

var CarModel = mongoose.model('cars', CarSchema); // 'mobiles' : collection
module.exports = CarModel;