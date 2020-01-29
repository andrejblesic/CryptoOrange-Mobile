import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../components/CryptoInfo';

export default function LTCScreen({navigation}) {
  return(
    <>
      <CryptoInfo pair="LTC/USD" />
    </>
  );
}
