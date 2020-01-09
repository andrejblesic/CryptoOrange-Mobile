import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default function AccountBalancesScreen() {
  return (
    <View style={styles.container}>
      <Text>ACCOUNT BALANCES SCREEN</Text>
    </View>
  );
}

AccountBalancesScreen.navigationOptions = {
  title: 'Account Balances',
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
