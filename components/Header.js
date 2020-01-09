import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Feather, FontAwesome } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.header}>
      <Feather style={styles.menuIcon} size={28} name='menu' />
      <FontAwesome style={styles.userIcon} size={28} name='user' />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userIcon: {
    marginRight: 10,
  },
  menuIcon: {
    marginLeft: 10,
  }
})
