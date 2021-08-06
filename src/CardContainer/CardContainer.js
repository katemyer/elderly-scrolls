
import React from 'react';
import './CardContainer.css';
import axios from 'axios';
import Card from '../Card/Card';
import InfiniteScroll from 'react-infinite-scroll-component';

class CardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: true,
          cards: [],
          hasMore: true,
        };
        this.userSearchValue = null;
        this.page = 1;
        this.loadingMessage = "";
        this.handleOnClick = this.handleOnClick.bind(this);
        this.getCards =  this.getCards.bind(this);
        this.myFunction = this.myFunction.bind(this);
        this.cards = [];
      }
      
    componentDidMount() {
        console.log("component did mount")
        // this.getCards();
    }

    getCards() {
        const PAGE_SIZE = 20 ;
        let page = this.page;
        const cards = this.cards;
        console.log('what is the infinite scroll library doing? ', page);
        axios.get(`https://api.elderscrollslegends.io/v1/cards?pageSize=${PAGE_SIZE}&page=${page}&name=${this.userSearchValue}`)
            .then((response)=> {
            // console.log("hi" +JSON.stringify(response));
            const cardResults = response.data.cards;
            // console.log('card results', cardResults);
            //logic for when hasMore becomes false to stop scroll
            //if cardResults == page_size, scroll
            if(cardResults.length < PAGE_SIZE ) {
                // block of code to be executed if the condition is true
                this.setState({hasMore: false}); 
              }
            //else cardResults < page_size, stop scroll
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

    myFunction() {
        this.cards = [];
        const userSearchValue = document.getElementById('searchBarTextField').value.toLowerCase();
        // this.setState({userSearchValue: userSearchValue});
        // this.setState((state, props) => ({
        //     userSearchValue: userSearchValue
        //   }));
        this.userSearchValue = userSearchValue;
        console.log("User Search Value:", userSearchValue);
        // axios.get(`https://api.elderscrollslegends.io/v1/cards?pageSize=${PAGE_SIZE}&page=${page}&name=${userSearchValue}`)
        //     .then((response)=> {
        //     console.log("hi" +JSON.stringify(response));
        //     const cardResults = response.data.cards;
        //     const matchedCards = cardResults.filter((card) => { 
        //         let str = card.name.toLowerCase();
        //         return str.search(userSearchValue) !== -1 }
        //         );
        //     console.log("match cards:", matchedCards);
        //     //https://reactjs.org/docs/state-and-lifecycle.html
        //     this.setState({cards: matchedCards});
        //     console.log("this.setState", this.setState);
        //     }).catch(function (error) {
        //         if(error.response){
        //             alert(error.response.status + ":" +error.response.statusText + ":"+ error.response.data )
        //         }
        //         console.log("Error" + error);
            // })  
        this.loadingMessage = "Hold on, getting more cards...";
        this.getCards();
    }

    handleOnClick() {
        //clear out search results before interacting with API: reset page + reset cards
        this.page = 1;
        this.setState({cards: [], hasMore: true}, this.myFunction);
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
                    <div className='bannerTitle'>
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

//to do
    //display cards in a proper way with css
    //currently a list, use a grid