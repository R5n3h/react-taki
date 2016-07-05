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
		this.setState({gameState: 1});
	}
	
	render() {
		return (
			<div className="taki-game">
				<DeckComponent handleDeck={this.handleDeck.bind(this)} handleTopCard={this.handleTopCard.bind(this)} />
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