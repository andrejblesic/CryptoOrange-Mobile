import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TradingStack from './trading-tab/TradingTab';
import LendingStack from './lending-tab/LendingTab';
import FinanceStack from './finance-tab/FinanceTab';
import AccountBalancesStack from './account-tab/AccountTab';
import MoreStack from './more-tab/MoreTab';
import Footer from '../components/global/Footer';

//Bottom Tab Navigator
const tabNavigator = createBottomTabNavigator({
    TradingStack,
    LendingStack,
    FinanceStack,
    AccountBalancesStack,
    MoreStack,
  },
  {
    backBehavior: 'none',
    initialRouteName: 'TradingStack',
    tabBarComponent: (navigation) => <Footer {...navigation} />
  }
);

tabNavigator.path = '';

export default tabNavigator;
