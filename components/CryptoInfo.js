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

export default function CryptoInfo({navigation, baseCurr, toggleSwipe, disableScroll}) {
  const [cryptoPrice, setCryptoPrice] = useState();
  const [keyboardHeight, setKeyboardHeight] = useState();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [pair, setPair] = useState(`${baseCurr}/USD`);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [exchangePair, setLocalExchangePair] = useState(`${baseCurr}/USD`);

  useEffect(() => {
    const showKeyboardListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardOpen(true);
    });
    const hideKeyboardListener = Keyboard.addListener('keyboardDidHide', (e) => {
      setKeyboardOpen(false);
    });
  }, [pair]);

  const viewEl = useRef();

  const scrollToInput = (focused) => {
    if (focused) {
      setTimeout(() => {
        viewEl.current.scrollTo({x: 0, y: 1000, animated: true});
      }, 300)
    }
  }

  const scrollToTop = () => {
    viewEl.current.scrollTo({x: 0, y: 0, animated: true});
  }

  const sendPrice = (price) => {
    setCryptoPrice(price);
  }

  const setExchangePair = (toCurr) => {
    setLocalExchangePair(`${baseCurr}/${toCurr}`);
  }

  return(
    <ScrollView scrollEnabled={disableScroll} ref={viewEl} contentContainerStyle={{...styles.container, paddingBottom: keyboardOpen ? keyboardHeight + 80 : 10}}>
      <Ticker setExchangePair={setExchangePair} sendPrice={sendPrice} pair={exchangePair} />
      <CandleChart scrollToTop={scrollToTop} toggleSwipe={toggleSwipe} pair={exchangePair} />
      <BuySellExchange exchangePair={exchangePair} pair={pair} scrollToInput={scrollToInput} latestPrice={cryptoPrice} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  }
});
