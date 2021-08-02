import React from 'react';
import ReactDOM from 'react-dom';
import './Card.css'
import PropTypes from 'prop-types';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div> name : {this.props.name} rarity : {this.props.rarity} text : {this.props.text} imageUrl : {this.props.imageUrl} setName : {this.props.setName}</div>;
  }
}

Card.propTypes = {
  name: PropTypes.string
}

export default Card;

