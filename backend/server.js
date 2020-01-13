/****************************
*   The Best Place server   *
*****************************/

let mongoose    = require('mongoose'),
    express     = require('express')
    ;


/* Create server express */
let app = express();
let server = app.listen(2020, function () {
   let host = server.address().address
   let port = server.address().port
   
   console.log("TheBestPlace server is listening at http://%s:%s", host, port)
});

/* Connect to mongoDB */
mongoose.connect('mongodb://localhost/VilleDeReve', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connection success");
});

/* Town shema */
let villeSchema = new mongoose.Schema({
  ville: String,
  code_postal: String,
  departement: String
});

/*let Ville = mongoose.model('Ville', villeSchema);
let testV = new Ville({ville: "Massy", code_postal: "91300", departement: "91"});

console.log(testV);

testV.save(function(error){
  console.log("TestV has been saved!");
  if (error) {
    console.error(error);
  }
});*/

/* Get towns
 * arg1 skip
 * arg2 limit
*/
app.get('/getTowns', function (req, res) {
   let skip = (req.query.skip) ? req.query.skip : 0;
   let limit = (req.query.limit) ? req.query.limit : 2;

   let town_getted = db.collection('villes').find({}).skip(parseInt(skip)).limit(parseInt(limit)).toArray(function(err, db_result){
        if(err) throw err;
        res.send(db_result);
    });
});