import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import Header from '../../components/global/Header';
import CustomIcon from '../../components/global/CustomIcons';
import FinanceScreen from '../../screens/financeScreens/FinanceScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const FinanceStack = createStackNavigator(
  {
    Finance: FinanceScreen,
  },
  config
);

// FinanceStack.navigationOptions = {
//   tabBarLabel: 'Finance',
//   tabBarIcon: ({ focused }) => (
//     <CustomIcon
//       size={28}
//       name='finance'
//       color={focused ? 'orange' : 'grey'}
//       focused={focused}
//     />
//   ),
//   tabBarOptions: {
//     activeTintColor: 'orange',
//   },
// };

FinanceStack.path = '';

export default FinanceStack;
