
import React from 'react';
import './CardContainer.css';
import axios from 'axios';
import Card from '../Card/Card';
import InfiniteScroll from 'react-infinite-scroll-component';


// Class name CardContainer
class CardContainer extends React.Component {
    // constructor to initialize the class object
    constructor(props) {
        super(props);
        // define state variables, when states change it re-render the component
        this.state = {
          error: null,
          isLoaded: true,
          // initialize the state variables
          // initialize cards to empty array, so it doesn't display any cards
          cards: [],
          // initialize to true so infinite scroll can scroll
          hasMore: true,
        };
        // initialize class variables to use throughout component
        // setting to null to indicate empty state
        this.userSearchValue = null;
        // setting to 1 to start on page 1
        this.page = 1;
        // setting as empty string so infinity scroll does not show anything
        this.loadingMessage = "";
        // .bind helps to attach to this : https://reactjs.org/docs/faq-functions.html#how-do-i-bind-a-function-to-a-component-instance
        // define function, use function, and don't forget to bind it like below
        this.handleOnClick = this.handleOnClick.bind(this);
        // react state not updating bc of async call, create another fx as prop to call back on  
        this.callBackOnClick = this.callBackOnClick.bind(this);
        this.getCards =  this.getCards.bind(this);
        this.cards = [];
      }
      
    componentDidMount() {
 
    }

    getCards() {
        // setting page size per reqs
        const PAGE_SIZE = 20 ;
        // initialize dynamic page number and saving into variable page
        let page = this.page;
        // saving cards array to variable cards
        const cards = this.cards;
        console.log('what is the infinite scroll library doing? ', page);
        axios.get(`https://api.elderscrollslegends.io/v1/cards?pageSize=${PAGE_SIZE}&page=${page}&name=${this.userSearchValue}`)
            .then((response)=> {
            // console.log("hi" +JSON.stringify(response));
            const cardResults = response.data.cards;
            //logic for when hasMore becomes false to stop scroll
            //if cardResults == page_size, scroll
            if(cardResults.length < PAGE_SIZE ) {
                // block of code to be executed if the condition is true
                this.setState({hasMore: false}); 
              }
            this.setState({cards: cards.concat(cardResults)});
            this.cards = cards.concat(cardResults);
            this.page = page + 1; // todo: update the page #
            // console.log("this.setState", this.setState);
            }).catch(function (error) {
                if(error.response){
                    alert(error.response.status + ":" +error.response.statusText + ":"+ error.response.data )
                }
                console.log("Error" + error);
            })  
    }

    callBackOnClick() {
        this.cards = [];
        const userSearchValue = document.getElementById('searchBarTextField').value.toLowerCase();
        this.userSearchValue = userSearchValue;
        this.loadingMessage = "Hold on, getting more cards...";
        this.getCards();
    }

    handleOnClick() {
        //clear out search results before interacting with API: reset page + reset cards
        this.page = 1;
        // when react state are not updating 
        // https://stackoverflow.com/questions/38558200/react-setstate-not-updating-immediately
        this.setState({cards: [], hasMore: true}, this.callBackOnClick);
    }
  render() {
    const { error, isLoaded, cards } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>IS THIS ONE LOADING?...</div>;
      } else {
        return (
            <div>
                <div className='cardContainer'>
                    <div>
                        ELDER SCROLLS
                    </div>

                    <div className='searchBar'>
                        <input className="searchBarTextField" id="searchBarTextField" type="input"></input>
                        <button className="searchBarButton" id="searchBarButton" onClick={this.handleOnClick}>Search</button> 
                    </div>
                </div>
                <InfiniteScroll
                    dataLength={cards.length}
                    next={this.getCards}
                    hasMore={this.state.hasMore}
                    loader={this.loadingMessage}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                        }
                    className='scrollResults'
                >
                    {cards.map(card => (
                        <Card
                            key={card.name}
                            name={card.name}
                            rarity={card.rarity}
                            text={card.text}
                            setName={card.set.name}
                            type={card.type}
                            imageUrl={card.imageUrl}
                        />
                    ))}
                </InfiniteScroll>
            </div>
        );
        }
    }
} // end class

export default CardContainer;