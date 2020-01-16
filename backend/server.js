/****************************
*   The Best Place server   *
*****************************/

/* Import packages */
let mongoose        = require('mongoose')
,   mongo           = require('mongodb')
,   express         = require('express')
,   custom_parser   = require('./parser.js')
,   custom_logger   = require('./logger.js')
,   props_reader    = require('properties-reader')
,   bodyParser      = require('body-parser')
;

/* Create Logger */
let logger = custom_logger.logger;
logger.debug_lvl = true;

/* Configuration */
let properties_file = 'configuration.conf';

var properties = props_reader(properties_file);

let database_name = properties.get('database.name');
let town_collecion_name = properties.get('database.collection.town');
let app_port = properties.get('server.port');

logger.debug('Database name : ' + database_name);
logger.debug('Town collection name : ' + town_collecion_name);
logger.debug('App port : ' + app_port);

/* Create server express */
let app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'application/json,X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
let server = app.listen(app_port, function () {
   let host = server.address().address
   let port = server.address().port
   
   logger.info("TheBestPlace server is listening at http://" + host + ":" + port);
});

/* Connect to mongoDB */
mongoose.connect('mongodb://localhost/' + database_name, {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    logger.info("MongoDB connection success");
});

/* Town shema */
let townSchema = new mongoose.Schema({
  _id: String,
  dep:String,
  slug:String,
  nom_simple:String,
  nom_reel:String,
  code_postal: String,
  code_commune:String,
  longitude_deg:Number,
  latitude_deg:Number
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

   let town_getted = db.collection(town_collecion_name).find({}).skip(parseInt(skip)).limit(parseInt(limit)).toArray(function(err, db_result){
        if(err) throw err;
        res.send(db_result);
    });
});

/* Get cities, skip, limit and dep filter
 */
app.get('/findCities', function(req, res){
   let skip = (req.query.skip) ? req.query.skip : 0;
   let limit = (req.query.limit) ? req.query.limit : 2;
   let dep = (req.query.dep) ? req.query.dep : null;

   let query = (dep == null) ? {} : { dep : dep };

   let town_getted = db.collection(town_collecion_name).find(query).skip(parseInt(skip)).limit(parseInt(limit)).toArray(function(err, db_result){
        if(err) throw err;
        res.send(db_result);
    });
});

/* Get cities, skip, limit with global filter
 */
app.post('/findCitiesWithFilter', function(req, res){
   let skip = (req.body.skip) ? req.body.skip : 0;
   let limit = (req.body.limit) ? req.body.limit : 2;
   
   let query = (req.body.filter) ? req.body.filter : {};

   let town_getted = db.collection(town_collecion_name).find(query).skip(parseInt(skip)).limit(parseInt(limit)).toArray(function(err, db_result){
        if(err) throw err;
        db.collection(town_collecion_name).find(query).count().then( (counter) => {
            res.send({
                result:db_result,
                count:counter
            });

        })
    });
});

/* Get all departements
*/
app.get('/getAllDeps', function (req, res) {
    db.collection('villes').aggregate([
        {
           $group: { 
              _id: "$dep"
           }
        },
        {
          $sort:{_id:1}
        }
    ]).toArray(function(err, db_result){
        if(err) throw err;
        res.send(db_result);
    });
});


/* Get an XML which contain the towns
 */
app.get('/townsToXML', function(req, res){
    logger.debug('Here townsToXML');

    let skip = (req.query.skip) ? req.query.skip : 0;
    let limit = (req.query.limit) ? req.query.limit : 2;

    let town_getted = db.collection(town_collecion_name).find({}).skip(parseInt(skip)).limit(parseInt(limit)).toArray(function(err, db_result){
        if(err) throw err;

        db_result.forEach(function(town){
            for(let key in town){
                town[key] += '';
            }
        });

        console.log(db_result);

        logger.debug('Parsing Towns');
        let xml = custom_parser.js2xml(db_result, {compact : false, indent : 4, rootname : 'Towns', arrayChildNameMap : { 'Towns' : 'Town'}});
        logger.debug('Result : ');
        console.log(xml);

        res.send(xml);
    });
});

/* Get number of towns
*/
app.get('/getNbTowns', function (req, res) {
    db.collection(town_collecion_name).count({}, function(error, numOfDocs) {
        res.send({nbTowns: numOfDocs});
    });
});


/* Get town information
*/
app.get('/getTownInfos', function (req, res) {
    let o_id = new mongo.ObjectID(req.query._id);

    db.collection(town_collecion_name).findOne({_id: o_id}, function (err, db_result) {
        if(err) throw err;
        res.json(db_result);
    });
});


process.on('SIGINT', function() {
    server.close(); logger.info("Shutdown server");
    db.close(); logger.info("Closing DB connection");
});