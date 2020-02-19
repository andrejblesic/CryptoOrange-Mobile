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

export default function BuySell({scrollToInput, pair, latestPrice}) {
  const [selectedTab, setSelectedTab] = useState('Buy/Sell');
  const [inputAmount, setInputAmount] = useState(null);

  const toCurr = pair.substring(pair.indexOf('/') + 1, pair.length)
  const baseCurr = pair.substring(0, pair.indexOf('/'));

  const handleInput = (input) => {
    if ((/^\d*\.?\d*$/).test(input)) {
      setInputAmount(input);
    }
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
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonLabelStyle}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonLabelStyle}>Sell</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.approximateAmountStyle}>
          <Text style={{fontSize: 16}}>{inputAmount ? `≈ ${(inputAmount * latestPrice).toFixed(2)} ${toCurr}` : null}</Text>
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
