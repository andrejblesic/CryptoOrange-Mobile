import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput
} from 'react-native';

export default function Exchange() {
  const [selectedTab, setSelectedTab] = useState('Buy/Sell');

  return(
    <View style={styles.containerStyle}>
      <Text>Exchange amount</Text>
      <TextInput style={styles.inputStyle} />
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
    width: '80%',
    height: 50
  }
});
