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
  View,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import CandleChart from '../components/CandleChart';
import Ticker from '../components/Ticker';

export default function BTCScreen({navigation}) {
  const [bitcoinPrice, setBitcoinPrice] = useState();

  const sendPrice = (price) => {
    setBitcoinPrice(price);
  }

  return(
    <View style={styles.container}>
      <Ticker sendPrice={sendPrice} pair="BTC/USD" />
      <CandleChart pair='BTC/USD' />
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{marginRight: '1%', borderRadius: 10, height: 100, width: '48%', borderColor: '#EEE', shadowOffset: {width: 10, height: 10}, shadowColor: 'black', shadowOpacity: 0.5, borderWidth: 1}}><Text>{bitcoinPrice}</Text></View>
        <View style={{marginLeft: '1%', borderRadius: 10, height: 100, width: '48%', borderColor: '#EEE', borderWidth: 1}}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
});
