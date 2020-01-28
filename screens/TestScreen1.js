import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
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

export default function TestScreen1({navigation}) {
  const [currentStack, setStack] = useState('');

  useEffect(() => {
    console.log(currentStack);
  }, [currentStack, navigation])

  const pushAction = StackActions.push({
    routeName: 'StackScreen',
  });
  const didBlurSubscription = navigation.addListener(
    'didBlur',
    payload => {
      //console.log('blurred');
      console.log(payload.state.routeName);
    }
  );
  return(
    <View style={styles.container}>
      <Text>TEST 1</Text>
      <Button
        title="GO TO STACK SCREEN 1"
        onPress={() => {navigation.dispatch(pushAction)}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  }
});
