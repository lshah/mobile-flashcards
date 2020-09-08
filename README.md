# Mobile Flashcards

This is the implementation for the final assessment project for Udacity's React & Redux course. Mobile Flashcards is a React Native mobile application that lets the user create flashcards of questions and answers that help them study any topic of their interest.

## Views

* DeckList - List of flashcard decks
* DeckView - Details of the deck with options to add a card to the deck or start the quiz
* Add Card - Allows the user to add a new flashcard to a deck. Users can enter a question, answer and whether the answer is true or false
* Start Quiz - Allows the user to run through all the questions in a deck, view and submit answers
* Results - User can view final results after answering all questions in a deck

# Project Setup

* project dependencies can be installed with `npm install`
* start the development server with `yarn start --tunnel` to view the application on a simulator

# Other info

The `_DATA.js` file represents a fake database and methods that let you access the data.

This project uses the [Create React Native App](https://github.com/expo/create-react-native-app) to bootstrap the project.
This project also uses [React-native](https://reactnative.dev/) as framework to build the mobile app, [React-Redux](https://react-redux.js.org/) for application state management and [React Router](https://reactrouter.com/web/guides/quick-start) for routing. Emojis are from [Emojipedia](https://emojipedia.org/)