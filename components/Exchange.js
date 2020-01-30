import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  Picker
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomIcon from './CustomIcons';

export default function Exchange({pair, scrollToInput}) {
  const [selectedTab, setSelectedTab] = useState('Buy/Sell');
  const [toCurr, setToCurr] = useState(pair.substring(0, pair.indexOf('/')) === 'BTC' ? 'ETH' : 'BTC');
  const [toCurrPrice, setToCurrPrice] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);

  const currencies = ['BTC', 'ETH', 'LTC', 'DASH', 'XRP'];
  const baseCurr = pair.substring(0, pair.indexOf('/'));
  currencies.splice(currencies.indexOf(baseCurr), 1);

  const getPairPrice = (value) => {
    fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${baseCurr}&tsyms=${value}`,
      {
        headers: {
          authorization: 'Apikey 2177624b4eafe339c9b6b6460974846e8d9c565a2dde39248af18bb4beb5337e'
        }
      }
    )
    .then(res => res.json())
    .then(data => setToCurrPrice(data[value]));
  }

  const handleCurrChange = (value) => {
    setToCurr(value);
    getPairPrice(value);
  }

  const handleInput = (event) => {
    if (event.nativeEvent.text.length < 1) {
      setBaseAmount(0);
    } else {
      setBaseAmount(Number(event.nativeEvent.text));
    }
  }

  useEffect(() => {
    getPairPrice(toCurr);
  }, [pair])

  return(
    <View style={styles.containerStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{baseCurr} to: </Text>
        <Picker
          style={{height: 50, width: 110}}
          selectedValue={toCurr}
          onValueChange={(value) => handleCurrChange(value)}
        >
          {currencies.map((item, index) => {
            return(
              <Picker.Item key={index} value={item} label={item}/>
            );
          })}
        </Picker>
      </View>
      <View style={styles.inputWrapperStyle}>
        <TextInput
          onFocus={() => scrollToInput(true)}
          onBlur={() => scrollToInput(false)}
          keyboardType="numeric"
          onChange={(event) => handleInput(event)}
          placeholder={`${baseCurr} amount`}
          style={styles.inputStyle}
        ></TextInput>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
        <CustomIcon name={baseCurr} size={32} color='#f36a22' />
        <Feather name='chevrons-right' size={38} color="#555"/>
        <CustomIcon name={toCurr} size={32} color='#f36a22' />
      </View>
      <View style={styles.toContainer}>
        <View style={styles.toAmountWrapperStyle}>
          <Text style={styles.exchangeToAmountStyle}>{(baseAmount * toCurrPrice) === 0 ? 0 : (baseAmount * toCurrPrice)} {toCurr}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.confirmButtonStyle}>
        <Text style={styles.confirmButtonLabel}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 4,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    textAlign: 'center',
    fontSize: 20,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#EEE',
    width: '80%',
    height: 50
  },
  inputWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  exchangeToAmountStyle: {
    fontSize: 24,
    height: 50,
    width: '100%',
    marginRight: 5,
    textAlign: 'center',
    paddingTop: 16
  },
  toAmountWrapperStyle: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  confirmButtonStyle: {
    width: '80%',
    backgroundColor: '#f36a22',
    borderRadius: 4,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8
  },
  confirmButtonLabel: {
    color: '#fff',
    fontSize: 18
  },
  toContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
