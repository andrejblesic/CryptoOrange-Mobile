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
  Button
} from 'react-native';

export default function BuySell() {
  const [selectedTab, setSelectedTab] = useState('Buy/Sell');

  return(
    <View style={styles.containerStyle}>
      <Text>Buy/Sell amount</Text>
      <TextInput style={styles.inputStyle} />
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
  inputStyle: {
    borderWidth: 1,
    borderColor: '#EEE',
    width: '100%',
    height: 50
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
