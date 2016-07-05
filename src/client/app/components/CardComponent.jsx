import React from 'react';

import { CardTypes } from './CardTypes.jsx';
/*
 * This Component hold the Card
 */
class CardComponent extends React.Component {
	constructor(props) {
	    super(props);
	    
	    this.setSide('back');
	    
	    this.color = props.color;
	    this.type = props.type;
	    
	    this.props.pos = this.props.key;
	    this.props.isSpecial = this.isSpecial();
	    
	    this.classes = ['card'];
	    
	    // If card is in player hand
	    this.hand = false;
	    
	    this.handleClick = this.handleClick.bind(this);
	}
	
	toString() {
		var stringOutput = [this.type.toLowerCase()];
		if (this.color && this.color != null) {
			stringOutput.push(this.color.toLowerCase());
		}
		return stringOutput.join(', ');
	}
	
	transform() {
		//TODO: Add multiple browser support
		if (this.hand) {
			return "translate(" + -(this.props.zindex * 80) + "px, 0)";
		}
		return "translate(" + -this.props.zindex + "px, " + -this.props.zindex + "px)";
	}
	
    /*
     * Set the side of the card (front or back).
     * Also sets the element classes by type and color if the side is front.
     */
	setSide(newSide) {
	    if (newSide === 'front') {
	    	this.side = 'front';

			if (this.type)
				this.classes.push(this.type.toLowerCase());
			
			if (this.color)
				this.classes.push(this.color.toLowerCase());

	    } else {
	    	this.side = 'back';
	    	this.classes = ['card'];
	    }
    }
    
    isSpecial() {
    	var cardType = CardTypes[this.type];
    	return ('+2' == cardType || '+' == cardType) ? true : isNaN(parseInt(cardType)); 
    }
    
    setHand(inHand) {
    	this.hand = inHand;
    }
    
    /*
     * Check if type is special and add font awesome's class.
     */
    getSpecialChar() {
    	if (!this.props.isSpecial) return;
    	
    	var specialChar = '';
    	switch (this.type) {
    		case 'STOP':
    			specialChar = 'fa-hand-paper-o';
    			break;
    		case 'PLUS':
    			specialChar = 'fa-plus';
    			break;
    		case 'CHANGEDIRECTION':
    			specialChar = 'fa-exchange';
    			break;
    		case 'CHANGECOLOR':
    			specialChar = 'fa-square';
    			break;
    	}
    	
    	return specialChar;
    }
    
    /*
     * Set card position and z-index.
     */
    setPos(position, total, inHand) {
    	var divided = (this.hand == true) ? -1 : 5;
    	this.props.pos = position;
    	this.props.zindex = (total - position) / divided;
    	this.props.key = position;
    }
    
    getClass() {
    	return this.classes.join(' ');
    }
    
    handleClick(handFunction) {
    	this.handleCkick = handFunction;
    }
    
    render() {
    	var card = this;

    	var divStyle = {
    		zIndex: this.props.pos,
    		WebkitTransform: this.transform()
    	};
    	
    	/*
    	 * Check if card needs special tags for font awesome.
    	 */
    	var specialTag = function() {
    		if (!card.props.isSpecial || card.side == 'back' || ['SUPERTAKI', 'TAKI', 'KING'].indexOf(card.type) > -1)
    			return '';
    		
    		var specialClassName = 'fa ' + card.getSpecialChar();
    		if (card.type == 'CHANGECOLOR') {
        		return (
        			<span>
        				<i className={specialClassName} />
        				<i className={specialClassName} />
        				<i className={specialClassName} />
        				<i className={specialClassName} />
        			</span>
        		)
    		}

    		return <i className={specialClassName} />
    	};

    	return (
    		<div style={divStyle} className={this.getClass()} key={this.props.key} onClick={this.handleClick}>
    			<div className={this.side}>
    				{specialTag()}
    			</div>
    		</div>
    	);
    }
}
export default CardComponent;