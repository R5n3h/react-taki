import React from 'react';
import {render} from 'react-dom';
import * as Utils from './utils.jsx'
import DeckComponent from './components/DeckComponent.jsx'
import PlayerComponent from './components/PlayerComponent.jsx'
import GameBarComponent from './components/GameBarComponent.jsx'
import PlayersComponent from './components/PlayersComponent.jsx'

class TakiGame extends React.Component {
	constructor(props) {
		super(props);

		this.deck = null;

		this.state = {
			config: props.config || [],
			deck: this.deck,
			topCard: null,
			gameState: 0, // 0 - NotStarted
		  
		    // current game properties
		    inTaki: false,
		    plusTwo: 0,
		    gameReversed: false,
		      
		    players: [],
		    currentPlayerIndex: -1
		};
		
		this.startingCardsNumber = 8;
	}
	
	addPlayer(player) {
		var players = this.state.players;
		players.push(player);
		this.setState({players: players});
	}
	
	handleTopCard(card) {
		this.setState({ topCard: card });
		this.deck.addCardToPile(card);
	}
	
	handleDeck(deck) {
		this.deck = deck;
	}
	
	toggleGame() {
		if (this.state.gameState == 0) {
			this.startGame();
		}
		else if (this.state.gameState == 1) {
			this.stopGame();
		}
	}
	
	stopGame() {
		console.log('Game over!');

		// Set game state to 2 (Finished)
		this.setState({gameState: 2});
	}

	startGame() {
		var game = this;
		var players = this.state.players;
		var ronPlayer = new PlayerComponent({key: 1, game: game, config: { name: "Ron Sneh", type: 'Human'}});

		// Draw cards for players
		for (var i = 0; i < this.startingCardsNumber; i++) {
			ronPlayer.addCardToHand(this.deck.drawCard())
		}
		
		this.addPlayer(ronPlayer);

		var _topCard = this.state.topCard;
		while (_topCard == null) {
			var _topCard = this.deck.drawCard();
			if (_topCard.isSpecial()) {
				this.deck.addCard(_topCard);
				_topCard = null;
			}
		}
		this.handleTopCard(_topCard);
		
		// Set game state to 1 (Started)
		this.setState({gameState: 1, currentPlayerIndex: 0});
	}
	
	isCardAllowed(card) {
		var topCard = this.state.topCard;
		
		if (this.state.gameState != 1) return false;

        if (this.state.plusTwo > 0) {
            return card.type == 'TWOPLUS';
        }
        else if (this.state.inTaki) {
            // In Taki, only cards of the same color are allowed
            return card.color == thistopCard.color;
        }

        return (card.type == 'CHANGECOLOR') ||
            (card.type == topCard.type) ||
            (card.color == topCard.color);
	}
	
	getCurrentPlayer() {
		if (this.state.currentPlayerIndex == -1) return;
		
		var players = this.state.players;
		return players[this.state.currentPlayerIndex]
	}
	
	playCard(card) {
		var currentPlayer = this.getCurrentPlayer();
		var topCard = this.state.topCard;

		if (this.isCardAllowed(card) && currentPlayer.hasCard(card) 
				|| card.type == 'CHANGECOLOR' && currentPlayer.hasChangedColor()) {
			if (card.type == 'CHANGECOLOR') {
				console.log(this.state.inTaki);
				if (this.state.inTaki && card.color != topCard.color) {
					card.color = topCard.color;
				}
				else if (card.color == 'NONE') {
					// Card must have a color
					console.log('Card doesnt has color');
					return false;
				}
			}
			
			currentPlayer.removeCard(card);
			this.handleTopCard(card);
		}
	}
	
	render() {
		return (
			<div className="taki-game">
				<DeckComponent handleDeck={this.handleDeck.bind(this)} handleTopCard={this.handleTopCard.bind(this)} handleGame={this} />
				<GameBarComponent gameData={this.state} />
				<PlayersComponent players={this.state.players} />
				{ this.state.gameState in [1,0] ?
						<button onClick={this.toggleGame.bind(this)}>{this.state.gameState == 0 ? 'Start' : 'Stop'}</button> : null
				}
			</div>
			);
		}
	}

render(
  <TakiGame />, 
  document.getElementById('app')
);