import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import TradingStack from './TradingTab/TradingTab';
import LendingStack from './LendingTab/LendingTab';
import FinanceStack from './FinanceTab/FinanceTab';
import AccountBalancesStack from './AccountTab/AccountTab';
import MoreStack from './MoreTab/MoreTab';
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
