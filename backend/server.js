var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/VilleDeReve', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
});

var villeSchema = new mongoose.Schema({
  ville: String,
  code_postal: String,
  departement: String
});

var Ville = mongoose.model('Ville', villeSchema);
var testV = new Ville({ville: "Massy", code_postal: "91300", departement: "91"});

console.log(testV);

testV.save(function(error){
  console.log("TestV has been saved!");
  if (error) {
    console.error(error);
  }
});