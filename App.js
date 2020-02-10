import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Button, Platform, StatusBar, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppStatusBar from './components/AppStatusBar';
import AppNavigator from './navigation/AppNavigator';
import * as actions from './components/Redux/actions';
import store from './components/Redux/actions';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else if (loggedIn) {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  } else if (!loggedIn) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <Button style={{paddingTop: 200}} title="Log in" onPress={() => setLoggedIn(true)}/>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'fontello-icons': require('./assets/fonts/tabicon.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});



//////////////////////////REDUX TEST////////////////////////
const date = new Date();
import { createStore } from 'redux';
export const ADD_LATEST_PRICE = 'ADD_LATEST_PRICE';

export function addLatestPrice(pair, price) {
  return {
    type: ADD_LATEST_PRICE,
    pair,
    price
  }
}

// fetch('https://api.kraken.com/0/public/AssetPairs')
// .then(res => res.json())
// .then(json => {
//   const pairArr = [];
//   for (let item in json.result) {
//     if (json.result[item].wsname) {
//       pairArr.push(json.result[item].wsname);
//     }
//   }
//   console.log(pairArr);
// });

const ws = new WebSocket('wss://ws.kraken.com');
ws.onopen = () => {
  fetch('https://api.kraken.com/0/public/AssetPairs')
  .then(res => res.json())
  .then(json => {
    const pairArr = [];
    for (let item in json.result) {
      if (json.result[item].wsname) {
        pairArr.push(json.result[item].wsname);
      }
    }
    ws.send(JSON.stringify(
      {
        "event": "subscribe",
        "pair": pairArr,
        "subscription": {
          "name": "ticker"
        }
      }
    ))
    // console.log(pairArr);
  });
}

//reducer
// const initialState = {latestPrices: {}};

// function addPriceReducer(state = initialState, action) {
//   switch (action.type) {
//     case ADD_LATEST_PRICE:
//       return {...state, latestPrices: {...state.latestPrices, [action.pair]: action.price}}
//     default:
//       return state;
//   }
// }

// const store = createStore(addPriceReducer);

// const subscribe = store.subscribe(() => console.log(store.getState()));

// console.log(store);

// store.dispatch(addLatestPrice('BTCUSD', 9500));
// store.dispatch(addLatestPrice('ETHUSD', 200));
// store.dispatch(addLatestPrice('LTCUSD', 120));
// store.dispatch(addLatestPrice('XRPUSD', 0.5));

ws.onmessage = (message) => {
  const data = JSON.parse(message.data);
  if (data[3]) {
    store.dispatch(addLatestPrice(data[3], data[1]['a'][0]));
    console.log(store.getState())
  }
}
