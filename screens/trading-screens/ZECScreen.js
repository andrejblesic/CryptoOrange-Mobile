import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import CryptoInfo from '../../components/trading-components/CryptoInfo';
import { withNavigationFocus } from 'react-navigation';

function ZECScreen(props) {

  const toggleSwipe = (condition) => {
    props.navigation.setParams({
      swipeDisabled: condition
    });
  }

  return(
    <CryptoInfo
      renderChart={props.isFocused}
      disableScroll={props.navigation.state.params?.swipeDisabled}
      toggleSwipe={toggleSwipe}
      baseCurr="ZEC"
    />
  );
}

ZECScreen.navigationOptions = ({navigation}) => {
  return {
    swipeEnabled: navigation.state.params?.swipeDisabled
  }
}

export default withNavigationFocus(ZECScreen);
