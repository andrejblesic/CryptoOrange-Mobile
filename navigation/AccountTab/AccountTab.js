import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import Header from '../../components/global/Header';
import CustomIcon from '../../components/global/CustomIcons';
import AccountBalancesScreen from '../../screens/accountBalancesScreens/AccountBalancesScreen';
import ProfileScreen from '../../screens/accountBalancesScreens/ProfileScreen';
import { SimpleLineIcons } from '@expo/vector-icons';

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

export default AccountBalancesStack;
