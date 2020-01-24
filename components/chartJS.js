export function areaChart(width, timeScale) {
  return `
  const websocketUrl = 'ws://co-mobile.omnitask.ba:9000/charts';
  const areaWs = new WebSocket(websocketUrl);
  const chart = LightweightCharts.createChart(document.getElementById('areachartdiv'), { width: ${width}, height: 300 });
  const areaSeries = chart.addAreaSeries();
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
      backgroundColor: '#282c34',
      textColor: '#696969',
      fontSize: 12,
      fontFamily: 'Calibri',
    },
  });
  areaWs.onmessage = event => {const chartData = JSON.parse(event.data);
    if (chartData.chart) {
      for (const item in chartData.chart) {
        chartData.chart[item].time = Math.floor(chartData.chart[item].time / 1000);
      }
      areaSeries.setData(chartData.chart);
    } else if (!chartData.chart) {
      chartData.time = Math.floor(chartData.time / 1000);
      areaSeries.update(chartData);
    }
  };`;
}

export function candleChart(width, timeScale, pair) {
  return `
  const candlestickUrl = 'wss://ws.kraken.com/';
  const candleWs = new WebSocket(candlestickUrl);
  const chart = LightweightCharts.createChart(document.getElementById('candlechartdiv'), { width: ${width}, height: 300 });
  const candlestickSeries = chart.addCandlestickSeries();
  chart.applyOptions({
    timeScale: {
      rightOffset: 12,
      barSpacing: 3,
      fixLeftEdge: false,
      lockVisibleTimeRangeOnResize: true,
      rightBarStaysOnScroll: true,
      borderVisible: false,
      borderColor: '#fff000',
      visible: true,
      timeVisible: true,
      secondsVisible: true,
    },
    layout: {
      backgroundColor: '#282c34',
      textColor: '#696969',
      fontSize: 12,
      fontFamily: 'Calibri',
    }
  });
  candleWs.onopen = event => {
    candleWs.send(JSON.stringify(
      {
        event: 'subscribe',
        pair : ['${pair}'],
        subscription : {
          name : 'ohlc',
          interval: 1
        }
      }
    ));
  }
  candleWs.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data[1]) {
      const chartData = {
        time: parseInt(data[1][1]),
        open: data[1][2],
        high: data[0][3],
        low: data[1][4],
        close: data[1][5]
      }
      candlestickSeries.update(chartData);
    }
    // if (chartData.length > 1) {
    //   for (const item of chartData) {
    //     item.time = parseInt(parseInt(item.time) / 1000);
    //   }
    //   candlestickSeries.setData(chartData)
    // } else if (!chartData.length) {
    //   chartData.time = parseInt(parseInt(chartData.time) / 1000);
    //   candlestickSeries.update(chartData);
    // }
  };`;
}
