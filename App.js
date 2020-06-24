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
  const [pairList, setPairList] = useState();
  const [channelList, setChannelList] = useState([]);
  const [socketOpened, setSocketOpened] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      AppState.addEventListener('change', state => {
        if (state === 'active' && !socketOpened) {
          setupWS();
        } else if (state === 'background') {
          // console.log('background');
        }
      });
      NetInfo.addEventListener(state => {
        if (state.type === 'wifi'|| state.type === 'cellular' && !socketOpened) {
          setupWS();
        } else {
          setSocketOpened(false);
        }
      });
    }, 500);
    fetch('http://5d6317c487b1.ngrok.io/api/v2/transaction-types')
    .then(res => res.json())
    .then(json => {
      // console.log('TRANSACTION TYPES RES', json.transactionTypes);
      const transactionTypes = json.transactionTypes;
      store.dispatch(actions.addTransactionTypes(transactionTypes));
      // setTimeout(() => {
      //   console.log('HERE WE GO', store.getState().transactionTypes);
      // }, 2000)
    })
    .catch(error => {
      console.log(error);
    });
    fetch('http://5d6317c487b1.ngrok.io/api/v2/users/1/transactions')
    .then(res => res.json())
    .then(json => {
      const transactions = json.data.data;
      for (let item of transactions) {
        const date = new Date(item.created_at.replace(' ', 'T'));
        item.timestamp = date.getTime() / 1000;
      }
      store.dispatch(actions.addTransactions(transactions));
    })
    .catch(error => {
      console.log(error);
    });
    fetch('http://5d6317c487b1.ngrok.io/api/v2/users/1')
    .then(res => res.json())
    .then(json => {
      const userInfo = json.data;
      store.dispatch(actions.addUserInfo(userInfo));
    })
    .catch(error => {
      console.log(error);
    });
    fetch('http://5d6317c487b1.ngrok.io/api/v2/users/1/balances')
    .then(res => res.json())
    .then(json => {
      const userBalances = json.data;
      store.dispatch(actions.addUserBalances(userBalances));
    })
    .catch(error => {
      console.log(error);
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
      // setupWS();
    })
    .catch(error => {
      console.log(error);
    });
    setupWS();
  }, []);

  const setupWS = () => {
    if (!socketOpened) {
      const krakenWS = new WebSocket(krakenWSUrl);
      krakenWS.onopen = () => {
        setSocketOpened(true);
        krakenWS.send(JSON.stringify(
          {
            event: "subscribe",
            pair: [
              'BTC/USD',
              'BTC/EUR',
              'BTC/GBP',
              'BTC/ETH',
              'ETH/USD',
              'ETH/EUR',
              'ETH/GBP',
              'ETH/BTC',
              'LTC/USD',
              'LTC/EUR',
              'LTC/BTC',
              'XRP/USD',
              'XRP/EUR',
              'XRP/BTC',
              'ZEC/USD',
              'ZEC/EUR',
              'ZEC/BTC',
              'DASH/USD',
              'DASH/EUR',
              'DASH/BTC'
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
      krakenWS.onclose = () => {
        setSocketOpened(false);
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
