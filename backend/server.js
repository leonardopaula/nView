// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// news ~ 1jKPjOJpugmXmpEd
// mongodb://<dbuser>:<dbpassword>@ds149431.mlab.com:49431/demo
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var util = require("util"),
    http = require("http");

var mongoose   = require('mongoose');
mongoose.connect('mongodb://news:newses@ds149431.mlab.com:49431/demo');

var News       = require("./models/news");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3100;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'Yes, we have a API here...' });   
});

router.route('/news')
    .post(function(req, res) {
        console.log(req.body.url);
        News.findOne({'url':req.body.url}, function(err, news) {
            if (err)
                res.send(err);
            res.json(news);
            if (news == null) 
            {
                var options = {
                    host: 'www.jornalvs.com.br',
                    port: 80,
                    path: '/_conteudo/2017/06/noticias/regiao/2131946-policia-civil-procura-pela-vereadora-cigana.html'
                };

                let rawData = '';
                http.get(options, function(res) {
                    res.on('data', function(data){
                        console.log(data.toString());
                    });
                }).on('error', function(e) {
                    console.log("Got error: " + e.message);
                });
            }
        });
    });

app.use('/api', router);

app.listen(port);
console.log('Running at ' + port);
