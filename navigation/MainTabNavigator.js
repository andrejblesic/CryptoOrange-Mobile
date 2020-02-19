import React from 'react';
import { Platform, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Header from '../components/global/Header';
import CustomIcon from '../components/global/CustomIcons';
import LendingScreen from '../screens/lendingScreens/LendingScreen';
import FinanceScreen from '../screens/financeScreens/FinanceScreen';
import MoreScreen from '../screens/moreScreens/MoreScreen';
import TestScreen1 from '../screens/moreScreens/TestScreen1';
import TestScreen2 from '../screens/moreScreens/TestScreen2';
import TestScreen3 from '../screens/moreScreens/TestScreen3';
import StackScreen from '../screens/moreScreens/StackScreen';
import StackScreen2 from '../screens/moreScreens/StackScreen2';
import ProfileScreen from '../screens/accountBalancesScreens/ProfileScreen';
import BTCScreen from '../screens/tradingScreens/BTCScreen';
import ETHScreen from '../screens/tradingScreens/ETHScreen';
import DASHScreen from '../screens/tradingScreens/DASHScreen';
import LTCScreen from '../screens/tradingScreens/LTCScreen';
import XRPScreen from '../screens/tradingScreens/XRPScreen';
import ZECScreen from '../screens/tradingScreens/ZECScreen';
import AccountBalancesScreen from '../screens/accountBalancesScreens/AccountBalancesScreen';
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
  SimpleLineIcons
} from '@expo/vector-icons';
import fontelloConfig from '../assets/fonts/config.json';
import * as Font from 'expo-font';
import { createIconSet } from '@expo/vector-icons';
import { createIconSetFromFontello } from '@expo/vector-icons';

const Fontello = createIconSetFromFontello(fontelloConfig, 'fontello-icons');

const MoreTabScreen = createMaterialTopTabNavigator(
  {
    "Test one": { screen: TestScreen1 },
    "Test two": { screen: TestScreen2 },
    "Test three": { screen: TestScreen3 },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      upperCaseLabel: false,
      scrollEnabled: true,
      activeTintColor: '#000',
      inactiveTintColor: 'rgb(180, 180, 180)',
      pressColor: 'orange',
      tabStyle: {
        border: '2px solid red'
      },
      style: {
        elevation: 0,
        shadowOffset: { width: 0, height: 0 },
        boxShadow: '0 0 0 rgba(0,0,0,0.0)',
        backgroundColor: '#fff',
        numberOfLines: 1,
      },
      labelStyle: {
        fontSize: 16,
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: 'orange',
        borderBottomWidth: 4,
      },
    },
  }
);

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

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

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
    <CustomIcon
      size={28}
      name='lending'
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
    <CustomIcon
      size={28}
      name='finance'
      color={focused ? 'orange' : 'grey'}
      focused={focused}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'orange',
  },
};

FinanceStack.path = '';

//AccountBalance Stack
const AccountBalancesStack = createStackNavigator({
  AccountBalancesScreen: {
    screen: AccountBalancesScreen,
    navigationOptions: {
      header: <Header title="Account Balances" />,
    },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      header: <Header back="true" title="Profile" />,
    },
  },
});

AccountBalancesStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <SimpleLineIcons
      size={28}
      name='user'
      color={focused ? 'orange' : 'grey'}
      focused={focused}
    />
  ),
  tabBarOptions: {
    activeTintColor: 'orange',
  },
};

AccountBalancesStack.path = '';

//More stack
const MoreStack = createStackNavigator({
  MoreTabScreen: {
    screen: MoreTabScreen,
    navigationOptions: {
      header: <Header title="More" />,
    },
  },
  StackScreen: {
    screen: StackScreen,
    navigationOptions: {
      header: <Header back="true" title="Stack 1" />,
    }
  },
  StackScreen2: {
    screen: StackScreen2,
    navigationOptions: {
      header: <Header back="true" title="Stack 2" />,
    }
  }
});

MoreStack.navigationOptions = {
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

MoreStack.path = '';


//Trading Stack
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

function Footer({navigation}) {
  return(
    <View style={{flexDirection: 'row', justifyContent: 'space-around', height: 50, width: '100%', backgroundColor: 'blue'}}>
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'red'}} onPress={() => navigation.navigate({routeName: 'TradingStack'})} />
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'green'}} onPress={() => navigation.navigate({routeName: 'LendingStack'})} />
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'pink'}} onPress={() => navigation.navigate({routeName: 'FinanceStack'})} />
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'yellow'}} onPress={() => navigation.navigate({routeName: 'AccountBalancesStack'})} />
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'orange'}} onPress={() => navigation.navigate({routeName: 'MoreStack'})} />
    </View>
  );
}

//Bottom Tab Navigator
const tabNavigator = createBottomTabNavigator({
    TradingStack,
    LendingStack,
    FinanceStack,
    AccountBalancesStack,
    MoreStack,
  },
  // {
  //   resetOnBlur: false,
  //   initialRouteName: 'TradingStack',
  //   tabBarComponent: navigation => <Footer {...navigation} />
  // }
);

tabNavigator.path = '';

export default tabNavigator;
