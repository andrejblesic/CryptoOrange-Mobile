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
import { Entypo } from '@expo/vector-icons';
import CustomIcon from './CustomIcons';
import ModalSelector from 'react-native-modal-selector';

export default function Ticker({pair, sendPrice, setExchangePair, latestPrice, yesterdayPrice}) {
  const [priceRise, setPriceRise] = useState(true);
  const [dayChange, setDayChange] = useState();
  const [toCurr, setToCurr] = useState(pair.substring(pair.indexOf('/') + 1, pair.length));
  const [fromCurr, setFromCurr] = useState(pair.substring(0, pair.indexOf('/')))
  const [channelId, setChannelId] = useState();
  const [previousPrice, setPreviousPrice] = useState();

  useEffect(() => {
    if (previousPrice) {
      if (Number(previousPrice) < Number(latestPrice)) {
        setPriceRise(true);
      } else {
        setPriceRise(false);
      }
    }
    const dayChange = Number(latestPrice) - Number(yesterdayPrice);
    setDayChange(dayChange.toFixed(2));
    setPreviousPrice(Number(latestPrice));
  }, [latestPrice]);

  const currencies = ['BTC', 'ETH', 'LTC', 'DASH', 'XRP', 'USD', 'EUR', 'GBP'];
  currencies.splice(currencies.indexOf(fromCurr), 1);

  const selectorData = currencies.map((item, index) => {
    return (
      { key: index, label: item }
    );
  });

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
            backdropPressToClose={true}
            scrollViewAccessibilityLabel={'Scrollable options'}
            cancelButtonAccessibilityLabel={'Cancel Button'}
            optionStyle={{height: 50, alignItems: 'center', justifyContent: 'center'}}
            optionTextStyle={{color: '#333', fontSize: 24}}
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
      {
        latestPrice && yesterdayPrice && dayChange ?
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
            <Entypo style={{marginTop: 2}} name={priceRise ? 'triangle-up' : 'triangle-down'} color={priceRise ? 'green' : 'red'} size={18} />
            <Text style={styles.priceStyle}>{Number(latestPrice).toFixed(2)}</Text>
          </View>
          <Text style={{marginRight: 6}}>24h:
            <Text style={{marginLeft: 8, color: latestPrice >= yesterdayPrice ? "green" : "red"}}> {yesterdayPrice < latestPrice && '+'}{dayChange} </Text>
            (<Text style={{color: latestPrice >= yesterdayPrice ? "green" : "red"}}>{yesterdayPrice < latestPrice && '+'}{(dayChange / yesterdayPrice * 100).toFixed(2)}%</Text>)
          </Text>
        </View>
        : <ActivityIndicator size='large' color='#888' />
      }
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
