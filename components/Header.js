import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Feather, FontAwesome, Zocial } from '@expo/vector-icons';

export default function Header({title}) {

  // useEffect(() => {
  //   console.log(title);
  // });

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    marginTop: 31,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  title: {
    flex: 1,
    fontSize: 22,
    color: 'rgb(40, 40, 40)',
  },
  logo: {
    alignSelf: 'center'
  }
});
