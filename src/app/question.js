import React from 'react';

const styles = {
  container: {
    border: '0px solid red',
    borderBottom: '1px solid white',
    padding: '3px',
    marginBottom: '5px'
  }
};

export default class Question extends React.Component {

  render() {
    return (
      <div className="no-select" style={styles.container}>
        {this.props.question}
      </div>

    );
  }
}

Question.propTypes = {
  question: React.PropTypes.string.isRequired
};
