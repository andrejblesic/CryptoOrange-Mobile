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

export default function ETHScreen({navigation}) {
  const [ethereumPrice, setEthereumPrice] = useState();

  const sendPrice = (price) => {
    setEthereumPrice(price);
  }

  return(
    <View style={styles.container}>
      <Ticker sendPrice={sendPrice} pair="ETH/USD" />
      <CandleChart pair="ETH/USD" />
      <Text>{ethereumPrice}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
