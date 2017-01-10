import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Summary from './summary.js';

const styles = {
  container: {
    textAlign: 'center'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

export default class Submit extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.setState({open: false});
    this.props.newQuestion();
  }

  handleTouchTap() {
    this.setState({open: true});
    this.props.onHandleGuess();
  }

  componentWillReceiveProps() {
    // console.log("currentRound", this.props.currentRound);
    if (this.props.currentRound === 0) {
      this.setState({open: false});
    }
  }

  render() {
    const standardActions = (
      <FlatButton className="modal-dialog-color" label="next" key="1" onTouchTap={this.handleRequestClose}/>
    );

    const roundCheck = (this.props.currentRound < 5);

    const result = (
      <div className="test-box">
        <h3>Results</h3>
        Answer: {this.props.answerCity}<br/>
        Distance off by: {Math.round(this.props.currentDistance)} km <br/>
        You scored {this.props.scoreToAdd} points on this round!
      </div>
    );

    const roundScore = (
      <Dialog contentClassName="dialogRadiusHack" overlayClassName="modal-bg" actions={standardActions} modal={false} open={this.state.open}>
        {result}
      </Dialog>
    );

    const finalRound = (
      <Dialog contentClassName="dialogRadiusHack" overlayClassName="modal-bg" modal={false} open={this.state.open}>
        {result}<br/>
        <Summary newGame={this.props.newGame} playerScore={this.props.playerScore} scoreToAdd={this.props.scoreToAdd}/>
      </Dialog>
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <RaisedButton label="submit" disabled={this.props.gameState !== 'answering'} onTouchTap={this.handleTouchTap}/>
            {roundCheck ? roundScore : finalRound}
        </div>
      </MuiThemeProvider>
    );
  }
}

Submit.propTypes = {
  onHandleGuess: React.PropTypes.func.isRequired,
  scoreToAdd: React.PropTypes.number.isRequired,
  currentDistance: React.PropTypes.number.isRequired,
  answerCity: React.PropTypes.string.isRequired,
  gameState: React.PropTypes.string.isRequired,
  currentRound: React.PropTypes.number.isRequired,
  newGame: React.PropTypes.func.isRequired,
  playerScore: React.PropTypes.number.isRequired,
  newQuestion: React.PropTypes.func.isRequired
};
