import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Feather, FontAwesome, Zocial, Ionicons } from '@expo/vector-icons';
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
      {back ?
        <TouchableOpacity style={styles.backStyle} onPress={() => navigation.dispatch(popAction)}>
          <Ionicons size={30} name="md-arrow-back" />
        </TouchableOpacity>
        : null
      }
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
    backgroundColor: '#f36a22'
  },
  title: {
    marginLeft: 10,
    flex: 1,
    fontSize: 22,
    color: 'rgb(40, 40, 40)',
  },
  backStyle: {
    height: '100%',
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginLeft: 10,
  }
});
