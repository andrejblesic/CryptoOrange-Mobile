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
import Chart from './Chart';
import Ticker from './Ticker';
import BuySellExchange from './BuySellExchange';
import { connect } from 'react-redux';
import * as actions from '../../Redux/actions';

function CryptoInfo(props) {
  const [cryptoPrice, setCryptoPrice] = useState();
  const [keyboardHeight, setKeyboardHeight] = useState();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [pair, setPair] = useState(`${props.baseCurr}/USD`);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [exchangePair, setLocalExchangePair] = useState(`${props.baseCurr}/USD`);
  const [latestPrice, setLatestPrice] = useState(
    props.latestPrices[exchangePair.replace('BTC', 'XBT')] && Number(props.latestPrices[exchangePair.replace('BTC', 'XBT')].c[0])
  );
  const [yesterdayPrice, setYesterdayPrice] = useState(
    props.latestPrices[exchangePair.replace('BTC', 'XBT')] && Number(props.latestPrices[exchangePair.replace('BTC', 'XBT')].o[1])
  );

  useEffect(() => {
    setLatestPrice(props.latestPrices[exchangePair.replace('BTC', 'XBT')] && Number(props.latestPrices[exchangePair.replace('BTC', 'XBT')].c[0]));
    setYesterdayPrice(props.latestPrices[exchangePair.replace('BTC', 'XBT')] && Number(props.latestPrices[exchangePair.replace('BTC', 'XBT')].o[1]));
    const showKeyboardListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardOpen(true);
    });
    const hideKeyboardListener = Keyboard.addListener('keyboardDidHide', (e) => {
      setKeyboardOpen(false);
    });
  }, [pair]);

  // fetch data for pairs not available on kraken websocket
  useEffect(() => {
    const toCurr = exchangePair.substring(exchangePair.indexOf('/') + 1, exchangePair.length);
    if (props.latestPrices[exchangePair.replace('BTC', 'XBT')]) {
      setLatestPrice(props.latestPrices[exchangePair.replace('BTC', 'XBT')] && Number(props.latestPrices[exchangePair.replace('BTC', 'XBT')].c[0]));
      setYesterdayPrice(props.latestPrices[exchangePair.replace('BTC', 'XBT')] && Number(props.latestPrices[exchangePair.replace('BTC', 'XBT')].o[1]))
    } else {
      fetch(`https://min-api.cryptocompare.com/data/price?fsym=${props.baseCurr}&tsyms=${toCurr}`)
        .then(res => res.json())
        .then(json => {
          setLatestPrice(Number(json[toCurr]));
        })
      .catch(error => console.log(error));
      fetch(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${props.baseCurr}&tsym=${toCurr}&limit=24`)
        .then(res => res.json())
        .then(json => {
          setYesterdayPrice(json.Data.Data[0].close);
        })
      .catch(error => console.log(error));
    }
  }, [exchangePair, props.latestPrices[exchangePair.replace('BTC', 'XBT')]])

  const viewEl = useRef();

  const scrollToInput = (focused) => {
    if (focused) {
      setTimeout(() => {
        viewEl.current.scrollTo({x: 0, y: 1000, animated: true});
      }, 300);
    }
  }

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
        latestPrice={latestPrice}
        yesterdayPrice={yesterdayPrice}
        setExchangePair={setExchangePair}
        sendPrice={sendPrice}
        pair={exchangePair}
      />
      <Chart
        renderChart={props.renderChart}
        scrollToTop={scrollToTop}
        toggleSwipe={props.toggleSwipe}
        pair={exchangePair}
        latestOHLC={props.latestPrices[exchangePair.replace('BTC', 'XBT')] && props.latestPrices[exchangePair.replace('BTC', 'XBT')]}
      />
      <BuySellExchange
        pair={exchangePair}
        scrollToInput={scrollToInput}
        latestPrice={latestPrice}
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
