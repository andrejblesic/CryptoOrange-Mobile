import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

export default function ProfileScreen({navigation}) {

  // const pushAction = StackActions.push({
  //   routeName: 'ProfileScreen',
  // });

  return (
    <View style={styles.container}>
      <Text>PROFILE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999'
  }
});
