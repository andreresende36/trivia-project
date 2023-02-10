import PropTypes from "prop-types"
import React, { Component } from 'react';
import getQuestions from './../services/apiTriviaQuestions';
import { deleteToken } from '../services/localStorage';
import { connect } from 'react-redux';
import Header from '../components/Header';

 
class Game extends Component {
  state = {
    questions: [],
  }

  componentDidMount() {
    const { questions, history } = this.props;
    if(questions.reload) {
      deleteToken();
      history.push('/');
    }
  };

   render() {
     return (
       <div>
        <Header />
       </div>
     )
   }
 };

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  questions: PropTypes.shape({
    reload: PropTypes.bool.isRequired,
  })
}
 
 const mapStateToProps = (state) => ({
  questions: state.questions,
 });

 export default connect(mapStateToProps)(Game);