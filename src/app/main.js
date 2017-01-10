import React, {Component} from 'react';
// import {Header} from './header';
import Alkali from './cesium.js';
import {Player} from './player-box.js';
import {Trivia} from './trivia.js';
import Submit from './submit.js';
import Welcome from './welcome.js';

//eslint-disable-next-line
import {addHint, newQuestion, setPlayerAnswerCoords, newGame, submitGuess, flewHome} from './actions/stateActions.js';

export const MAX_HINT = 3;
export const MAX_QUESTION = 5;

export class Main extends Component {
  constructor(props) {
    super(props);
    /*
    the state will contain
    gameState -> one of 'uninitiated', 'initial', 'questioning', 'answering', 'answered', 'end'
    questionList -> [String] of length MAX_HINT
    currentDistance -> distance the guess is from the answer, in kilometers
    hintCount -> int between 0, MAX_HINT
    score -> int representing the current score
    difficulty -> one of 'easy', 'hard'
    answer -> coordinates in the format [longitude, latitude]
    playerAnswer -> coordiates in the format [longitude, latitude]
    answerCity -> String of city name
    */
    this.state = {
      data: {
        gameState: 'uninitiated',
        flyHomeSwitch: false,
        questionList: ['Question 1', 'Question 2', 'Question 3'],
        scoreToAdd: 0,
        currentDistance: 0,
        playerAnswer: [0.0, 0.0],
        answer: [45.0, 45.0],
        answerCity: 'None',
        questionCount: 0,
        hintCount: 0,
        score: 0,
        difficulty: 'easy'
      },
      open: true
    };
    this.addHint = addHint.bind(this);
    this.newQuestion = newQuestion.bind(this);
    this.setPlayerAnswerCoords = setPlayerAnswerCoords.bind(this);
    this.handleGuess = submitGuess.bind(this);
    this.newGame = newGame.bind(this);
    this.flewHome = flewHome.bind(this);
  }

  render() {
    return (
      <div>
        <Welcome newGame={this.newGame} newQuestion={this.newQuestion}/>
        <div className="globe">
          <Alkali
            setPlayerAnswerCoords={this.setPlayerAnswerCoords}
            playerAnswerCoords={this.state.data.playerAnswer}
            correctAnswerCoords={this.state.data.answer}
            gameState={this.state.data.gameState}
            flyHomeSwitch={this.state.data.flyHomeSwitch}
            flewHome={this.flewHome}
            />
        </div>
        <div className="header">
          <h1>Wiki Where</h1>
        </div>
        {/* <Header/> */}
        <div className="main row">
          <div>
            <Player
              playerScore={this.state.data.score}
              currentRound={this.state.data.questionCount}
              />
            <Trivia
              stateData={this.state.data}
              addHint={this.addHint}
              newQuestion={this.newQuestion}
              setPlayerAnswerCoords={this.setPlayerAnswerCoords}
              />
          </div>
        </div>
        <div className="submit-btn">
          <Submit
            onHandleGuess={this.handleGuess}
            scoreToAdd={this.state.data.scoreToAdd}
            answerCity={this.state.data.answerCity}
            currentDistance={this.state.data.currentDistance}
            gameState={this.state.data.gameState}
            newQuestion={this.newQuestion}
            currentRound={this.state.data.questionCount}
            newGame={this.newGame}
            playerScore={this.state.data.score}
            />
        </div>
      </div>
    );
  }
}
