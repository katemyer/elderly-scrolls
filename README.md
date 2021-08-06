# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.


### Overview

Using the Axios library for my API call(https://www.npmjs.com/package/axios). Imported the Infinity Scroll component (https://www.npmjs.com/package/react-infinite-scroll-component). The banner header and input+search button use flex while the display of the cards is implemented within the Infinity Scroll. The search functionality, after the user enters "dragon" and clicks search, a call is made to the API which gets all the cards and filters based on the search term to display their desired results. A little message shows when the cards are loading and when the user reaches the end of the scroll, another little message pops up to inform them that they have reached the end of their results. When the user goes to make another search, the cards are cleared out and the process ensues again.

### Refactoring Thoughts

Cards seems like a solid component so I would actually leave it as is. But, within the CardContainer, I would break out the banner with the header, API call, and search functionality into its own components. For the banner with the header, we could potentially make use of this if we were to have different sections for the user to visit rather than the single page. They might want to have a favorites tab to display all their marked favorite cards which ideally would keep the same UI look in the banner. For the API call, a call is made that retrieves all the cards, adding them to a card array, then a filter is to capture the cards that match the user's search entry. I think this may be expensive in the long run if we have a trillion cards so I would implement 

### UI Design

I made the decision to not grid the results because it would impact the way the Infinity Scroll works. I have some commented out code that does show start of grid implementation that I would want to implement in the future. I am pleased with being able to fix the image sizing and apply styling to the text of the card to keep it within the width of the card. Overall, I feel proud of the Infinity Scroll and how it functions while loading more items as well as the end display message when the scrolling is actually done. The overall UI appearance is appealing, minimal, and at a high level, does what the user would expect. 

### Future Work

I would implement tests and the refactoring that I mentioned above. Overall, aside from testing, I think the architecture is quite reasonable while having the promise of breaking it down into more components to leave room for future functionality improvements. I would also make it more useful for the user by adding a "favorites", "delete", and "buy" functionality if we wanted to turn this into an e-commerce site. I would also display pagination in the form of "1, 2, 3, ... next". I would make it more UI cool like add a fire breathing dragon as the background. I would model the app after Yelp's functionality of creating lists to which you can save certain favorite-d cards to and lastly, I would deploy this app. 



