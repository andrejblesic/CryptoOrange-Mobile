import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as chartJS from './chartJS.js';
import { Foundation } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import ReactNativeComponentTree from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const deviceWidth = Dimensions.get('window').width;
const coinbaseWS = 'wss://ws-feed.pro.coinbase.com';

const candleChartHtml = `
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 mimum-scale=1">
<style>body {margin: 0; max-height: 300px; height: 300px; background-color: #FFF}</style>
<body>
  <div style="background-color: #FFF" id="candlechartdiv"></div>
</body>
<script src="https://unpkg.com/lightweight-charts@1.1.0/dist/lightweight-charts.standalone.production.js"></script>
`;

export default function CandleChart({pair, toggleSwipe, scrollToTop}) {
  const [selectedInterval, setInterval] = useState('15');
  const [candleChartJS, setCandleChartJS] = useState(
    chartJS.candleChart(deviceWidth, selectedInterval, pair)
  );
  const [isReloadWebView, setReloadWebView] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartLocked, setChartLocked] = useState(false);

  useEffect(() => {
    setChartLoading(true);
    setTimeout(() => {
      setChartLoading(false);
    }, 1000)
    setCandleChartJS(chartJS.candleChart(deviceWidth, selectedInterval, pair));
    setReloadWebView(!isReloadWebView);
  }, [selectedInterval]);

  let currInterval;
  const intervals = ['5', '15', '30', '60', '1440'];

  const handlePress = ({item}) => {
    if (item !== currInterval) {
      setInterval(item);
    }
    currInterval = item;
  }

  const toggleChartLock = () => {
    setChartLocked(!chartLocked);
    toggleSwipe(chartLocked);
    if (!chartLocked) {
      scrollToTop();
    }
  }

  return (
    <View style={styles.webViewWrapperStyle}>
      {chartLoading ? <View style={{height: 300, zIndex: 999, backgroundColor: '#FFF'}}>
        <ActivityIndicator style={{marginTop: 125, zIndex: 9}} size="large" color="#888" />
      </View> : null}
      <View style={{height: chartLoading ? 0 : 340, zIndex: 1, pointerEvents: 'none'}}>
        <WebView
          onPress={() => alert('pressed')}
          ref={CandleWVref => (CandleWebViewRef = CandleWVref)}
          key={isReloadWebView}
          originWhitelist={['*']}
          useWebKit={true}
          source={{ html: candleChartHtml }}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          style={{...styles.webViewStyle}}
          injectedJavaScript={candleChartJS}
        />
        <View style={styles.intervalTabStyle}>
          {intervals.map((item, index) => {
            return (
              <TouchableOpacity
              onPress={() => handlePress({item})}
              id={item}
              key={index}
              style={{...styles.timeScaleStyle, borderBottomColor: selectedInterval === item ? "#f36a22" : 'rgba(0, 0, 0, 0)'}}>
                <View style={styles.dividerStyle}>
                  <Text style={{color: selectedInterval === item ? '#333' : '#AAA'}}>{item !== '1440' ? item + 'm' : '1D'}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.lockStyle} onPress={toggleChartLock}>
            <Foundation name={chartLocked ? 'unlock' : 'lock'} color='#f36a22' size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webViewWrapperStyle: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: 'white',
    width: '100%',
    height: 340,
    zIndex: 999
  },
  webViewStyle: {
    backgroundColor: '#FFF',
    width: '100%',
  },
  intervalTabStyle: {
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40
  },
  timeScaleStyle: {
    height: 40,
    flexDirection: 'row',
    width: '17%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4
  },
  dividerStyle: {
    borderRightWidth: 1,
    borderRightColor: '#EEE',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lockStyle: {
    marginTop: -5,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
