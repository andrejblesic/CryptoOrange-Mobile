import React, { useState } from 'react';
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

export default function BuySell({latestPrice, scrollToInput}) {
  const [selectedTab, setSelectedTab] = useState('Buy/Sell');
  const [inputAmount, setInputAmount] = useState(null);

  const handleInput = (input) => {
    input = input.replace(/[^0-9]\.{3}/g, '');
    setInputAmount(input);
  }

  return(
    <View behavior="padding" style={styles.containerStyle}>
      <TextInput
        placeholder="Enter Amount To Buy/Sell"
        keyboardType='numeric'
        onFocus={() => scrollToInput(true)}
        onBlur={() => scrollToInput(false)}
        onChangeText={(input) => handleInput(input)}
        style={styles.inputStyle}
        value={inputAmount}
      />
      <View style={styles.approximateAmountStyle}>
        <Text>{inputAmount ? `≈ ${(inputAmount * latestPrice).toFixed(2)} USD` : null}</Text>
      </View>
      <View style={styles.buttonContainerStyle}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonLabelStyle}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonLabelStyle}>Sell</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 8
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
