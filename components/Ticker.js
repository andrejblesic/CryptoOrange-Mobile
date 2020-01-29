import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  ActivityIndicator
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import CandleChart from '../components/CandleChart';
import { Entypo } from '@expo/vector-icons';
import CustomIcon from './CustomIcons'

export default function Ticker({pair, sendPrice}) {
  const [latestPrice, setLatestPrice] = useState();
  const [priceRise, setPriceRise] = useState(true);
  const [yesterdayPrice, setYesterdayPrice] = useState();
  const [dayChange, setDayChange] = useState();

  const fromCurr = pair.substring(0, pair.indexOf('/'));
  const toCurr = pair.substring(pair.indexOf('/') + 1, pair.length);
  let previousPrice;

  useEffect(() => {
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
        if (Number(data[1].a[0]) < 10) {
          setLatestPrice(Number(data[1].a[0]).toFixed(4));
        } else {
          setLatestPrice(Number(data[1].a[0]).toFixed(2));
        }
        if (previousPrice > Number(data[1].a[0])) {
          setPriceRise(false);
        } else if (previousPrice < Number(data[1].a[0])) {
          setPriceRise(true);
        }
        previousPrice = Number(data[1].a[0]);
        sendPrice(Number(data[1].a[0]));
      }
    }
  }, [pair])

  useEffect(() => {
    fetch(
      `https://min-api.cryptocompare.com/data/v2/histohour?fsym=${fromCurr}&tsym=${toCurr}&limit=24`,
      {
        headers: {
          authorization: 'Apikey 2177624b4eafe339c9b6b6460974846e8d9c565a2dde39248af18bb4beb5337e'
        }
      }
    )
    .then(res => res.json())
    .then(data => {
      setYesterdayPrice(Number(data.Data.Data[0].close));
      const dayChange = Number(latestPrice) - Number(data.Data.Data[0].close);
      setDayChange(dayChange.toFixed(2));
    })
    .catch(error => console.log(error));
  }, [latestPrice]);

  return(
    <View style={styles.tickerStyle}>
      <View style={styles.symbolInfoStyle}>
        <CustomIcon style={styles.currIconStyle} size={44} name={fromCurr} color="orange" />
        <View>
          <Text style={styles.pairStyle}>{pair}</Text>
          <TouchableOpacity style={styles.changePairStyle}>
            <Text style={styles.changePairLabelStyle}>Change pair</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          {latestPrice && <Entypo name={priceRise ? 'triangle-up' : 'triangle-down'} color={priceRise ? 'green' : 'red'} size={18} />}
          {latestPrice ? <Text style={styles.priceStyle}>{latestPrice}</Text> : <ActivityIndicator style={{marginRight: 50}} color="#666" />}
        </View>
        {
          dayChange && yesterdayPrice && latestPrice ?
          <Text style={{marginRight: 6}}>24h:
            <Text style={{marginLeft: 8, color: latestPrice >= yesterdayPrice ? "green" : "red"}}> {yesterdayPrice < latestPrice && '+'}{dayChange} </Text>
            (<Text style={{color: latestPrice >= yesterdayPrice ? "green" : "red"}}>{yesterdayPrice < latestPrice && '+'}{(dayChange / yesterdayPrice * 100).toFixed(2)}%</Text>)
          </Text>
          : <ActivityIndicator />
        }
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
    height: 80,
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
    fontSize: 28,
    marginRight: 8
  },
  changePairStyle: {
    marginLeft: 8,
    backgroundColor: 'orange',
    borderRadius: 2,
    paddingTop: 2,
    paddingBottom: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  changePairLabelStyle: {
    color: '#fff'
  },
  currIconStyle: {
    marginTop: 5
  }
});
