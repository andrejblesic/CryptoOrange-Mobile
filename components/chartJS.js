export function areaChart(deviceWidth, selectedInterval, pair) {
  const fromCurr = pair.substring(0, pair.indexOf('/'));
  const toCurr = pair.substring(pair.indexOf('/') + 1, pair.length);
  return `
  const chart = LightweightCharts.createChart(document.getElementById('candlechartdiv'), { width: ${deviceWidth}, height: 300 });
  const areaSeries = chart.addAreaSeries({lineColor: 'orange', topColor: 'orange', bottomColor: 'white'});
  chart.applyOptions({
    timeScale: {
      rightOffset: 12,
      barSpacing: 3,
      fixLeftEdge: false,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: false,
      borderColor: '#fff000',
      visible: true,timeVisible: true,
      secondsVisible: true,
    },
    layout: {
      backgroundColor: '#FFF',
      textColor: '#696969',
      fontSize: 12,
      fontFamily: 'Calibri',
    },
    grid: {
      vertLines: {
        visible: false,
      },
    },
  });
  window.addEventListener('message', (message) => {
    const data = JSON.parse(message.data);
    alert('lol');
    areaSeries.update(data);
  });
  if ('${selectedInterval}' === '1440') {
    fetch(
      'https://min-api.cryptocompare.com/data/v2/histoday?fsym=${fromCurr}&tsym=${toCurr}&limit=365',
      {
        headers: {
          authorization: 'Apikey 2177624b4eafe339c9b6b6460974846e8d9c565a2dde39248af18bb4beb5337e'
        }
      }
    )
    .then(response => response.json())
    .then(json => {
      for (const item of json.Data.Data) {
        item.value = item.close;
      }
      areaSeries.setData(json.Data.Data);
      window.ReactNativeWebView.postMessage('loaded');
    });
  } else if ('${selectedInterval}' === '60') {
    fetch(
      'https://min-api.cryptocompare.com/data/v2/histohour?fsym=${fromCurr}&tsym=${toCurr}&limit=500',
      {
        headers: {
          authorization: 'Apikey 2177624b4eafe339c9b6b6460974846e8d9c565a2dde39248af18bb4beb5337e'
        }
      }
    )
    .then(response => response.json())
    .then(json => {
      for (const item of json.Data.Data) {
        item.value = item.close;
      }
      areaSeries.setData(json.Data.Data);
      window.ReactNativeWebView.postMessage('loaded');
    });
  } else {
    fetch(
      'https://min-api.cryptocompare.com/data/v2/histominute?fsym=${fromCurr}&tsym=${toCurr}&limit=2000&aggregate=${selectedInterval}',
      {
        headers: {
          authorization: 'Apikey 2177624b4eafe339c9b6b6460974846e8d9c565a2dde39248af18bb4beb5337e'
        }
      }
    )
    .then(response => response.json())
    .then(json => {
      for (const item of json.Data.Data) {
        item.value = item.close;
      }
      areaSeries.setData(json.Data.Data);
      window.ReactNativeWebView.postMessage('loaded');
    });
  }`;
}

export function candleChart(deviceWidth, selectedInterval, pair) {
  const fromCurr = pair.substring(0, pair.indexOf('/'));
  const toCurr = pair.substring(pair.indexOf('/') + 1, pair.length);
  return `
  const chart = LightweightCharts.createChart(document.getElementById('candlechartdiv'), { width: ${deviceWidth}, height: 300 });
  const candlestickSeries = chart.addCandlestickSeries();
  chart.applyOptions({
    timeScale: {
      rightOffset: 12,
      barSpacing: 3,
      fixLeftEdge: false,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: false,
      borderColor: '#f00',
      visible: true,
      timeVisible: true,
      secondsVisible: true,
    },
    priceScale: {
      autoScale: true,
      borderVisible: false
    },
    layout: {
      backgroundColor: '#FFF',
      textColor: '#696969',
      fontSize: 12,
      fontFamily: 'Calibri',
    },
    grid: {
      vertLines: {
        visible: false,
      },
    },
  });
  window.addEventListener('message', (message) => {
    const data = JSON.parse(message.data);
    alert(data);
    candlestickSeries.update(data);
  });
  if ('${selectedInterval}' === '1440') {
    fetch(
      'https://min-api.cryptocompare.com/data/v2/histoday?fsym=${fromCurr}&tsym=${toCurr}&limit=365',
      {
        headers: {
          authorization: 'Apikey 2177624b4eafe339c9b6b6460974846e8d9c565a2dde39248af18bb4beb5337e'
        }
      }
    )
    .then(response => response.json())
    .then(json => {
      candlestickSeries.setData(json.Data.Data);
      window.ReactNativeWebView.postMessage('loaded');
    });
  } else if ('${selectedInterval}' === '60') {
    fetch(
      'https://min-api.cryptocompare.com/data/v2/histohour?fsym=${fromCurr}&tsym=${toCurr}&limit=500',
      {
        headers: {
          authorization: 'Apikey 2177624b4eafe339c9b6b6460974846e8d9c565a2dde39248af18bb4beb5337e'
        }
      }
    )
    .then(response => response.json())
    .then(json => {
      candlestickSeries.setData(json.Data.Data);
      window.ReactNativeWebView.postMessage('loaded');
    });
  } else {
    fetch(
      'https://min-api.cryptocompare.com/data/v2/histominute?fsym=${fromCurr}&tsym=${toCurr}&limit=2000&aggregate=${selectedInterval}',
      {
        headers: {
          authorization: 'Apikey 2177624b4eafe339c9b6b6460974846e8d9c565a2dde39248af18bb4beb5337e'
        }
      }
    )
    .then(response => response.json())
    .then(json => {
      candlestickSeries.setData(json.Data.Data);
      window.ReactNativeWebView.postMessage('loaded');
    });
  }`;
}
