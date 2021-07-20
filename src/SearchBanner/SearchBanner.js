
import React from 'react';
import ReactDOM from 'react-dom';
import './SearchBanner.css';
import axios from 'axios';

class SearchBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: true,
          cards: []
        };
      }
      
    // componentDidMount() {
    
    // }

    handleOnClick() {
        console.log("Hello World");
        //get search value from input field
        const userSearchValue = document.getElementById('searchBarTextField').value.toLowerCase();
        console.log("User Search Value:", userSearchValue);
        //call this API: https://api.elderscrollslegends.io/v1/cards
        axios.get('https://api.elderscrollslegends.io/v1/cards')
            .then((response)=> {
            console.log("hi" +JSON.stringify(response));
            //grab results from response (array of cards)
            const cardResults = response.data.cards;
            //create matchedCards = []
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            const matchedCards = cardResults.filter((card) => { 
                let str = card.name.toLowerCase();
                return str.search(userSearchValue) != -1 } 
                );
            console.log("match cards:", matchedCards);
            //loop thru cards
                //check if userSearchValue == card.name
                //true: push to matchedCards []
                //false: skips
            
            // function myFunction(card) {
            //     //string search card name + lowercase
            //     let str = card.name.toLowerCase();
            //     return str.search(userSearchValue) != -1
            // }
            }).catch(function (error) {
                if(error.response){
                    alert(error.response.status + ":" +error.response.statusText + ":"+ error.response.data )
                }
                console.log("Error" + error);
            })  

        
        
    }
  render() {
    const { error, isLoaded, cards } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <div>
                <div className='searchBanner'>
                <div className='bannerTitle'>
                    ELDER SCROLLS
                </div>

                <div className='searchBar'>
                    <input className="searchBarTextField" id="searchBarTextField" type="input"></input>
                    <button className="searchBarButton" id="searchBarButton" onClick={this.handleOnClick}>Search</button> 
                </div>
            </div>
                <div>
                    <ul>
                        {cards.map(card => (
                            <li key={card.name}>
                            name : {card.name} rarity : {card.rarity}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
        }
    }
} // end class

export default SearchBanner;