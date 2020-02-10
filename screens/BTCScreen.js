import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../components/CryptoInfo';
import { Button, Text } from 'react-native';
import { useEffect } from 'react';
import addLatestPrice from '../components/Redux/actions';
import { connect } from 'react-redux';

function BTCScreen(props) {

  const toggleSwipe = (condition) => {
    props.navigation.setParams({
      swipeDisabled: condition
    });
  }

  useEffect(() => {
    console.log(props);
    // setTimeout(() => {
    //   props.screenProps.dispatch(props.screenProps.addLatestPrice('GOVNOCOIN', 999999));
    // }, 2000);
    // setTimeout(() => {
    //   console.log(props.screenProps.getState());
    // }, 4000)
  })

  return(
    <>
      <Text>{props.latestPrice['AAAAAAAAAAAAAAAA']}</Text>
      <CryptoInfo
        disableScroll={props.navigation.state.params?.swipeDisabled}
        toggleSwipe={toggleSwipe}
        baseCurr="BTC"
      />
    </>
  );
}

BTCScreen.navigationOptions = ({navigation}) => {
  return {
    swipeEnabled: navigation.state.params?.swipeDisabled
  }
}

const mapStateToProps = state => {
  return {latestPrice: state.latestPrices};
};

export default connect(
  mapStateToProps,
  null
)(BTCScreen);
