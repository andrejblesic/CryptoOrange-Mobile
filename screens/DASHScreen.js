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

export default function DASHScreen({navigation}) {
  const [dashPrice, setDashPrice] = useState();

  const sendPrice = (price) => {
    setDashPrice(price);
  }

  return(
    <View style={styles.container}>
      <Ticker sendPrice={sendPrice} pair="DASH/USD" />
      <CandleChart pair="DASH/USD" />
      <Text>{dashPrice}</Text>
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
