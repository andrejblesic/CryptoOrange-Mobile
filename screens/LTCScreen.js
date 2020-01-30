import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../components/CryptoInfo';

export default function LTCScreen({navigation}) {

  const toggleSwipe = (condition) => {
    navigation.setParams({
      swipeDisabled: condition
    });
  }

  return(
    <>
      <CryptoInfo disableScroll={navigation.state.params?.swipeDisabled} toggleSwipe={toggleSwipe} pair="LTC/USD" />
    </>
  );
}

LTCScreen.navigationOptions = ({navigation}) => {
  return {
    swipeEnabled: navigation.state.params?.swipeDisabled
  }
}
