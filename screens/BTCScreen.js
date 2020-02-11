import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import CryptoInfo from '../components/CryptoInfo';
import { Button, Text } from 'react-native';

export default function BTCScreen(props) {

  const toggleSwipe = (condition) => {
    props.navigation.setParams({
      swipeDisabled: condition
    });
  }

  return(
    <CryptoInfo
      setSelectedInterval={props.screenProps.setSelectedInterval}
      disableScroll={props.navigation.state.params?.swipeDisabled}
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
