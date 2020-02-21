import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation';
import CustomIcon from '../../components/global/CustomIcons';

export default function BalancesScreen({navigation}) {
  const [allowPush, setAllowPush] = useState(true);

  const navigateToDetails = (item) => {
    if (allowPush) {
      const pushAction = StackActions.push({
        routeName: 'BalanceDetailsScreen',
        params: {
          currency: item,
          fullName: fullCurrNames[item],
          amount: 1.23456789
        }
      });
      navigation.dispatch(pushAction);
      setAllowPush(false);
    }
    setTimeout(() => {
      setAllowPush(true);
    }, 500);
  }

  const fullCurrNames = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    LTC: 'Litecoin',
    XRP: 'Ripple',
    DASH: 'Dash',
    BCH: 'Bitcoin Cash',
    ETC: 'Ethereum Classic',
    EURC: 'EUR Crypto',
    USDC: 'USD Crypto',
    ROX: 'Robotina',
    FAU: 'Faucet',
    USD: 'US Dollar',
    EUR: 'Euro',
    ZEC: 'Zcash'
  }

  const BTC = require('../../assets/images/BTC.png');
  const ETH = require('../../assets/images/ETH.png');
  const LTC = require('../../assets/images/LTC.png');
  const DASH = require('../../assets/images/DASH.png');
  const XRP = require('../../assets/images/XRP.png');
  const ZEC = require('../../assets/images/ZEC.png');
  const USD = require('../../assets/images/USD.png');
  const EUR = require('../../assets/images/EUR.png');

  const cryptoCurrencies = ['BTC', 'ETH', 'LTC', 'XRP', 'DASH', 'ZEC'];
  const fiatCurrencies = ['EUR', 'USD'];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tableStyle}>
        <View style={styles.tableHeaderStyle}>
          <Text style={{fontSize: 16}}>Crypto Currencies</Text>
        </View>
        {cryptoCurrencies.map((item, index) => {
          return(
            <TouchableOpacity
              onPress={() => navigateToDetails(item)}
              style={{...styles.tableItemStyle, backgroundColor: index%2 !== 0 && '#EEEEEE'}}
              key={item}
            >
              <View style={styles.currencyInfoStyle}>
                {/*<CustomIcon color='orange' name={item} size={32} style={styles.iconStyle} />*/}
                <Image style={styles.iconStyle} source={eval(item)} />
                <View>
                  <Text style={styles.tableTextStyle}>{fullCurrNames[item]}</Text>
                  <Text>{item}</Text>
                </View>
              </View>
              <View style={styles.priceWrapperStyle}>
                <Text style={styles.tableTextStyle}>1.23456789</Text>
                <AntDesign name='right' size={20} />
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={styles.tableStyle}>
        <View style={styles.tableHeaderStyle}>
          <Text style={{fontSize: 16}}>Fiat Currencies</Text>
        </View>
        {fiatCurrencies.map((item, index) => {
          return(
            <TouchableOpacity onPress={() => navigateToDetails(item)} style={{...styles.tableItemStyle, backgroundColor: index%2 !== 0 && '#EEE'}} key={item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/*<CustomIcon style={styles.iconStyle} name={item} size={32} color='orange' />*/}
                <Image style={styles.iconStyle} source={eval(item)} />
                <View>
                  <Text style={styles.tableTextStyle}>{item}</Text>
                  <Text>{fullCurrNames[item]}</Text>
                </View>
              </View>
              <View style={styles.priceWrapperStyle}>
                <Text style={styles.tableTextStyle}>1.23456789</Text>
                <AntDesign name='right' size={20} />
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },
  tableStyle: {
    marginBottom: 20,
    width: '98%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'orange',
    overflow: 'hidden'
  },
  tableHeaderStyle: {
    backgroundColor: '#EEEEEE',
    paddingLeft: 8,
    height: 40,
    justifyContent: 'center'
  },
  tableItemStyle: {
    borderTopWidth: 1,
    borderTopColor: 'orange',
    paddingLeft: 8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tableTextStyle: {
    fontSize: 22
  },
  priceWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconStyle: {
    height: 32,
    width: 32,
    marginRight: 5
  },
  currencyInfoStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
