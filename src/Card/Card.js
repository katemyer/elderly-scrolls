import React from 'react';
import ReactDOM from 'react-dom';
import './Card.css'
import PropTypes from 'prop-types';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div> 
        <div><img src={this.props.imageUrl} alt="wizard" width="400" height="600"></img></div>
        <div className='cardName'>{this.props.name} </div>
        <div className='cardRarity'>{this.props.rarity} </div>
        <div className='cardText'>{this.props.text} </div>
        <div className='cardSetName'>{this.props.setName}</div>
      </div>)
  }
}

//at minimum, card should have a name
Card.propTypes = {
  name: PropTypes.string
}

export default Card;