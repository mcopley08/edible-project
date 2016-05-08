var express = require('express');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

// var Logger = require('le_node');
// var log = new Logger({
//   token:'<get-a-new-one>'
// });

// parse application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

// ACTUAL ROUTES

app.get('/', function(req, res) {
  res.render('index', {});
});

// ************************ Listening on Port 8080 ******************
// app.listen(process.env.PORT || 8080);
// console.log('listening on port 8080... hahaha...');

http.listen(process.env.PORT || 8080, function(){
  console.log('Listening on port 8080...');
});
