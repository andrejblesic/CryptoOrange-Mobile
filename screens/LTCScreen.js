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

export default function LTCScreen({navigation}) {
  const [litecoinPrice, setLitecoinPrice] = useState();

  const sendPrice = (price) => {
    setLitecoinPrice(price);
  }

  return(
    <ScrollView contentContainerStyle={styles.container}>
      <Ticker sendPrice={sendPrice} pair="LTC/USD" />
      <CandleChart pair="LTC/USD" />
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
