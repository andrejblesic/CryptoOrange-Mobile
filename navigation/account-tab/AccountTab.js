import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import Header from '../../components/global/Header';
import CustomIcon from '../../components/global/CustomIcons';
import BalancesScreen from '../../screens/account-balances-screens/BalancesScreen';
import ProfileScreen from '../../screens/account-balances-screens/ProfileScreen';
import BalanceDetailsScreen from '../../screens/account-balances-screens/BalanceDetailsScreen';
import { SimpleLineIcons } from '@expo/vector-icons';

const width = Dimensions.get('window').width;

const AccountBalancesTabScreen = createMaterialTopTabNavigator(
  {
    'Balances': { screen: BalancesScreen },
    'Profile': { screen: ProfileScreen },
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
      style: {
        elevation: 0,
        backgroundColor: '#fff',
        numberOfLines: 1,
      },
      tabStyle: {
        width: width / 2,
        height: 50,
      },
      labelStyle: {
        fontSize: 18,
      },
      indicatorStyle: {
        borderBottomColor: 'orange',
        borderBottomWidth: 4,
      }
    }
  }
)

const AccountBalancesStack = createStackNavigator({
  AccountBalancesTabScreen: {
    screen: AccountBalancesTabScreen,
    navigationOptions: {
      header: <Header title="Account" />,
    },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      header: <Header back="true" title="Profile" />,
    },
  },
  BalanceDetailsScreen: {
    screen: BalanceDetailsScreen,
    navigationOptions: {
      header: <Header back="true" title="Balance Details" />,
    },
  }
});

// AccountBalancesStack.navigationOptions = {
//   tabBarLabel: 'Account',
//   tabBarIcon: ({ focused }) => (
//     <SimpleLineIcons
//       size={28}
//       name='user'
//       color={focused ? 'orange' : 'grey'}
//       focused={focused}
//     />
//   ),
//   tabBarOptions: {
//     activeTintColor: 'orange',
//   },
// };

AccountBalancesStack.path = '';

export default AccountBalancesStack;
