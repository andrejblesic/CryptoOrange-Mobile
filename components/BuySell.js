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
  Button,
  KeyboardAvoidingView
} from 'react-native';

export default function BuySell({scrollToInput, exchangePair}) {
  const [selectedTab, setSelectedTab] = useState('Buy/Sell');
  const [inputAmount, setInputAmount] = useState(null);
  const [latestPrice, setLatestPrice] = useState();

  const toCurr = exchangePair.substring(exchangePair.indexOf('/') + 1, exchangePair.length)
  const baseCurr = exchangePair.substring(0, exchangePair.indexOf('/'));

  useEffect(() => {
    getPairPrice();
  }, [exchangePair]);

  const handleInput = (input) => {
    if ((/^\d*\.?\d*$/).test(input)) {
      setInputAmount(input);
    }
    getPairPrice();
  }

  const getPairPrice = () => {
    fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${baseCurr}&tsyms=${toCurr}`,
      {
        headers: {
          authorization: 'Apikey 2177624b4eafe339c9b6b6460974846e8d9c565a2dde39248af18bb4beb5337e'
        }
      }
    )
    .then(res => res.json())
    .then(data => {
      setLatestPrice(data[toCurr])
    });
  }

  const fiatCurrencies = ['USD', 'EUR', 'GBP'];

  return(
    <View behavior="padding" style={styles.containerStyle}>
      {fiatCurrencies.indexOf(toCurr) >= 0 ? <>
        <TextInput
          placeholder={`${baseCurr} amount`}
          keyboardType='numeric'
          onFocus={() => scrollToInput(true)}
          onBlur={() => scrollToInput(false)}
          onChangeText={(input) => handleInput(input)}
          style={styles.inputStyle}
          value={inputAmount}
        />
        <View style={styles.approximateAmountStyle}>
          <Text style={{fontSize: 16}}>{inputAmount ? `≈ ${(inputAmount * latestPrice).toFixed(2)} ${toCurr}` : null}</Text>
        </View>
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonLabelStyle}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonLabelStyle}>Sell</Text>
          </TouchableOpacity>
        </View>
      </>
      :
      <>
        <View style={{marginBottom: 50, marginTop: 50}}>
          <Text style={{textAlign: 'center', fontSize: 20}}>You cannot buy or sell {toCurr}, please use Exchange if you wish to trade cryptocurrencies</Text>
        </View>
      </>
      }
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
  approximateAmountStyle: {
    paddingTop: 10,
    paddingBottom: 6
  },
  inputStyle: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#EEE',
    width: '100%',
    height: 50,
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 20
  },
  buttonContainerStyle: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 30
  },
  buttonStyle: {
    width: 100,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: 'orange'
  },
  buttonLabelStyle: {
    color: 'white',
    fontSize: 18
  }
});
