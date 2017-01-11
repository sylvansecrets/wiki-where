import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {SocialIcon} from 'react-social-icons';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';

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

const {
  FacebookShareButton,
  TwitterShareButton
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

let emoticon = "globe";
let grade = "Hey!";

export default class Summary extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleRequestClose() {
    this.setState({open: false});
  }

  handleNewGame() {
    this.setState({open: false});
    this.props.newGame();
  }

  handleRating() {
    const totalPoints = this.props.playerScore + this.props.scoreToAdd;
    const highScore = 3500;
    const goodScore = 2500;
    const mehScore = 1500;

    if (totalPoints >= highScore) {
      emoticon = "sentiment_very_satisfied";
      grade = "Awesome job!";
    } else if (totalPoints >= goodScore) {
      emoticon = "sentiment_satisfied";
      grade = "Good job!";
    } else if (totalPoints >= mehScore) {
      emoticon = "sentiment_neutral";
      grade = "More practice is needed!";
    } else {
      emoticon = "sentiment_very_dissatisfied";
      grade = "Wow, you're bad!";
    }
  }

  handleTouchTap() {
    this.setState({open: true});
    this.handleRating();
  }

  render() {
    const standardActions = (
      <FlatButton backgroundColor="#CCCCCC" label="New Game" key="2" onTouchTap={this.handleNewGame}/>
    );

    const totalPoints = this.props.playerScore + this.props.scoreToAdd;
    const shareUrl = 'http://0.0.0.0:3000/';
    const title = `I played WikiWhere and got ${totalPoints} points, try to beat me!`;
    const description = 'WikiWhere is a geography trivia game that puts your knowledge about the world to the test.';
    const hashtags = ['WikiWhere'];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <RaisedButton label="Summary" onTouchTap={this.handleTouchTap}/>
          <Dialog title="Final Score" actions={standardActions} modal={false} open={this.state.open}>
            <div className="container border-test">
              <div className="row>">
                <div className="col-sm-4 border-test">
                  <i className="material-icons summary-icon">{emoticon}</i>
                </div>
                <div className="col-sm-8 border-test">
                  {grade} You scored {totalPoints} points on 5 rounds of gameplay. Please play again.<br/>
                  Share your score on social media: <br/>
                  <div className="social-media-group">
                    <FacebookShareButton url={shareUrl} title={title} description={description}>
                      <FacebookIcon round/>
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags}>
                      <TwitterIcon round/>
                    </TwitterShareButton>
                    <SocialIcon url={`mailto:?to=&subject=${title.replace(' ', '%20')}&body=${description.replace(' ', '%20')}`} network="email" style={{height: 64, width: 64}}/>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

Summary.propTypes = {
  newGame: React.PropTypes.func.isRequired,
  playerScore: React.PropTypes.number.isRequired,
  scoreToAdd: React.PropTypes.number.isRequired
};
