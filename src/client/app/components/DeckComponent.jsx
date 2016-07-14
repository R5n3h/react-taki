import React from 'react';

import CardComponent from './CardComponent.jsx';
import { CardTypes } from './CardTypes.jsx';
import { CardColors } from './CardColors.jsx';

export default class DeckComponent extends React.Component {
  constructor(props) {
    super(props);

    this.game = this.props.handleGame;
    
    this.cards = [];
    this.pile = [];
    
    this.createCards();
    
    this.state = {
    	cards: this.cards,
    	pile: this.pile
    }
    
    // Return DeckComponent to Game
    this.props.handleDeck(this);
  }
  
  createCards() {
	  var cards = this.cards;
	  var game = this.game;
	  
	  var pos = 112;
	  for (var type in CardTypes) {
		  if (CardTypes[type] != CardTypes.CHANGECOLOR && CardTypes[type] != CardTypes.KING && CardTypes[type] != CardTypes.SUPERTAKI) {
			  for (var color in CardColors) {
				  if (CardColors[color] != CardColors.NONE) {
					  cards.push(new CardComponent({color: color, type: type, key: pos-1, game: game}));
					  cards.push(new CardComponent({color: color, type: type, key: pos-2, game: game}));
					  pos -= 2;
				  }
			  }
		  }
	  }
	  
	  for (var i = 0; i < 2; i++) {
		  cards.push(new CardComponent({type: CardTypes.KING, color: CardColors.NONE, key: Math.random(), game: game}));
		  cards.push(new CardComponent({type: 'SUPERTAKI', color: CardColors.NONE, key: Math.random(), game: game}));
		  pos -= 2;
	  }
	  
	  for (var i = 0; i < 4; i++) {
		  cards.push(new CardComponent({type: 'CHANGECOLOR', color: CardColors.NONE, key: pos, game: game}));
		  pos--;
	  }
	  this.cards = cards;

	  this.reshuffle();
  }
  
  addCard(card) {
	  var pos = Math.floor((Math.random() * this.cards.length) + 1);
	  this.cards.splice(pos, 0, card);
  }
  
  addCardToPile(card) {
		card.setSide('front');

		// Add card to open cards
		this.state.pile.push(card);
  }

  /*
   * Draw card. Get the first card and remove it from cards.
   */
  drawCard() {
	  var card = this.cards.pop();
	  return card;
  }
    
  reshuffle() {
	  for (var i = this.cards.length - 1; i > 0; i--) {
		  var j = Math.floor(Math.random() * (i + 1));
		  var temp = this.cards[i];
		  this.cards[i] = this.cards[j];
		  this.cards[j] = temp;
	  }
  }
  
  componentWillMount() {
	  this.setState({cards: this.cards, pile: this.pile});
  }
  
  render() {
	  return (
		<div className="deck">
			<div className="cards-container">
				<div className="cards">
					{ this.state.cards.map(function(item, index, arr) {
						item.setPos(index, arr.length);
						return item.render();
					}) }
				</div>
				<div className="cards pile">
					{ this.state.pile.map(function(item, index, arr) {
		        		item.setPos(index, arr.length);
		        		return item.render();
		        	}) }
		        </div>
		    </div>
		</div>
    );
  }
}

DeckComponent.propTypes = {
	  handleDeck: React.PropTypes.func,
	  handleTopCard: React.PropTypes.func
};