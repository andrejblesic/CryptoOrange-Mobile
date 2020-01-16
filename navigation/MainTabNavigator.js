import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import TabBarIcon from '../components/TabBarIcon';
import TradingScreen from '../screens/TradingScreen';
import LendingScreen from '../screens/LendingScreen';
import FinanceScreen from '../screens/FinanceScreen';
import OtherScreen from '../screens/OtherScreen';
import TestScreen1 from '../screens/TestScreen1';
import TestScreen2 from '../screens/TestScreen2';
import TestScreen3 from '../screens/TestScreen3';
import AccountBalancesScreen from '../screens/AccountBalancesScreen';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';
import fontelloConfig from '../assets/fonts/config.json';
import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';
import { createIconSetFromFontello } from '@expo/vector-icons';
import Header from '../components/Header';

// START SWIPE NAVIGATION ATTEMPT

const TabScreen = createMaterialTopTabNavigator(
  {
    Test1: { screen: TestScreen1 },
    Test2: { screen: TestScreen2 },
    Test3: { screen: TestScreen3 },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: 'red',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: 'blue',
        borderBottomWidth: 4,
      },
    },
  }
);

// END SWIPE NAVIGATION ATTEMPT

const expoAssetId = require("../assets/fonts/tabicon.ttf");
const Fontello = createIconSetFromFontello(fontelloConfig, 'fontello-icons');

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// Trading stack
const TradingStack = createStackNavigator(
  {
    Trading: TradingScreen,
  },
  config
);

TradingStack.navigationOptions = {
  tabBarLabel: 'Trading',
  tabBarIcon: ({ focused }) => (
    <Fontello
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

// Lending stack
const LendingStack = createStackNavigator(
  {
    Lending: LendingScreen,
  },
  config
);

LendingStack.navigationOptions = {
  tabBarLabel: 'Lending',
  tabBarIcon: ({ focused }) => (
    <Fontello
      size={28}
      name='payment'
      color={focused ? 'orange' : 'grey'}
      focused={focused}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'orange',
  },
};

LendingStack.path = '';

// Finance stack
const FinanceStack = createStackNavigator(
  {
    Finance: FinanceScreen,
  },
  config
);

FinanceStack.navigationOptions = {
  tabBarLabel: 'Finance',
  tabBarIcon: ({ focused }) => (
    <Fontello
      size={28}
      name='chart'
      color={focused ? 'orange' : 'grey'}
      focused={focused}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'orange',
  },
};

FinanceStack.path = '';

//AccountBalanceStack
const AccountBalancesStack = createStackNavigator(
  {
    AccountBalances: AccountBalancesScreen,
  },
  config
);

AccountBalancesStack.navigationOptions = {
  tabBarLabel: 'Balances',
  tabBarIcon: ({ focused }) => (
    <Fontello
      size={28}
      name='wallet'
      color={focused ? 'orange' : 'grey'}
      focused={focused}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'orange',
  },
};

AccountBalancesStack.path = '';

//Other Screen stack
const OtherStack = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      header: <Header />,
      // headerStyle: {
      //   backgroundColor: 'green',
      // },
      // headerTintColor: '#FFFFFF',
      // title: 'Other',
    },
  },
});

OtherStack.navigationOptions = {
  tabBarLabel: 'Other',
  tabBarIcon: ({ focused }) => (
    <FontAwesome
      size={28}
      name='newspaper-o'
      color={focused ? 'orange' : 'grey'}
      focused={focused}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'orange',
  },
};

OtherStack.path = '';

//Tab Navihator constant
const tabNavigator = createBottomTabNavigator({
  TradingStack,
  LendingStack,
  FinanceStack,
  AccountBalancesStack,
  OtherStack
});

tabNavigator.path = '';

export default tabNavigator;
