import {MAX_HINT, MAX_QUESTION} from '../main.js';
import update from 'immutability-helper';
import parseWikiResponse from './parser.js';
import {distance, distToAnswer} from './score.js';
const Promise = require('bluebird');

export function setPlayerAnswerCoords(coordinates) {
  this.setState({
    data: update(this.state.data,
      {
        playerAnswer: {$set: coordinates},
        gameState: {$set: 'answering'}
      })
  });
}

export function flewHome() {
  this.setState({
    data: update(this.state.data,
      {
        flyHomeSwitch: {$set: false}
      })
  });
}

export function addHint() {
  console.log('Adding a new Hint');
  console.log(this.state.data);
  if (this.state.data.hintCount >= MAX_HINT) {
    console.warn('Number of hints already at maximum');
    return;
  }
  this.setState({
    data: update(this.state.data, {hintCount: {$set: this.state.data.hintCount + 1}})
  });
}

export function newQuestion(difficulty = 'easy') {
  console.log('fetching new questions');
  console.log(`On the ${this.state.data.questionCount} question`);
  if (this.state.data.questionCount >= MAX_QUESTION) {
    console.warn(`The game ends at ${MAX_QUESTION} questions`);
    return;
  }
  if (this.state.data.gameState !== 'answered' && this.state.data.gameState !== 'initial') {
    console.warn(`${this.state.data.gameState} is the wrong game state for adding questions`);
    return;
  }
  return generateQuestion(difficulty)
    .then(questionObj => {
      if (this.state.data.usedCities.includes(questionObj.cityString)) {
        return generateQuestion(difficulty);
      }
      this.setState({
        data: update(
          this.state.data,
          {
            gameState: {$set: 'questioning'},
            flyHomeSwitch: {$set: true},
            questionList: {$set: questionObj.parsedQuestions},
            questionCount: {$set: this.state.data.questionCount + 1},
            hintCount: {$set: 1},
            answer: {$set: questionObj.answerLocation},
            answerCity: {$set: questionObj.cityString},
            score: {$set: this.state.data.scoreToAdd + this.state.data.score},
            scoreToAdd: {$set: 0},
            currentDistance: {$set: 0},
            usedCities: {$push: [questionObj.cityString]}
          }
        )
      });
    });
}

function generateQuestion(difficulty) {
  console.log('fetching new questions');
  let answerLocation;
  let cityString;
  let city;
  return randomCity(difficulty)
    .then(cityName => {
      cityString = cityName.join(', ');
      city = cityName[0];
      return;
    })
    .then(() => {
      return googleLocation(cityString);
    })
    .then(locationResponseObj => {
      answerLocation = locationResponseObj;
      return;
    })
    .then(() => {
      return wikiTextFetch(city);
    })
    .then(responseObj => {
      console.log(responseObj.query);
      return parseWikiResponse(responseObj);
    })
    .then(parsedString => {
      const parsedQuestions = parsedString.slice(0, 4);
      console.log('at location', answerLocation);
      if (parsedString.length === 0) {
        return generateQuestion(difficulty);
      }
      return {
        answerLocation,
        cityString,
        parsedQuestions
      };
    });
}

export function newGame(difficulty = 'easy') {
  console.log(difficulty);
  this.setState({
    data: update(
      this.state.data,
      {
        gameState: {$set: 'initial'},
        questionCount: {$set: 0},
        score: {$set: 0},
        scoreToAdd: {$set: 0},
        usedCities: {$set: []}
      })
  });
}

export function reset() {
  this.setState({
    data: update(this.state.data,
      {
        flyHomeSwitch: {$set: true},
        gameState: {$set: 'questioning'}
      })
  });
}

export function submitGuess() {
  if (this.state.data.gameState !== 'answering') {
    console.warn("You can't submit answers when you have not placed your answer");
    return;
  }
  const dist = distance(this.state.data.playerAnswer, this.state.data.answer);
  const points = distToAnswer(dist, this.state.data.hintCount);
  let gameState = 'answered';
  if (this.state.data.questionCount >= MAX_QUESTION) {
    gameState = 'end';
  }
  this.setState({
    data: update(this.state.data,
      {
        scoreToAdd: {$set: points},
        currentDistance: {$set: dist},
        gameState: {$set: gameState}
      })
  });
}

function wikiTextFetch(cityName) {
  return (
    window.$.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {
        action: 'query',
        titles: cityName,
        prop: 'extracts',
        format: 'json'
      }
    })
  );
}

function googleLocation(cityName) {
  console.log('locating', cityName);
  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({address: cityName}, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const answerLocation = [results[0].geometry.location.lng(), results[0].geometry.location.lat()];
        resolve(answerLocation);
      } else {
        reject(status);
      }
    });
  });
}

function randomCity(difficulty) {
  const easyCities = require('../../assets/easyCity.json');
  if (difficulty === 'easy') {
      // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      const selectedCity = easyCities[Math.floor(Math.random() * easyCities.length)];
      resolve(selectedCity);
    });
  }
}
