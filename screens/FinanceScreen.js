import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function FinanceScreen() {
  return (
    <View style={styles.container}>
      <Text>FINANCE SCREEN</Text>
    </View>
  );
}

FinanceScreen.navigationOptions = {
  title: 'Finance Screen',
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
