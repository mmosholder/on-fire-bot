'use strict';
import React from 'react';
import {render} from 'react-dom';

import nba from 'nba';
import _ from 'lodash';

import GamesComponent from './modules/getGames';

if (document.getElementById('games') ) {
  render(<GamesComponent />, document.getElementById('games'));
}

var shots;
var counter = 0;

// function getGames() {
//   return nba.stats.shots({PlayerID: "2544", GameID: "0021600429"})
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
