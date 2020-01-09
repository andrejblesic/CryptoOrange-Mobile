import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import TradingScreen from '../screens/TradingScreen';
import LendingScreen from '../screens/LendingScreen';
import FinanceScreen from '../screens/FinanceScreen';
import AccountBalancesScreen from '../screens/AccountBalancesScreen';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons
} from '@expo/vector-icons';

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
    <FontAwesome
      size={28}
      focused={focused}
      name='exchange'
      color={focused ? 'orange' : 'grey'}
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
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      color={focused ? 'orange' : 'grey'}
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
    <MaterialCommunityIcons
      focused={focused}
      name='finance'
      size={28}
      color={focused ? 'orange' : 'grey'}
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
    <FontAwesome
      focused={focused}
      name='user'
      size={28}
      color={focused ? 'orange' : 'grey'}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'orange',
  },
};

AccountBalancesStack.path = '';

const tabNavigator = createBottomTabNavigator({
  TradingStack,
  LendingStack,
  FinanceStack,
  AccountBalancesStack
});

tabNavigator.path = '';

export default tabNavigator;
