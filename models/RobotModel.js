var mongoose = require('mongoose');
var RobotSchema = mongoose.Schema({
   model: String,
   price: Number,
   image: String,
   category: String,
   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  // 'brands': collection
   }
});
//Relationship : mobiles (many) - brands (one)

var RobotModel = mongoose.model('robots', RobotSchema); // 'mobiles' : collection
module.exports = RobotModel;