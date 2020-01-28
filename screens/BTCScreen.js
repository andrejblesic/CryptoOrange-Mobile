import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import CandleChart from '../components/CandleChart';
import Ticker from '../components/Ticker';
import BuySellExchange from '../components/BuySellExchange';

export default function BTCScreen({navigation}) {
  const [bitcoinPrice, setBitcoinPrice] = useState();

  const sendPrice = (price) => {
    setBitcoinPrice(price);
  }

  return(
    <ScrollView contentContainerStyle={styles.container}>
      <Ticker sendPrice={sendPrice} pair="BTC/USD" />
      <CandleChart pair='BTC/USD' />
      <BuySellExchange />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 20
  },
  tradingOptionsStyle: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8,
    justifyContent: 'space-around'
  },
});
