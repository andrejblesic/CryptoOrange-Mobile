import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../components/CryptoInfo';

export default function XRPScreen({navigation}) {
  return(
    <>
      <CryptoInfo pair="XRP/USD" />
    </>
  );
}
