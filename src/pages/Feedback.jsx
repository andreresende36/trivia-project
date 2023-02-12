import React, { Component } from 'react';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <span
          data-testid="feedback-text"
        >
          Aqui tem a mensagem de feedback a fazer no requisito 13
        </span>
      </div>
    );
  }
}
