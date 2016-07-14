import React from 'react';

import PlayerComponent from './PlayerComponent.jsx'

export default class PlayersComponent extends React.Component {
	constructor(props) {
		super(props);

	    this.state = {
	    	initpPlayers: this.props.initPlayers,
	    	players: this.props.players
	    }
	}
	  
	render() {
		var players = this.state.players;
		
	  	return (
			  <div className="players-container">
				{ this.state.initpPlayers.map(function(item, index, arr) {
	        		return <PlayerComponent key={index} game={item.game} config={item.config} hand={item.hand}
	        					ref={function(player) {
				        	          if (player != null) {
				        	        	  if (players.indexOf(player) == -1) {
				        	        		  players.push(player);
				        	        	  }
				        	            }
				        	          }} />;
	        	}) }
		    </div>
	  );
  }
}