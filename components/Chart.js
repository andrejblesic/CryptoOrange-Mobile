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
import { Foundation, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import ReactNativeComponentTree from 'react-native';
import NetInfo from '@react-native-community/netinfo';

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

export default function Chart({pair, toggleSwipe, scrollToTop, latestOHLC}) {
  const [selectedInterval, setInterval] = useState('15');
  const [injectedChartJS, setInjectedChartJS] = useState(
    chartJS.candleChart(deviceWidth, selectedInterval, pair)
  );
  const [reloadWebView, setReloadWebView] = useState(false);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartLocked, setChartLocked] = useState(false);
  const [chartType, setChartType] = useState('candle');

  useEffect(() => {
    setChartLoading(true);
    if (chartType === 'candle') {
      setInjectedChartJS(chartJS.candleChart(deviceWidth, selectedInterval, pair));
    } else {
      setInjectedChartJS(chartJS.areaChart(deviceWidth, selectedInterval, pair));
    }
    setReloadWebView(!reloadWebView);
  }, [selectedInterval, pair, chartType]);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      if (state.type !== 'none') {
        setChartLoading(true);
        WebViewRef ? WebViewRef.reload() : null;
      }
    });
  }, []);

  const intervals = ['5', '15', '30', '60', '1440'];

  const handlePress = ({item}) => {
    if (item !== selectedInterval) {
      setInterval(item);
    }
  }

  const toggleChartType = () => {
    if (chartType === 'candle') {
      setChartType('area');
    } else {
      setChartType('candle');
    }
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
          ref={WVref => (WebViewRef = WVref)}
          key={reloadWebView}
          originWhitelist={['*']}
          useWebKit={true}
          source={{ html: candleChartHtml }}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          style={{...styles.webViewStyle}}
          injectedJavaScript={injectedChartJS}
          onMessage={(message) => {message.nativeEvent.data === 'loaded' ? setChartLoading(false) : null}}
        />
        <View style={styles.intervalTabStyle}>
          {intervals.map((item, index) => {
            return (
              <TouchableOpacity
              onPress={() => handlePress({item})}
              id={item}
              key={index}
              style={{...styles.timeScaleStyle, borderBottomColor: selectedInterval === item ? "orange" : 'rgba(0, 0, 0, 0)'}}>
                <View style={styles.dividerStyle}>
                  <Text style={{color: selectedInterval === item ? '#333' : '#AAA'}}>{item !== '1440' ? item + 'm' : '1D'}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.lockStyle} onPress={toggleChartType}>
            <AntDesign pointerEvents="none" name={chartType === 'candle' ? 'linechart' : 'barschart'} color='orange' size={24} />
          </TouchableOpacity>
          <View style={{backgroundColor: '#EEE', marginTop: -3, width: 1, height: '50%'}}></View>
          <TouchableOpacity onLongPress={() => alert('use this to lock scrolling')} style={styles.lockStyle} onPress={toggleChartLock}>
            <View pointerEvents="none">
              <Foundation name={chartLocked ? 'lock' : 'unlock'} color='orange' size={22} />
            </View>
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
    width: '14%',
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
    flexDirection: 'row',
    marginTop: -5,
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
