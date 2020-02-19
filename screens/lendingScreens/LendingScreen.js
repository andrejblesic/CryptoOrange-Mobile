import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/global/Header';

export default function LendingScreen() {
  return (
    <View style={styles.container}>
      <Text>LENDING SCREEN</Text>
    </View>
  );
}

LendingScreen.navigationOptions = {
  header: () => <Header title="Lending" />,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
  }
})
