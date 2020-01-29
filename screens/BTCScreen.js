import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../components/CryptoInfo';

export default function BTCScreen({navigation}) {
  return(
    <>
      <CryptoInfo pair="BTC/USD" />
    </>
  );
}
