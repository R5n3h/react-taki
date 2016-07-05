import React from 'react';

export default class GameBarComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		var topCard = (this.props.gameData.topCard != null)? this.props.gameData.topCard.toString() : 'None';
		return (
			<div className="game-bar">
				<p>This is the top card <strong>{topCard}</strong></p>
			</div>
		);
	}
}