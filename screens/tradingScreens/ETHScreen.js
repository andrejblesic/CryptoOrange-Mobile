import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../../components/tradingComponents/CryptoInfo';

export default function ETHScreen(props) {

  const toggleSwipe = (condition) => {
    props.navigation.setParams({
      swipeDisabled: condition
    });
  }

  return(
    <CryptoInfo
      disableScroll={props.navigation.state.params?.swipeDisabled}
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