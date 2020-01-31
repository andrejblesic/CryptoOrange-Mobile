import React, { useState, useEffect, propTypes } from 'react';
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
import ModalSelector from 'react-native-modal-selector';

export default function Exchange({scrollToInput, exchangePair}) {
  const [selectedTab, setSelectedTab] = useState('Buy/Sell');
  const [toCurrPrice, setToCurrPrice] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);

  const fiatCurrencies = ['USD', 'EUR', 'GBP'];
  const baseCurr = exchangePair.substring(0, exchangePair.indexOf('/'));
  const toCurr = exchangePair.substring(exchangePair.indexOf('/') + 1, exchangePair.lenght);

  useEffect(() => {
    getPairPrice(exchangePair.substring(exchangePair.indexOf('/') + 1, exchangePair.length))
  }, [exchangePair])

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
    if ((/^\d*\.?\d*$/).test(event.nativeEvent.text)) {
      setBaseAmount(event.nativeEvent.text);
    }
  }

  useEffect(() => {
    getPairPrice(toCurr);
  }, [exchangePair]);

  return(
    <View>
      {fiatCurrencies.indexOf(toCurr) < 0 ?
      <View style={styles.containerStyle}>
        <View style={styles.pairInfoStyle}>
          <Text style={{fontSize: 15}}>You're trading</Text>
          <Text style={{fontSize: 24}}>{exchangePair}</Text>
        </View>
        <View style={styles.inputWrapperStyle}>
          <TextInput
            onFocus={() => scrollToInput(true)}
            onBlur={() => scrollToInput(false)}
            keyboardType="numeric"
            onChange={(event) => handleInput(event)}
            placeholder={`${baseCurr} Amount`}
            style={styles.inputStyle}
            value={baseAmount.toString()}
          ></TextInput>
        </View>
        <View style={styles.toContainer}>
          <View style={styles.toAmountWrapperStyle}>
            <Text style={styles.exchangeToAmountStyle}>≈ {(baseAmount * toCurrPrice) === 0 ? 0 : ((baseAmount * toCurrPrice) > 1000000 ? (baseAmount * toCurrPrice).toFixed(2) : (baseAmount * toCurrPrice).toFixed(4))} {exchangePair.substring(exchangePair.indexOf('/') + 1, exchangePair.length)}</Text>
          </View>
        </View>
        <View style={styles.buttonWrapperStyle}>
          <TouchableOpacity style={styles.confirmButtonStyle}>
            <Text style={styles.confirmButtonLabel}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButtonStyle}>
            <Text style={styles.confirmButtonLabel}>Sell</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoBlockStyle}>
          <Text>Current {baseCurr} balance: 1.23456789</Text>
        </View>
      </View>
      :
      <View style={{width: '70%', marginTop: 30, marginBottom: 30, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>You cannot trade {baseCurr} for {toCurr}, please use Buy/Sell</Text>
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    textAlign: 'center',
    fontSize: 20,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#EEE',
    width: '67.5%',
    borderRadius: 4,
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
    paddingTop: 10,
  },
  toAmountWrapperStyle: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    flex: 1
  },
  buttonWrapperStyle: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  confirmButtonStyle: {
    width: '45%',
    backgroundColor: 'orange',
    borderRadius: 4,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  confirmButtonLabel: {
    color: '#fff',
    fontSize: 18
  },
  toContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pairInfoStyle: {
    marginTop: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoBlockStyle: {
    marginTop: 20
  }
});
