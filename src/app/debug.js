import React from 'react';

export default class Debug extends React.Component {

  render() {
    return (
      <div>
        <p> answer: {this.props.answer[0]} {this.props.answer[1]} </p>
        <p> playerAnswer: {this.props.playerAnswer[0]} {this.props.playerAnswer[1]}</p>
        <p> score: {this.props.score} </p>

      </div>

    );
  }
}

Debug.propTypes = {
  answer: React.PropTypes.Array,
  playerAnswer: React.PropTypes.Array,
  score: React.PropTypes.number
};
