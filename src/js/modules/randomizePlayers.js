import React from 'react';

import nba from 'nba';
import _ from 'lodash';
import data from './selectedPlayers.json';

var randomPlayer = data[Math.floor(Math.random()*data.length)];
var playerId = randomPlayer.playerId;

const RandomPlayer = {
  playerName: randomPlayer.firstName + ' ' + randomPlayer.lastName,
  playerId: playerId
}

export default RandomPlayer;
