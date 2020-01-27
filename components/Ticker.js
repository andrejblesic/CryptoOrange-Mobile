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
import { Entypo } from '@expo/vector-icons';
import CustomIcon from './CustomIcons'

export default function Ticker({pair, sendPrice}) {
  const [latestPrice, setLatestPrice] = useState('Loading...');
  const [priceRise, setPriceRise] = useState(true);

  const fromCurr = pair.substring(0, pair.indexOf('/'));
  const toCurr = pair.substring(pair.indexOf('/') + 1, pair.length);
  let previousPrice;

  const tickerWS = new WebSocket('wss://ws.kraken.com');
  tickerWS.onopen = (event) => {
    tickerWS.send(JSON.stringify(
      {
        "event": "subscribe",
        "pair": [
          pair,
        ],
        "subscription": {
          "name": "ticker"
        }
      }
    ));
  }
  tickerWS.onmessage = (message) => {
    const data = JSON.parse(message.data);
    if (data[1]) {
      setLatestPrice(Number(data[1].a[0]).toFixed(2));
      if (previousPrice > Number(data[1].a[0])) {
        setPriceRise(false);
      } else if (previousPrice < Number(data[1].a[0])) {
        setPriceRise(true);
      }
      previousPrice = Number(data[1].a[0]);
      sendPrice(Number(data[1].a[0]));
    }
  }

  return(
    <View style={styles.tickerStyle}>
      <View style={styles.symbolInfoStyle}>
        <CustomIcon size={42} name={fromCurr} color="orange" />
        <Text style={styles.pairStyle}>{pair}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Entypo name={priceRise ? 'triangle-up' : 'triangle-down'} color={priceRise ? 'green' : 'red'} size={18} />
        <Text style={styles.priceStyle}>{latestPrice} {toCurr}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tickerStyle: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    height: 70,
    marginTop: -3
  },
  symbolInfoStyle: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pairStyle: {
    marginLeft: 8,
    fontSize: 24,
    color: '#333',
    fontWeight: '100'
  },
  priceStyle: {
    color: '#333',
    fontSize: 24,
    marginRight: 8
  }
});
