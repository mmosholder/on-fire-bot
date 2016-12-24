import React from 'react';

import nba from 'nba';
import _ from 'lodash';
import data from './selectedPlayers.json';
import RandomPlayer from './randomizePlayers';
import players from './players.json';


class GamesComponent extends React.Component {
  constructor(props) {
    super(props);
    this._getGames = this._getGames.bind(this);
    // this._handleResponse = this._handleResponse.bind(this);

    this.state = {
      gameId: '',
      player: RandomPlayer.playerName,
      id: RandomPlayer.playerId
    }

    this._getGames()
  }

  _getGames() {
    return nba.stats.scoreboard({GameID: "0021600439"}, {
      headers: new Headers({
    		'Referer': 'http://stats.nba.com/scores/'
    	})
    })
      .then(function(data) {
        console.log(data);
        // console.log(data.shot_Chart_Detail[data.shot_Chart_Detail.length - 1]);
        // var info = data[-1];
        // _.map(info, function(item) {
        //   console.log(item)
        // })
      })
  }

  render(){
    return (
      <div>
        {/*{this.state.player}, {this.state.id}*/}
      </div>
    )
  }
}

export default GamesComponent;
