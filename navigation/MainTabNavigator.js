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
import StackScreen from '../screens/StackScreen';
import StackScreen2 from '../screens/StackScreen2';
import AccountBalancesScreen from '../screens/AccountBalancesScreen';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo
} from '@expo/vector-icons';
import fontelloConfig from '../assets/fonts/config.json';
import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';
import { createIconSetFromFontello } from '@expo/vector-icons';
import Header from '../components/Header';

// START SWIPE NAVIGATION ATTEMPT

const TabScreen = createMaterialTopTabNavigator(
  {
    Testjedan: { screen: TestScreen1 },
    Testdva: { screen: TestScreen2 },
    Testtri: { screen: TestScreen3 },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    // lazy: true,
    animationEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      activeTintColor: 'black',
      inactiveTintColor: 'rgb(180, 180, 180)',
      style: {
        width: '100%',
        backgroundColor: '#fff',
        numberOfLines: 1
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: 'orange',
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
      header: <Header title="Other" />,
      // headerStyle: {
      //   backgroundColor: 'orange',
      // },
      // headerTintColor: '#FFFFFF',
      // title: 'Other',
    },
  },
  StackScreen: {
    screen: StackScreen,
    navigationOptions: {
      header: <Header back="true" title="Other" />,
    }
  },
  StackScreen2: {
    screen: StackScreen2,
    navigationOptions: {
      header: <Header back="true" title="Other" />,
    }
  }
});

OtherStack.navigationOptions = {
  tabBarLabel: 'More',
  tabBarIcon: ({ focused }) => (
    <Entypo
      size={28}
      name='dots-three-horizontal'
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
