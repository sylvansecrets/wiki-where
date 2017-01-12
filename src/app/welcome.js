import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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

class Welcome extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: true
    };
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

  render() {
    const standardActions = [
      <FlatButton label="start" key="1" onTouchTap={this.handleNewGame}/>
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Dialog title="Welcome to WikiWhere" actions={standardActions} modal={false} open={this.state.open}>
            <p>This game is designed to test your knowledge about major cities and their geographical location. There will be 5 rounds of trivia with scoring based on how close you are to the city center and how many hints are used.</p>
            <div className="welcome-modal-col">
              <i className="material-icons modal-globe-icon">public</i><i className="material-icons">swap_horiz</i>
              <p>Drag to move on the globe</p>
            </div>
            <div className="welcome-modal-col">
              <i className="material-icons modal-globe-icon">public</i><i className="material-icons">zoom_in</i>
              <p>Pinch, use the mouse scroll wheel, or drag with the right mouse button to zoom</p>
            </div>
            <div className="welcome-modal-col">
              <i className="material-icons modal-globe-icon">public</i><i className="material-icons">touch_app</i>
              <p>Click or tap on the globe to make your guess, and then submit it!</p>
            </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

Welcome.propTypes = {
  newGame: React.PropTypes.func.isRequired
};

export default Welcome;
