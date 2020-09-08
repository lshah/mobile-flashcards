import { AsyncStorage } from 'react-native';

const FLASHCARDS_STORAGE_KEY = 'flashcards: decks';

const initialData = {
    ReactJS: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
          correctAnswer: 'true'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
          correctAnswer: 'true'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
          correctAnswer: 'true'
        }
      ]
    }
  }
  
  export const getData = () => {
    return initialData
  }

  export const getDecks = () => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
      if(results === null){
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(initialData))
        return initialData
      } else {
        return JSON.parse(results)
      }
    })
  }

  export const saveDeckTitle = (title) => {
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      }
    }))
  }

  export const addCardToDeck = (name, card) => {
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      results[name].questions.push(card)
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(results))
        return results
    })
  }