import React, {Component} from 'react';
import {Questions} from './questions.js';
import Hint from './hint.js';


export class Trivia extends Component {
  render() {
    return (
      <div className="questions-container">
        <div className="question-describe">
          Which city is being described?
        </div>
        <div className="btn-group btn-div">
          <Hint
            addHint={this.props.addHint}
            hintCount={this.props.stateData.hintCount}
            gameState={this.props.stateData.gameState}
            />
        </div>
          <Questions
            hintCount={this.props.stateData.hintCount}
            questionList={this.props.stateData.questionList}
            newQuestion={this.props.newQuestion}
            gameState={this.props.stateData.gameState}
            />
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
