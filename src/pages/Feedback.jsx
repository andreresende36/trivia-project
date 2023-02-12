import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  handleMessage = () => {
    const { assertions } = this.props;
    const mediumScore = 3;
    console.log(assertions);
    if (assertions < mediumScore) {
      return (<span data-testid="feedback-text">Could be better...</span>);
    }
    return (<span data-testid="feedback-text">Well Done!</span>);
  };

  render() {
    return (
      <div>
        <Header />
        { this.handleMessage() }
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
