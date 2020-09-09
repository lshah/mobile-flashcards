import React, { Component } from "react";
import { View, Platform, StatusBar, Text } from "react-native";
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckView from './components/DeckView';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { black, white, gray } from './utils/colors';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore } from 'redux';
import { setLocalNotification } from './utils/helpers';
import { activateKeepAwake } from "expo-keep-awake";

const RouteConfigs = {
  DeckList:{
    name: "Decks",
    component: DeckList,
  }, 
  AddDeck:{
    component: AddDeck,
    name: "Add Deck",
  }
}

const Tab = Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialBottomTabNavigator();

const TabNav = () =>(
  <Tab.Navigator 
  initialRouteName="Home"
  activeColor={white}
  inactiveColor={gray}
  barStyle={{ backgroundColor: black, paddingBottom: 20}}
  >
      <Tab.Screen {...RouteConfigs['DeckList']} />
      <Tab.Screen {...RouteConfigs['AddDeck']} />
  </Tab.Navigator>
)

const StackNavigatorConfig = {
  headerMode: "screen"
}
const StackConfig = {
  TabNav:{
    name: "Home",
    component: TabNav,
    options: {headerShown: false}
  }, 
  DeckView:{
    name: "DeckView",
    component: DeckView,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black,
      },
      title: "Deck View"
    }
  },
  AddCard:{
    name: "AddCard",
    component: AddCard,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black,
      },
      title: "Add Card"
    }
  },
  Quiz:{
    name: "Quiz",
    component: Quiz,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black,
      },
      title: "Quiz"
    }
  }
}
const Stack = createStackNavigator();
const MainNav = () =>(
  <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['DeckView']} />
    <Stack.Screen {...StackConfig['AddCard']} />
    <Stack.Screen {...StackConfig['Quiz']} />
  </Stack.Navigator>
)


export default class App extends Component {

  componentDidMount(){
    setLocalNotification();
    activateKeepAwake();
  }

  render(){
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <View style={{flex: 1}}>
            <Text style={{ fontSize: 20, textAlign: 'center', margin: 20 }}>Mobile Flashcards App</Text>
          <StatusBar barStyle="light-content" backgroundColor={black} />
            <MainNav />
          </View>
        </NavigationContainer>
      </Provider>
    )
  }
}