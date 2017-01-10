import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
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

class New extends Component {
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

  handleTouchTap() {
    this.setState({open: true});
  }

  render() {
    const standardActions = [
      <FlatButton label="Cancel" key="1" onTouchTap={this.handleRequestClose}/>,
      <FlatButton label="Ok" key="2" onTouchTap={this.handleNewGame}/>
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <RaisedButton backgroundColor="#CCCCCC" label="new&nbsp;game" onTouchTap={this.handleTouchTap}/>
          <Dialog title="Are you sure you want to start a new game?" actions={standardActions} modal={false} open={this.state.open}>
            test
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

New.propTypes = {
  newGame: React.PropTypes.func.isRequired
};

export default New;
