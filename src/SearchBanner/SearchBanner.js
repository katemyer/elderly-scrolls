
import React from 'react';
import ReactDOM from 'react-dom';
import './SearchBanner.css'

class SearchBanner extends React.Component {
  render() {
    return (
        <div className='searchBanner'>
            <div className='bannerTitle'>
                ELDER SCROLLS
            </div>
            <div className='searchBar'>
                <input class="searchBarTextField" id="searchBarTextField" type="input" value="Enter Search"></input>
                <button class="searchBarButton" id="searchBarButton" type="button">Search</button> 
            </div>
        </div>
    );
    
    
  }
}

export default SearchBanner;