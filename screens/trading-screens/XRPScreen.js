import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../../components/trading-components/CryptoInfo';

export default function XRPScreen(props) {

  const toggleSwipe = (condition) => {
    props.navigation.setParams({
      swipeDisabled: condition
    });
  }

  return(
    <CryptoInfo
      disableScroll={props.navigation.state.params?.swipeDisabled}
      toggleSwipe={toggleSwipe}
      baseCurr="XRP"
    />
  );
}

XRPScreen.navigationOptions = ({navigation}) => {
  return {
    swipeEnabled: navigation.state.params?.swipeDisabled
  }
}
