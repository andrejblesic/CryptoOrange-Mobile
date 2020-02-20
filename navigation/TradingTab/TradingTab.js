import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import Header from '../../components/global/Header';
import CustomIcon from '../../components/global/CustomIcons';
import BTCScreen from '../../screens/tradingScreens/BTCScreen';
import ETHScreen from '../../screens/tradingScreens/ETHScreen';
import DASHScreen from '../../screens/tradingScreens/DASHScreen';
import LTCScreen from '../../screens/tradingScreens/LTCScreen';
import XRPScreen from '../../screens/tradingScreens/XRPScreen';
import ZECScreen from '../../screens/tradingScreens/ZECScreen';

const TradingTabScreen = createMaterialTopTabNavigator(
  {
    "BTC": { screen: BTCScreen },
    "ETH": { screen: ETHScreen },
    "LTC": { screen: LTCScreen },
    "DASH": { screen: DASHScreen },
    "XRP": { screen: XRPScreen },
    "ZEC": { screen: ZECScreen }
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    swipeEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      upperCaseLabel: false,
      activeTintColor: '#000',
      inactiveTintColor: 'rgb(180, 180, 180)',
      pressColor: 'orange',
      tabStyle: {
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
      style: {
        elevation: 0,
        shadowOffset: { width: 0, height: 0 },
        boxShadow: '0 0 0 rgba(0,0,0,0.0)',
        backgroundColor: '#fff',
        numberOfLines: 1,
        justifyContent: 'center',
      },
      labelStyle: {
        fontSize: 16,
        marginTop: -6
      },
      indicatorStyle: {
        borderBottomColor: 'orange',
        borderBottomWidth: 4,
      },
    },
  }
);

const TradingStack = createStackNavigator({
  TradingTabScreen: {
    screen: TradingTabScreen,
    navigationOptions: {
      header: <Header title="Trading" />,
    },
  }
});

TradingStack.navigationOptions = {
  tabBarLabel: 'Trading',
  tabBarIcon: ({ focused }) => (
    <CustomIcon
      size={28}
      name='trading'
      color={focused ? 'orange' : 'grey'}
      focused={focused}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'orange',
  },
};

TradingStack.path = '';

export default TradingStack;
