import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Feather, FontAwesome, Zocial } from '@expo/vector-icons';
import { withNavigation, StackActions } from 'react-navigation';

function FakeHeader({title, back, navigation}) {

  // useEffect(() => {
  //   console.log(title);
  // });

  const popAction = StackActions.pop({
    n: 1,
  });

  return (
    <View style={styles.header}>
      {back ? <TouchableOpacity onPress={() => navigation.dispatch(popAction)} style={{height: 40, width: 40, backgroundColor: 'green'}}></TouchableOpacity> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const Header =  withNavigation(FakeHeader);

export default Header;

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
