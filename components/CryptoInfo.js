import * as WebBrowser from 'expo-web-browser';
import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  Keyboard
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import CandleChart from '../components/CandleChart';
import Ticker from '../components/Ticker';
import BuySellExchange from '../components/BuySellExchange';

export default function CryptoInfo({navigation, pair}) {
  const [cryptoPrice, setCryptoPrice] = useState();
  const [keyboardHeight, setKeyboardHeight] = useState();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardOpen(true);
    });
    const hideKeyboardListener = Keyboard.addListener('keyboardDidHide', (e) => {
      setKeyboardOpen(false);
    });
  });

  const viewEl = useRef();

  const scrollToInput = (focused) => {
    setTimeout(() => {
      viewEl.current.scrollTo({x: 0, y: 2000, animated: true});
    }, 200)
  }

  const sendPrice = (price) => {
    setCryptoPrice(price);
  }

  const controlScroll = (condition) => {
    //setScrollEnabled(condition);
  }

  return(
    <ScrollView scrollEnabled={false} ref={viewEl} contentContainerStyle={{...styles.container, paddingBottom: keyboardOpen ? keyboardHeight + 60 : 10}}>
      <Ticker sendPrice={sendPrice} pair={pair} />
      <CandleChart controlScroll={controlScroll} pair={pair} />
      <BuySellExchange scrollToInput={scrollToInput} latestPrice={cryptoPrice} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    height: 2000
  }
});
