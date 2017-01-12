import React, {Component} from 'react';
import Hint from './hint.js';

const styles = {
  container: {
    border: '0px solid red',
    borderRadius: '6px',
    display: 'inline-block'
  }
};

export class Player extends Component {

  render() {
    return (
      <div className="player-box">
        <div style={styles.container}>
          ROUND: {this.props.currentRound}/5 <br/>
          SCORE: {this.props.playerScore}
        </div>
        <div className="hint-container">
          <Hint
            addHint={this.props.addHint}
            hintCount={this.props.stateData.hintCount}
            gameState={this.props.stateData.gameState}
            />
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  playerScore: React.PropTypes.number.isRequired,
  currentRound: React.PropTypes.number.isRequired,
  stateData: React.PropTypes.object.isRequired,
  addHint: React.PropTypes.func.isRequired,
};
