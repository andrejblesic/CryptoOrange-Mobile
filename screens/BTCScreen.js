import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../components/CryptoInfo';
import { Button } from 'react-native';

export default function BTCScreen({navigation}) {

  const toggleSwipe = (condition) => {
    navigation.setParams({
      swipeDisabled: condition
    });
  }

  return(
    <CryptoInfo
      disableScroll={navigation.state.params?.swipeDisabled}
      toggleSwipe={toggleSwipe}
      baseCurr="BTC"
    />
  );
}

BTCScreen.navigationOptions = ({navigation}) => {
  return {
    swipeEnabled: navigation.state.params?.swipeDisabled
  }
}
