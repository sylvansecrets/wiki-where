import React, {Component} from 'react';
import {Questions} from './questions.js';
import Hint from './hint.js';

const styles = {
  container: {
    border: '0px solid red',
    borderRadius: '6px',
    // display: 'flex',
    // flexDirection: 'column',
    // minWidth: '250px',
    maxHeight: '600px',
    padding: '10px',
    overflowX: 'hidden',
    overflowY: 'auto'
  }
};

export class Trivia extends Component {
  render() {
    return (
      <div>
        <div style={styles.container}>
          Which city is being described?<br/>
          <div>
            <Questions
              hintCount={this.props.stateData.hintCount}
              questionList={this.props.stateData.questionList}
              newQuestion={this.props.newQuestion}
              gameState={this.props.stateData.gameState}
              />
          </div>
        </div>
        <div className="btn-group">
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

Trivia.propTypes = {
  stateData: React.PropTypes.object.isRequired,
  newQuestion: React.PropTypes.func.isRequired,
  addHint: React.PropTypes.func.isRequired,
  setPlayerAnswerCoords: React.PropTypes.func.isRequired
};
