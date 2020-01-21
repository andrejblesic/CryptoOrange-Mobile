import React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Feather, FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';
import { StackActions, NavigationActions } from 'react-navigation';

export default function AccountBalancesScreen({navigation}) {
  const pushAction = StackActions.push({
    routeName: 'StackScreen',
  });
  return (
    <View style={styles.container}>
      <Text>ACCOUNT BALANCES SCREEN</Text>
      <Button title="GO TO STACK" onPress={() => navigation.dispatch(pushAction)} />
    </View>
  );
}

AccountBalancesScreen.navigationOptions = {
  header: () => <Header title='Balances' />,
  // headerStyle: {
  //   backgroundColor: 'orange',
  // },
  // headerTintColor: '#FFFFFF',
  // title: 'Account',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
