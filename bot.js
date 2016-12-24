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

var nba = require('nba');
var _ = require('lodash');

var shots;
var counter = 0;

// function getGames() {
//   return nba.stats.gameday({PlayerID: "2544"}, args)
//     .then(function(data) {
//       var shots = data.shot_Chart_Detail;
//
//       _.map(shots, function(item) {
//         console.log(item.eventType);
//         if (item.eventType === "Made Shot") {
//           counter = counter+1;
//
//           if (counter === 3) {
//             console.log("HE'S ON FIRE!");
//             counter = 0;
//           }
//         } else if (item.eventType === "Missed Shot") {
//           counter = 0;
//         }
//       })
//     })
// }
//
// getGames()

var port = process.env.PORT || 9945;
var server = app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});
