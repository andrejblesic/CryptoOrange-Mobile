import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import CandleChart from '../components/CandleChart';

export default function ETHScreen({navigation}) {
  return(
    <View style={styles.container}>
      <Text>ETH</Text>
      <CandleChart pair='ETH/USD' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});
