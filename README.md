# Supplies Tracker Front-end

A PoC front-end for an app that tracks the availability of different types of supplies. Originally intended for art supplies, but can be used for anything.

![ST_Collection_List](https://github.com/YoanaIvanova/suppliestracker-reactjs/assets/15999515/d0a8cc2d-e4aa-4248-8633-edbd8e45b8bc)

For demo purposes, all data is saved in `localStorage`.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Building and Running the Front-end App

To run the app locally, you will need to:

1. Navigate to the root project directory.
2. Run the `npm install` command to install all relevant dependencies.
3. Run the `npm start` command to start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Demo Screens

The app allows you to create collections of items. You will have access to a detailed screen for each collection, showing all items within it:

![ST_Collection_Details](https://github.com/YoanaIvanova/suppliestracker-reactjs/assets/15999515/fa52ec9e-ed9c-4314-aca8-4bd86f73ca4c)

You can perform CRUD operations on both collections and their items.

A search & filter functionality is also implemented on the collection/item list pages.

## TODOs
- Pagination for collection items
- Marking items as "favorites"
- Creating a wishlist and adding items to wishlists
- Integration with a back-end via REST
