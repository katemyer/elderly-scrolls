
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
          page: 1,
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.getCards =  this.getCards.bind(this);
      }
      
    componentDidMount() {
        console.log("component did mount")
        this.getCards();
    }

    getCards() {
        const PAGE_SIZE = 20;
        let page = this.state.page;
        const cards = this.state.cards;
        console.log('what is the infinite scroll library doing? ', page);
        axios.get(`https://api.elderscrollslegends.io/v1/cards?pageSize=${PAGE_SIZE}&page=${page}`)
            .then((response)=> {
            // console.log("hi" +JSON.stringify(response));
            const cardResults = response.data.cards;
            console.log('card results', cardResults);
        
            this.setState({cards: cards.concat(cardResults), page: page++}); // todo: update the page #
            console.log("this.setState", this.setState);
            }).catch(function (error) {
                if(error.response){
                    alert(error.response.status + ":" +error.response.statusText + ":"+ error.response.data )
                }
                console.log("Error" + error);
            })  
    }
    handleOnClick() {
        console.log("Hello World");
        let page = this.state.page;
        // TODO add params to search function, too!
        const PAGE_SIZE = 20;
        const userSearchValue = document.getElementById('searchBarTextField').value.toLowerCase();
        console.log("User Search Value:", userSearchValue);
        //call this API: https://api.elderscrollslegends.io/v1/cards&name=dragon (for example)
        // TODO inspect parameters and make sure name, pageSize, page
        axios.get(`https://api.elderscrollslegends.io/v1/cards?pageSize=${PAGE_SIZE}&page=${page}&name=${userSearchValue}`)
            .then((response)=> {
            console.log("hi" +JSON.stringify(response));
            const cardResults = response.data.cards;
            const matchedCards = cardResults.filter((card) => { 
                let str = card.name.toLowerCase();
                return str.search(userSearchValue) !== -1 }
                );
            console.log("match cards:", matchedCards);
            //https://reactjs.org/docs/state-and-lifecycle.html
            this.setState({cards: matchedCards});
            console.log("this.setState", this.setState);
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
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
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