import React from 'react';
import Reset from './reset.js';

/* eslint-disable */
export default class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="header">
          <i className="material-icons header-icon">public</i>WikiWhere
        </div>
        <div className="reset-btn">
          <Reset reset={this.props.reset}/>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  reset: React.PropTypes.func.isRequired
};
