import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import Header from '../../components/global/Header';
import CustomIcon from '../../components/global/CustomIcons';
import LendingScreen from '../../screens/lendingScreens/LendingScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

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

export default LendingStack;
