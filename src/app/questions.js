import React from 'react';
import Question from './question';

export class Questions extends React.Component {

  componentDidUpdate() {
    if (this.props.gameState === 'initial') {
      this.props.newQuestion();
    }
  }

  render() {
    const questionToRender = (this.props.questionList).slice(0, this.props.hintCount);
    console.log(questionToRender);
    return (
      <div>
      {questionToRender.map(question =>
        <Question
          question={question}
          key={question}
          />
      )
    }
      </div>
    );
  }
}

Questions.propTypes = {
  questionList: React.PropTypes.array.isRequired,
  hintCount: React.PropTypes.number.isRequired,
  gameState: React.PropTypes.string.isRequired,
  newQuestion: React.PropTypes.func.isRequired
};
