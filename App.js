import { AppLoading, registerRootComponent  } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Button, Platform, StatusBar, StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppStatusBar from './components/AppStatusBar';
import AppNavigator from './navigation/AppNavigator';
import * as actions from './components/Redux/actions';
import store from './components/Redux/actions';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedInterval, setSelectedInterval] = useState(15);
  const [previousInterval, setPreviousInterval] = useState();
  const [krakenWS] = useState(new WebSocket('wss://ws.kraken.com'));
  const [pairList, setPairList] = useState();
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    krakenWS.onopen = () => {
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
      });
    }
  }, []);

  useEffect(() => {
    if (krakenWS.readyState === 1) {
      if (previousInterval) {
        krakenWS.send(JSON.stringify(
          {
            event: "unsubscribe",
            pair: ['BTC/USD', 'ETH/USD', 'BTC/EUR', 'ETH/EUR', 'LTC/USD', 'DASH/USD', 'XRP/USD'],
            subscription: {
              name: 'ohlc',
              interval: Number(previousInterval)
            }
          }
        ));
      }
      setTimeout(() => {
        krakenWS.send(JSON.stringify(
          {
            event: "subscribe",
            pair: ['BTC/USD', 'ETH/USD', 'BTC/EUR', 'ETH/EUR', 'LTC/USD', 'DASH/USD', 'XRP/USD'],
            subscription: {
              name: "ohlc",
              interval: Number(selectedInterval)
            }
          }
        ));
      }, 500);
    }
    krakenWS.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data[3]) {
        // setChannelList(channelList && channelList.indexOf(data[0]) === -1 ? channelList.push(data[0]) : channelList);
        store.dispatch(actions.addLatestPrice(data[3], data[1]));
      }
    }
    setPreviousInterval(selectedInterval);
  }, [selectedInterval, pairList]);

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
        <AppNavigator screenProps={{setSelectedInterval: setSelectedInterval}} />
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
