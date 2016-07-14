import React from 'react';

/*
 * This Component hold the Player
 */
export default class PlayerComponent extends React.Component {
	constructor(props) {
	    super(props);

	    this.state = {
	    	config: props.config,
	    	game: props.game,
	    	hand: props.hand
	    };
	    
	    console.log('Welcome our new player, ' + this.state.config.name + '.');
	}
    
    getHand() {
    	return this.state.hand;
    }
    
    hasCard(card) {
    	var hand = this.state.hand;
    	return (hand.indexOf(card) > -1)? true: false;
    }
    
    removeCard(card) {
    	card.setHand(false);
    	var pos = this.state.hand.indexOf(card);
  	  	this.state.hand.splice(pos, 1);
    }
    
    // Get card and add to hand
    addCardToHand(card) {
    	var hand = this.state.hand;
    	hand.push(card);
    	
    	this.setState({'hand': hand});
    }
    
    componentDidMount() {
    	console.log('PlayerComponent componentDidMount');
    }

	render() {
    	return (
    		<div className="player">
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