import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  Easing,
  Animated,
  ActivityIndicator,
  AppStatem,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as chartJS from './chartJS.js';
import {
  Ionicons,
  AntDesign,
  Zocial,
  MaterialCommunityIcons,
  Entypo,
  Feather,
  MaterialIcons
} from '@expo/vector-icons';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import ReactNativeComponentTree from 'react-native';

const statusBarHeight = Constants.statusBarHeight;
const deviceWidth = Dimensions.get('window').width;
const coinbaseWS = 'wss://ws-feed.pro.coinbase.com';

const candleChartHtml = `
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 mimum-scale=1">
<style>body {margin: 0; max-height: 300px; height: 300px; background-color: #30343D}</style>
<body>
  <div style="background-color: #30343D" id="candlechartdiv"></div>
</body>
<script src="https://unpkg.com/lightweight-charts@1.1.0/dist/lightweight-charts.standalone.production.js"></script>
`;

export default function CandleChart({pair}) {
  const [selectedInterval, setInterval] = useState('15');
  const [candleChartJS, setCandleChartJS] = useState(
    chartJS.candleChart(deviceWidth, '60', pair)
  );
  // const [currTimeScale, setCurrTimeScale] = useState('1h');
  const [isReloadWebView, setReloadWebView] = useState(false);
  // const [chartLoading, setChartLoading] = useState(false);

  useEffect(() => {
    setCandleChartJS(chartJS.candleChart(deviceWidth, selectedInterval, pair));
    setReloadWebView(!isReloadWebView);
  }, [selectedInterval]);

  // useEffect(() => {
  //   setChartLoading(true);
  //   setTimeout(() => {
  //     setChartLoading(false);
  //   }, 1000);
  //   setCandleChartJS(chartJS.candleChart(deviceWidth, timeScale));
  //   if (currTimeScale !== timeScale) {
  //     setReloadWebView(!isReloadWebView);
  //     setCurrTimeScale(timeScale);
  //   }
  // }, [timeScale]);

  // const candleChartJS = chartJS.candleChart(deviceWidth, '1h', pair)

  const intervals = ['5', '15', '30', '60', '1440'];

  const handlePress = ({item}) => {
    setInterval(item);
  }

  return (
    <View style={{backgroundColor: 'white', width: '100%', height: 'auto', zIndex: 999 }}>
      <View style={{height: 320, zIndex: 1}}>
        <WebView
          ref={CandleWVref => (CandleWebViewRef = CandleWVref)}
          key={isReloadWebView}
          originWhitelist={['*']}
          useWebKit={true}
          source={{ html: candleChartHtml }}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          style={{...styles.WebViewStyle, backgroundColor: '#30343D'}}
          injectedJavaScript={candleChartJS}
        />
        <View style={{backgroundColor: '#DDD', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 40}}>
          {intervals.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => handlePress({item})} key={index} id={item} style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'black'}}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  WebViewStyle: {
    width: '100%',
    backgroundColor: '#30343D', // '#30343D',
    height: 300
  },
});
