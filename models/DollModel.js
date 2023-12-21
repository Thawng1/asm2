var mongoose = require('mongoose');
var DollSchema = mongoose.Schema({
   model: String,
   price: Number,
   image: String,

   brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands'  // 'brands': collection
   }
});
//Relationship : mobiles (many) - brands (one)

var DollModel = mongoose.model('dolls', DollSchema); // 'mobiles' : collection
module.exports = DollModel;