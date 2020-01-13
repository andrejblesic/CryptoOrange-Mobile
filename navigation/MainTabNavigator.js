import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import TabBarIcon from '../components/TabBarIcon';
import TradingScreen from '../screens/TradingScreen';
import LendingScreen from '../screens/LendingScreen';
import FinanceScreen from '../screens/FinanceScreen';
import OtherScreen from '../screens/OtherScreen';
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
const OtherStack = createStackNavigator(
  {
    Other: OtherScreen,
  },
  config
);

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

// DRAWER NAVIGATION
// function Drawer() {
//   return(
//     <View>
//       <Text>BENEZ</Text>
//     </View>
//   )
// }
//
// const AppNavigator = createDrawerNavigator({
//   Drawer: tabNavigator,
// }, {
//   contentComponent: Drawer,
// });

// END DRAWER NAVIGATION

export default tabNavigator;
