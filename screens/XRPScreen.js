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
import BuySellExchange from '../components/BuySellExchange';

export default function XRPScreen({navigation}) {
  const [ripplePrice, setRipplePrice] = useState();

  const sendPrice = (price) => {
    setRipplePrice(price);
  }

  return(
    <ScrollView contentContainerStyle={styles.container}>
      <Ticker sendPrice={sendPrice} pair="XRP/USD" />
      <CandleChart pair="XRP/USD" />
      <BuySellExchange />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
