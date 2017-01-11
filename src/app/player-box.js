import React, {Component} from 'react';

const styles = {
  container: {
    border: '0px solid red',
    borderRadius: '6px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    padding: '10px'
  }
};

export class Player extends Component {

  render() {
    return (
      <div style={styles.container}>
        ROUND: {this.props.currentRound}/5 <br/>
        SCORE: {this.props.playerScore}
      </div>
    );
  }
}

Player.propTypes = {
  playerScore: React.PropTypes.number.isRequired,
  currentRound: React.PropTypes.number.isRequired
};
