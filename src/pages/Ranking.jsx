import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <span data-testid="ranking-title">Ranking</span>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Login
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
