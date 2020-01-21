import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//import Header from '../components/Header';

export default function TestScreen3({navigation}) {
  console.log('CURRENT ROUTE: ', navigation.state.routeName);
  return(
    <View style={styles.container}>
      <Text>TEST TRI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  }
});
