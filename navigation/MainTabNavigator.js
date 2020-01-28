import React from 'react';
import { Platform, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import TabBarIcon from '../components/TabBarIcon';
// import TradingScreen from '../screens/TradingScreen';
import LendingScreen from '../screens/LendingScreen';
import FinanceScreen from '../screens/FinanceScreen';
import OtherScreen from '../screens/OtherScreen';
import TestScreen1 from '../screens/TestScreen1';
import TestScreen2 from '../screens/TestScreen2';
import TestScreen3 from '../screens/TestScreen3';
import StackScreen from '../screens/StackScreen';
import StackScreen2 from '../screens/StackScreen2';
import BTCScreen from '../screens/BTCScreen';
import ETHScreen from '../screens/ETHScreen';
import DASHScreen from '../screens/DASHScreen';
import LTCScreen from '../screens/LTCScreen';
import XRPScreen from '../screens/XRPScreen';
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

const OtherTabScreen = createMaterialTopTabNavigator(
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
    "XRP": { screen: XRPScreen }
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      upperCaseLabel: false,
      scrollEnabled: true,
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

// END SWIPE NAVIGATION ATTEMPT

const expoAssetId = require("../assets/fonts/tabicon.ttf");
const Fontello = createIconSetFromFontello(fontelloConfig, 'fontello-icons');

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

// Trading stack
// const TradingStack = createStackNavigator(
//   {
//     Trading: TradingScreen,
//   },
//   config
// );
//
// TradingStack.navigationOptions = {
//   tabBarLabel: 'Trading',
//   tabBarIcon: ({ focused }) => (
//     <Fontello
//       size={28}
//       name='trading'
//       color={focused ? 'orange' : 'grey'}
//       focused={focused}
//     />
//   ),
//   tabBarOptions: {
//     activeTintColor: 'orange',
//   },
// };
//
// TradingStack.path = '';

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
  OtherTabScreen: {
    screen: OtherTabScreen,
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

const TradingStack = createStackNavigator({
  TradingTabScreen: {
    screen: TradingTabScreen,
    navigationOptions: {
      header: <Header title="Trading" />,
      // headerStyle: {
      //   backgroundColor: 'orange',
      // },
      // headerTintColor: '#FFFFFF',
      // title: 'Other',
    },
  },
  // BTCScreen: {
  //   screen: StackScreen,
  //   navigationOptions: {
  //     header: <Header back="true" title="Stack 1" />,
  //   }
  // },
  // StackScreen2: {
  //   screen: StackScreen2,
  //   navigationOptions: {
  //     header: <Header back="true" title="Stack 2" />,
  //   }
  // }
});

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

function Footer({navigation}) {
  return(
    <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 50, width: '100%', backgroundColor: 'blue'}}>
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'red'}} onPress={() => navigation.navigate({routeName: 'Trading'})} />
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'green'}} onPress={() => navigation.navigate({routeName: 'Lending'})} />
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'pink'}} onPress={() => navigation.navigate({routeName: 'Finance'})} />
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'yellow'}} onPress={() => navigation.navigate({routeName: 'AccountBalances'})} />
      <TouchableOpacity style={{height: 50, width: 50, backgroundColor: 'orange'}} onPress={() => navigation.navigate({routeName: 'OtherTabScreen'})} />
    </View>
  );
}

//Tab Navihator constant
const tabNavigator = createBottomTabNavigator({
    TradingStack,
    LendingStack,
    FinanceStack,
    AccountBalancesStack,
    OtherStack,
    // Footer
  },
  // {
  //   initialRouteName: 'LendingStack',
  //   tabBarComponent: navigation => <Footer {...navigation} />
  // }
);

tabNavigator.path = '';

export default tabNavigator;
