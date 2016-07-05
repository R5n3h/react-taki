import React from 'react';

export default class PlayersComponent extends React.Component {
	constructor(props) {
		super(props);

	    this.state = {
	    	players: this.props.players
	    }
	}
	  
	render() {
	  	return (
			  <div className="players-container">
				{ this.state.players.map(function(item, index, arr) {
	        		return item.render();
	        	}) }
		    </div>
	  );
  }
}