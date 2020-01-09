import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';

export default function FinanceScreen() {
  return (
    <View style={styles.container}>
      <Text>FINANCE SCREEN</Text>
    </View>
  );
}

FinanceScreen.navigationOptions = {
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
