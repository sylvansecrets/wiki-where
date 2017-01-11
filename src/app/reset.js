import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
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

class Reset extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false
    };
    this.handleResetView = this.handleResetView.bind(this);
  }

  handleResetView() {
    this.setState({open: false});
    this.props.reset();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <RaisedButton className="reset-btn" label="reset&nbsp;view" onTouchTap={this.handleResetView}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

Reset.propTypes = {
  reset: React.PropTypes.func.isRequired
};

export default Reset;
