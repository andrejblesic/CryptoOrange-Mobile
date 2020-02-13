import { AppLoading, registerRootComponent  } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  AppState,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppStatusBar from './components/AppStatusBar';
import AppNavigator from './navigation/AppNavigator';
import * as actions from './Redux/actions';
import store from './Redux/reducer';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

const krakenWSUrl = 'wss://ws.kraken.com';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  // const [krakenWS, setKrakenWS] = useState(new WebSocket(krakenWSUrl));
  const [pairList, setPairList] = useState();
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (state.type !== 'none') {
        setupWS();
      }
    });
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        setupWS();
      } else if (state === 'background') {
        console.log('background');
      }
    })
    fetch('https://api.kraken.com/0/public/AssetPairs')
    .then(res => res.json())
    .then(json => {
      const pairArr = [];
      for (let item in json.result) {
        if (json.result[item].wsname) {
          pairArr.push(json.result[item].wsname);
        }
      }
      setPairList(pairArr);
      setupWS();
    });
  }, []);

  const setupWS = () => {
    const krakenWS = new WebSocket(krakenWSUrl);
    krakenWS.onopen = () => {
      krakenWS.send(JSON.stringify(
        {
          event: "subscribe",
          pair: [
            'BTC/USD',
            'BTC/EUR',
            'BTC/GBP',
            'ETH/USD',
            'ETH/EUR',
            'ETH/GBP',
            'ETH/BTC',
            'LTC/USD',
            'LTC/EUR',
            'LTC/BTC',
            'DASH/USD',
            'DASH/EUR',
            'DASH/BTC',
            'XRP/USD',
            'XRP/EUR',
            'XRP/BTC',
            'ZEC/USD',
            'ZEC/EUR',
            'ZEC/BTC'
          ],
          subscription: {
            name: 'ticker',
          }
        }
      ));
    }
    krakenWS.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data[3]) {
        store.dispatch(actions.addLatestPrice(data[3], data[1]));
      }
    }
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <Provider store={store}>
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => handleFinishLoading(setLoadingComplete)}
        />
      </Provider>
    );
  } else if (!loggedIn) {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }

  // else if (!loggedIn) {
  //   return (
  //     <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
  //       <Button style={{paddingTop: 200}} title="Log in" onPress={() => setLoggedIn(true)}/>
  //     </View>
  //   );
  // }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'fontello-icons': require('./assets/fonts/tabicon.ttf'),
      'icomoon': require('./assets/fonts/icomoon.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
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
