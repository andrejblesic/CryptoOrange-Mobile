import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Feather, FontAwesome, Zocial } from '@expo/vector-icons';
import { withNavigation, StackActions } from 'react-navigation';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;

function FakeHeader({title, back, navigation}) {

  // useEffect(() => {
  //   console.log(title);
  // });

  const popAction = StackActions.pop({
    n: 1,
  });

  return (
    <View style={styles.header}>
      <StatusBar style={{backgroundColor: 'red'}} />
      {back ? <TouchableOpacity onPress={() => navigation.dispatch(popAction)} style={{height: 40, width: 40, backgroundColor: 'green'}}></TouchableOpacity> : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const Header =  withNavigation(FakeHeader);

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingTop: statusBarHeight,
    //marginTop: -20,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'orange'
  },
  title: {
    marginLeft: 10,
    flex: 1,
    fontSize: 22,
    color: 'rgb(40, 40, 40)',
  },
  logo: {
    alignSelf: 'center'
  }
});
