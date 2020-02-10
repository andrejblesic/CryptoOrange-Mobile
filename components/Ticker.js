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
  ActivityIndicator,
  TextInput,
  AppState
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import CandleChart from '../components/CandleChart';
import { Entypo } from '@expo/vector-icons';
import CustomIcon from './CustomIcons';
import ModalSelector from 'react-native-modal-selector';

export default function Ticker({pair, sendPrice, setExchangePair}) {
  const [latestPrice, setLatestPrice] = useState();
  const [priceRise, setPriceRise] = useState(true);
  const [yesterdayPrice, setYesterdayPrice] = useState();
  const [dayChange, setDayChange] = useState();
  const [toCurr, setToCurr] = useState(pair.substring(pair.indexOf('/') + 1, pair.length));
  const [fromCurr, setFromCurr] = useState(pair.substring(0, pair.indexOf('/')))
  const [tickerWS, setTickerWS] = useState(new WebSocket('wss://echo.websocket.org'));
  const [channelId, setChannelId] = useState();

  let previousPrice;

  tickerWS.onopen = () => {
    setupWS();
  }

  useEffect(() => {
    setupWS();
  }, [pair, tickerWS]);

  useEffect(() => {
    getYesterdayPrice();
  }, [latestPrice]);

  AppState.addEventListener('change', (event) => {
    if (event === 'active' && (tickerWS.readyState !== 1 || !tickerWS)) {
      setTickerWS(new WebSocket('wss://ws.kraken.com'));
    }
    tickerWS.onopen = () => {
      setupWS();
    }
  });

  const currencies = ['BTC', 'ETH', 'LTC', 'DASH', 'XRP', 'USD', 'EUR'];
  currencies.splice(currencies.indexOf(fromCurr), 1);

  const selectorData = currencies.map((item, index) => {
    return (
      { key: index, label: item }
    );
  });

  const setupWS = () => {
    if (tickerWS.readyState === 1) {
      if (channelId) {
        tickerWS.send(JSON.stringify(
          {
            "event": "unsubscribe",
            "channelID": channelId
          }
        ))
      }
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
        setChannelId(data[0]);
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
  }

  const getYesterdayPrice = () => {
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
  }

  const handleSelectorChange = (option) => {
    setToCurr(option.label);
    setExchangePair(option.label);
  }

  return(
    <View style={styles.tickerStyle}>
      <View style={styles.symbolInfoStyle}>
        <CustomIcon style={styles.currIconStyle} size={44} name={fromCurr} color="orange" />
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text maxFontSizeMultiplier={1} style={styles.pairStyle}>{pair.substring(0, pair.indexOf('/'))}</Text>
          <ModalSelector
            data={selectorData}
            supportedOrientations={['portrait']}
            accessible={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            optionStyle={{height: 50, alignItems: 'center', justifyContent: 'center'}}
            optionTextStyle={{color: '#333', fontSize: 20}}
            cancelTextStyle={{textTransform: 'capitalize', fontSize: 20}}
            onChange={(option) => {handleSelectorChange(option)}}
            cancelStyle={{height: 50, justifyContent: 'center', alignItems: 'center'}}
          >
            <TextInput
              maxFontSizeMultiplier={1}
              style={{...styles.selectorInputStyle, width: toCurr.length < 4 ? 75 : 90, height: 38,}}
              editable={false}
              value={`${toCurr} ▾`}
            />
          </ModalSelector>
        </View>
      </View>
      {latestPrice && yesterdayPrice && dayChange ?
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Entypo name={priceRise ? 'triangle-up' : 'triangle-down'} color={priceRise ? 'green' : 'red'} size={18} />
            <Text style={styles.priceStyle}>{latestPrice}</Text>
          </View>
        {
          dayChange && yesterdayPrice && latestPrice ?
          <Text style={{marginRight: 6}}>24h:
            <Text style={{marginLeft: 8, color: latestPrice >= yesterdayPrice ? "green" : "red"}}> {yesterdayPrice < latestPrice && '+'}{dayChange} </Text>
            (<Text style={{color: latestPrice >= yesterdayPrice ? "green" : "red"}}>{yesterdayPrice < latestPrice && '+'}{(dayChange / yesterdayPrice * 100).toFixed(2)}%</Text>)
          </Text>
          : null
        }
      </View> : <ActivityIndicator size='large' color='#888' />}
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
    fontSize: 28,
    marginRight: 8
  },
  currIconStyle: {
    marginTop: 5
  },
  selectorInputStyle: {
    borderWidth: 1,
    borderColor:'orange',
    fontSize: 24,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginLeft: 5,
    marginTop: -2
  }
});
