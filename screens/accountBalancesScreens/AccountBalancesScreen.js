import React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation';

export default function AccountBalancesScreen({navigation}) {

  const pushAction = StackActions.push({
    routeName: 'ProfileScreen',
  });

  return (
    <View style={styles.container}>
      <Text>ACCOUNT BALANCES SCREEN</Text>
      <Button title="GO TO PROFILE SCREEN" onPress={() => navigation.dispatch(pushAction)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
