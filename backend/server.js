// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// news ~ 1jKPjOJpugmXmpEd
// news-shard-00-00-xvx4t.mongodb.net:27017
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3100;

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Yes, we have a API here...' });   
});

app.use('/api', router);

app.listen(port);
console.log('Running at ' + port);
