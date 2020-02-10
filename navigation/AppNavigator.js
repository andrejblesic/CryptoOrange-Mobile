import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import { connect } from 'react-redux';

// console.log(addLatestPrice);

const myNav = createAppContainer(
  createSwitchNavigator({
    Main: MainTabNavigator,
  })
);

export default myNav;

// export default connect(
//   mapStateToProps,
//   null
// )(myNav);
