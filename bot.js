var _ = require('lodash');
var Twit = require('twit');
var T = new Twit(require('./config.js'));
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/public/:templateName', function (req, res) {
    res.render('public/' + req.params.templateName);
});

var port = process.env.PORT || 9945;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});
