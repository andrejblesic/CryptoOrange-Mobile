import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BalanceDetailsScreen({navigation}) {

  // navigation.state.params.currency;
  // navigation.state.params.amount;

  return(
    <View style={styles.containerStyle}>
      <View style={styles.balanceStyle}>
        <Text style={styles.currencyInfoStyle}>Available {navigation.state.params.currency} ({navigation.state.params.fullName}) Balance:</Text>
        <Text style={styles.currencyAmountStyle}>{navigation.state.params.amount}</Text>
        <View style={styles.transactionTableStyle}>
          <Text>No transactions.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center'
  },
  balanceStyle: {
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    width: '98%',
    borderWidth: 1,
    borderColor: 'orange'
  },
  currencyInfoStyle: {
    fontSize: 18,
  },
  currencyAmountStyle: {
    fontSize: 24
  },
  transactionTableStyle: {
    marginTop: 16,
  }
})
