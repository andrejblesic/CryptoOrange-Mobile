import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../components/CryptoInfo';

export default function ETHScreen({navigation}) {

  const toggleSwipe = (condition) => {
    navigation.setParams({
      swipeDisabled: condition
    });
  }

  return(
    <CryptoInfo
      disableScroll={navigation.state.params?.swipeDisabled}
      toggleSwipe={toggleSwipe}
      baseCurr="ETH"
    />
  );
}

ETHScreen.navigationOptions = ({navigation}) => {
  return {
    swipeEnabled: navigation.state.params?.swipeDisabled
  }
}
