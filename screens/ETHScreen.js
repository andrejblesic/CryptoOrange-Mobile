import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CryptoInfo from '../components/CryptoInfo';

export default function ETHScreen({navigation}) {
  return(
    <>
      <CryptoInfo pair="ETH/USD" />
    </>
  );
}
