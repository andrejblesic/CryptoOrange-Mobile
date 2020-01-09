import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Feather, FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';

export default function AccountBalancesScreen() {
  return (
    <View style={styles.container}>
      <Text>ACCOUNT BALANCES SCREEN</Text>
    </View>
  );
}

AccountBalancesScreen.navigationOptions = {
  headerTitle: () => <Header />,
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
