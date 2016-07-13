import React from 'react';

/*
 * This Component hold the Player
 */
export default class PlayerComponent extends React.Component {
	constructor(props) {
	    super(props);
	    
	    this.hand = [];

	    this.state = {
	    	config: props.config,
	    	game: props.game,
	    	hand: this.hand
	    };
	    
	    console.log('Welcome our new player, ' + this.state.config.name + '.');
	    
	    this.handlePlayerClick = this.handlePlayerClick.bind(this);
	}
    
    getHand() {
    	return this.state.hand;
    }
    
    hasCard(card) {
    	return (this.hand.indexOf(card) > -1)? true: false;
    }
    
    removeCard(card) {
    	card.setHand(false);
    	var pos = this.hand.indexOf(card);
  	  	this.hand.splice(pos, 1);
    }
    
    // Get card and add to hand
    addCardToHand(card) {
    	this.hand.push(card);
    }
    
    handlePlayerClick() {
    	console.log('really??');
    }
    
    componentWillMount() {
    	this.setState({hand: this.hand});
    }
    
	render() {
    	return (
    		<div className="player" key={this.props.key}>
    			<div className="hand">
	    			{ this.state.hand.map(function(item, index, arr) {
	    				item.setHand(true);
	    				item.setPos(index, arr.length);
		        		item.setSide('front');

		        		return item.render();
		        	}) }
    			</div>
    		</div>
    	);
    }
}

PlayerComponent.propTypes = {
	config: React.PropTypes.node,
	game: React.PropTypes.node.isRequired
};