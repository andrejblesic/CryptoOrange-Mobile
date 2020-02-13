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
  Keyboard,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Chart from '../components/Chart';
import Ticker from '../components/Ticker';
import BuySellExchange from '../components/BuySellExchange';
import { connect } from 'react-redux';
import * as actions from '../Redux/actions';

function CryptoInfo(props) {
  const [cryptoPrice, setCryptoPrice] = useState();
  const [keyboardHeight, setKeyboardHeight] = useState();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [pair, setPair] = useState(`${props.baseCurr}/USD`);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [exchangePair, setLocalExchangePair] = useState(`${props.baseCurr}/USD`);

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

  // useEffect(() => {
  //   props.dispatch(actions.addLatestPrice("aaaaaaaaaaaaaaaaaaaaaaa", 9000));
  //   setTimeout(() => {
  //     console.log(props);
  //   }, 2000);
  // }, [])

  const scrollToTop = () => {
    viewEl.current.scrollTo({x: 0, y: 0, animated: true});
  }

  const sendPrice = (price) => {
    setCryptoPrice(price);
  }

  const setExchangePair = (toCurr) => {
    setLocalExchangePair(`${props.baseCurr}/${toCurr}`);
  }

  return(
    <ScrollView
      scrollEnabled={props.disableScroll}
      ref={viewEl}
      contentContainerStyle={{...styles.container, paddingBottom: keyboardOpen ? keyboardHeight + 80 : 10}}>
      <Ticker
        latestPrice={props.latestPrices[exchangePair.replace('BTC', 'XBT')] && Number(props.latestPrices[exchangePair.replace('BTC', 'XBT')].c[0])}
        yesterdayPrice={props.latestPrices[exchangePair.replace('BTC', 'XBT')] && Number(props.latestPrices[exchangePair.replace('BTC', 'XBT')].o[1])}
        setExchangePair={setExchangePair}
        sendPrice={sendPrice}
        pair={exchangePair}
      />
      <Chart
        scrollToTop={scrollToTop}
        toggleSwipe={props.toggleSwipe}
        pair={exchangePair}
        latestOHLC={props.latestPrices[exchangePair.replace('BTC', 'XBT')] && props.latestPrices[exchangePair.replace('BTC', 'XBT')]}
      />
      <BuySellExchange
        pair={exchangePair}
        scrollToInput={scrollToInput}
        latestPrice={props.latestPrices[exchangePair.replace('BTC', 'XBT')] && Number(props.latestPrices[exchangePair.replace('BTC', 'XBT')].c[0])}
      />
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

//REDUX

const mapStateToProps = state => {
  return {latestPrices: state.latestPrices};
};

export default connect(
  mapStateToProps,
  null
)(CryptoInfo);
