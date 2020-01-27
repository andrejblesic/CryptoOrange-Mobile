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
// import { StackActions, NavigationActions } from 'react-navigation';
// import Header from '../components/Header';


export default function StackScreen({navigation}) {
  return(
    <View style={styles.container}>
      <Text>STACK 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow'
  }
});
