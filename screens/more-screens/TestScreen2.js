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

export default function TestScreen2({navigation}) {
  const pushAction = StackActions.push({
    routeName: 'StackScreen2'
  });
  return(
    <View style={styles.container}>
      <Text>TEST 2</Text>
      <Button
        title="GO TO STACK SCREEN 2"
        onPress={() => navigation.dispatch(pushAction)}
      />
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
